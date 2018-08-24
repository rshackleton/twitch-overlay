import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'react-emotion';
import './styles/fonts';
import './styles/reset';

import App from './App';

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />, document.getElementById('root'));
  });
}
