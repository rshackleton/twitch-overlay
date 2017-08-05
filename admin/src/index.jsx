import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import { render } from 'react-dom';

import App from './routes/App';

OfflinePluginRuntime.install();

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./routes/App', () => {
    render(<App />, document.getElementById('root'));
  });
}
