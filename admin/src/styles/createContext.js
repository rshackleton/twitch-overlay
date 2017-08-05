import preset from 'jss-preset-default';
import { jss, SheetsRegistry } from 'react-jss';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import twitchPurple from './twitchPurple';

const theme = createMuiTheme({
  palette: createPalette({
    primary: twitchPurple,
    accent: twitchPurple,
  }),
});

// Configure JSS
jss.setup(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export default function createContext() {
  return {
    jss,
    theme,
    sheetsManager: new WeakMap(),
    sheetsRegistry: new SheetsRegistry(),
  };
}
