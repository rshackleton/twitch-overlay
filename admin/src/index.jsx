import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import { render } from 'react-dom';

import App from './App';

OfflinePluginRuntime.install();

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    render(<App />, document.getElementById('root'));
  });
}
