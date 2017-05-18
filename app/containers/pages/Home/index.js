/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import HomeComp from 'components/pages/Home';

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeComp />
      </div>
    );
  }
}

export default Home;