import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  position: fixed;
  height: 100%;
  overflow: hidden;
}

  html,
  body {

  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
}

  #app {
    background-color: #fefefe;
    min-height: 100%;
    min-width: 100%;
  }

  a {
    text-decoration: none;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .loadingHomePage {
    height: 100vh;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loadingHomePageComponent {
   width: auto;
  }

  textarea:focus, input:focus, button:focus{
    outline: none;
  }

  ul {
    margin: 5px;
    padding-left: 25px;
  }

  input[type='number'] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

`;

export default GlobalStyle;
