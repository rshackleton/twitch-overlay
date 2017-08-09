import React from 'react';
import { render } from 'react-dom';

import App from './App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />, document.getElementById('root'));
  });
}
