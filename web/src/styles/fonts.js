import { injectGlobal } from 'react-emotion';
import woff from './fonts/monkeyisland-1990-refined-webfont.woff';
import woff2 from './fonts/monkeyisland-1990-refined-webfont.woff2';

injectGlobal(`
  @font-face {
    font-family: 'Monkey Island 1990';
    src: local('Monkey Island 1990'),
      local('The Secret Font of Monkey Island™ 1990 refined'),
      local('TheSecretFontOfMonkeyIsland1990-refined'),
      url('${woff2}') format('woff2'),
      url('${woff}') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`);
