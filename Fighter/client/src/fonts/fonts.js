import { createGlobalStyle } from 'styled-components';

import Retro from './retro_gaming/Retro Gaming.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Retro';
    src: local('Retro'), url(${Retro}) format('truetype');
  }
`;