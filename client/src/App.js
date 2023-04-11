import React from 'react';
import { ThemeProvider, Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth2 from './components/Auth/Auth2';


// To define a new font family (Montserrat, sans-serif)
import themeFont from './theme/themeFont';
const App = () => {

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeFont}>
        <Container maxWidth="lg">
          <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" exact element={<Auth2 />} />
            </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;