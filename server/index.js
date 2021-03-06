/*
 * \file index.js
 * \brief Start the server Apollo
 * \date 16 juin 2017
 * \author Cuistot du coin
 */

/* eslint consistent-return:0 */

// For postgraphql only
// const postgraphql = require('postgraphql').postgraphql;

// --------------------------------------------------------------------------- //
// Import of dependency
// --------------------------------------------------------------------------- //

// For apollo server based on Graphql
const express = require("express");
const logger = require("./logger");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
// ------------------------------------ //

// For Subscriptions
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
// --------------- //

// Graphql Schema
const schema = require("./schema");

const argv = require("minimist")(process.argv.slice(2));
const setup = require("./middlewares/frontendMiddleware");
const isDev = process.env.NODE_ENV !== "production";
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require("ngrok")
    : false;
const resolve = require("path").resolve;
//! --------------------------------------------------------------------------- //
//! --------------------------------------------------------------------------- //
//! --------------------------------------------------------------------------- //

// Server Apollo with Express
const app = express();
const passport = require("passport");
require("./passport");
const socketIo = require("socket.io");

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// postgraphql
// const config = {
//   user: 'jeremy',
//   database: 'cuistot',
//   password: 'dev',
//   host: 'localhost',
//   port: 5432,
// };
//
// const optionGraphQL = { graphiql: true };
// app.use(postgraphql(config, optionGraphQL));

// Option for express server (cors, bodyParser and Graphql, Graphiql)
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/login", (req, res, done) => {
  // Ici on vérifierait que le login et mot de passe sont corrects
  // eslint-disable-next-line
  req.user = "user_id"; // req.body.user_id
  done();
});

app.use("/admin", (req, res, done) => {
  // Ici on vérifierait que le login et mot de passe de l'admin sont corrects.
  // eslint-disable-next-line
  req.auth = "admin";
  done();
});

if (isDev) {
  app.use("/graphql", (req, res, done) => {
    /* eslint-disable */
    req.auth = "admin";
    req.user = "0aefb1b8-5594-11e7-bb73-1b3d8de4a264";
    /* eslint-enable */
    done();
  });
}

app.use(
  "/graphql",
  graphqlExpress(request => ({
    schema,
    context: request
  }))
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: "ws://localhost:3000/subscriptions"
  })
);

// get the intended host and port number, use localhost and port 3000 if not provided
const server = createServer(app);
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";

const port = argv.port || process.env.PORT || 3000;

const io = socketIo(server);

let interval;
let user_id;

app.get(
  "/login/facebook",
  passport.authenticate("facebook", { session: false, scope: "email" })
);

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  function(req, res) {
    user_id = req.user.user_id;
    io.once("connection", socket => getApiAndEmit(socket));
    res.redirect("/");
  }
);

const getApiAndEmit = socket => {
  try {
    socket.emit("user_id", user_id);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), "build"),
  publicPath: "/"
});

// Start your app.
server.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Add Subscription to the server
  // eslint-disable-next-line
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
  // ----------------------------- //

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
