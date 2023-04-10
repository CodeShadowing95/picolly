import React from 'react';
import { ThemeProvider, Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth2 from './components/Auth/Auth2';


// To define a new font family
import themeFont from './theme/themeFont';
const App = () => {

  return (
    // Define "Montserrat" font as font family' gloabal page
    <ThemeProvider theme={themeFont}>
      <Container maxWidth="lg">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth2 />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;