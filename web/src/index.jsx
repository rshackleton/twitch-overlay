import React from 'react';
import { render } from 'react-dom';
import { css } from 'glamor';
import 'glamor/reset';

import App from './App';

css.global('html', {
  boxSizing: 'border-box',
});

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
});

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />, document.getElementById('root'));
  });
}
