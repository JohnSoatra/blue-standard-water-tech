import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';

const App = props => {
  return (
    <div className="App">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
