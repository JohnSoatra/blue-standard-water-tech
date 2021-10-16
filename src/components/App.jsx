import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core"
import theme_day from "../styles/theme_day";
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import Admin from './Admin';
import Notfound from './Notfound';

const App = props => {
  const [theme, setTheme] = useState(theme_day);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path={["/", "/index.html"]} component={() => 
          <>
            <Header />
            <Homepage />
            <Footer />
          </>
        }/>
        <Route path="/admin" component={null} />
        <Route component={Notfound} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
