import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type OurThemeType = typeof theme;
    export interface DefaultTheme extends OurThemeType { }
}
