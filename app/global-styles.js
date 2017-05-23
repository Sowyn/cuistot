import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .geosuggest {
    font-size: 18px;
    font-size: 1rem;
    position: relative;
    width: 90%;
    margin: 0.75em auto;
    text-align: left;
  }
  .geosuggest__input {
    width: 100%;
    background-color: #FFF;
    border: 2px solid transparent;
    box-shadow: 0 0 1px #3d464d;
    padding: .5em 1em;
    -webkit-transition: border 0.2s, box-shadow 0.2s;
            transition: border 0.2s, box-shadow 0.2s;
  }
  .geosuggest__input:focus {
    border-color: #267dc0;
    box-shadow: 0 0 0 transparent;
  }
  .geosuggest__suggests {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 25em;
    padding: 0;
    margin-top: -1px;
    background: #fff;
    border: 2px solid #267dc0;
    border-top-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    z-index: 5;
    -webkit-transition: max-height 0.2s, border 0.2s;
            transition: max-height 0.2s, border 0.2s;
  }
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  /**
   * A geosuggest item
   */
  .geosuggest__item {
    font-size: 18px;
    font-size: 1rem;
    padding: .5em .65em;
    cursor: pointer;
  }
  .geosuggest__item:hover,
  .geosuggest__item:focus {
    background: #f5f5f5;
  }
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }
  .geosuggest__item--active:hover,
  .geosuggest__item--active:focus {
    background: #ccc;
  }



`;
