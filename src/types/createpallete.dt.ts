import * as createPalette from "@material-ui/core/styles/createPalette";
declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
    background?: Partial<TypeBackground>;
  }
}
