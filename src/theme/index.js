import {
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  createTheme,
  alpha,
} from "@mui/material";
import customizeComponents from "./customizations";
// import customizeComponents from "./customizations";
const PRIMARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};

const SECONDARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#00AB55",
  dark: "#007B55",
  darker: "#005249",
  contrastText: "#FFF",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const PINK = {
  lighter: "#DDA0DD",
  light: "#EE82EE",
  main: "#DA70D6",
  dark: "#FF00FF",
  darker: "#FF00FF",
  contrastText: "#FFF",
};

const RED = {
  lighter: "#FFA07A",
  light: "#DC143C",
  main: "#FF0000",
  dark: "#B22222",
  darker: "#8B0000",
  contrastText: "#FFF",
};

const YELLOW = {
  lighter: "#FFFFE0",
  light: "#FFFACD",
  main: "#FFFF00",
  dark: "#FFD700",
  darker: "#FFA500",
  contrastText: "#FFF",
};

const BLUE = {
  lighter: "#ADD8E6",
  light: "#87CEFA",
  main: "#00FFFF",
  dark: "#00BFFF",
  darker: "#0000CD",
  contrastText: "#FFF",
};

const PURPLE = {
  lighter: "#EE82EE",
  light: "#9370DB",
  main: "#8A2BE2",
  dark: "#9400D3",
  darker: "#4B0082",
  contrastText: "#FFF",
};
const PROCESS = {
  main: "#74b9ff",
  contrastText: "#00a8ff",
};

const PREPARE = {
  main: "#a29bfe",
  contrastText: "#6c5ce7",
};

const SHIPPED = {
  main: "#fd79a8",
  contrastText: "#e84393",
};

const ACCEPT = {
  main: "#55efc4",
  contrastText: "#00cec9",
};

const TERTIARY = {
  light: "#ffeaa7",
  main: "#f6e58d",
  dark: "#fdcb6e",
  darker: "#f1c40f",
  contrastText: "#f39c12",
};
const DARK = {
  lighter: "#393e46",
  light: "#222831",
  main: "#323643",
  dark: "#060608",
  darker: "#000000",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#181212",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      tertiary: TERTIARY,
      pink: PINK,
      yellow: YELLOW,
      blue: BLUE,
      purple: PURPLE,
      success: SUCCESS,
      accept: ACCEPT,
      process: PROCESS,
      prepare: PREPARE,
      shipped: SHIPPED,
      dark: DARK,
      red: RED,
      text: {
        primary: GREY[900],
        secondary: "#231f1e",
        tertiary: GREY[600],
        disabled: GREY[500],
      },
      background: {
        paper: "#fff",
        default: "#fff",
        neutral: GREY[200],
        positive: "#3366FF",
      },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    typography: {
      allVariants: { fontFamily: ["Rubik", "sans-serif"].join(",") },
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
