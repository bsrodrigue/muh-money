import { createTheme } from "@rneui/themed";

const commonColors = {
  primary: "#265073",
  black: "black",
  blue: "#186ff4",
  green: "#9BCF53",
  yellow: "#FFF455",
  error: "#FF204E",
  greyOutline: "#D9D9D9",
  grey0: "F5F4F4",
  greyBackground: "#363636",
}

export const lightTheme = createTheme({
  lightColors: commonColors,
  darkColors: {
    ...commonColors,
    background: "black"
  },

  components: {
    Text: (props, theme) => ({
      style: {
        fontFamily: "regular"
      }
    })
  }
});
