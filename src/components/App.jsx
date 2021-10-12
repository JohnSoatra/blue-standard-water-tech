import React, { useState } from 'react';
import { ThemeProvider } from "@material-ui/core"
import theme_day from "../styles/theme_day";
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';

const App = props => {
  const [theme, setTheme] = useState(theme_day);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Homepage />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
