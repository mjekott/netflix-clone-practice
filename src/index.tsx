import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GLobalStyle } from "./GlobalStyles";
import { myTheme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <GLobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
