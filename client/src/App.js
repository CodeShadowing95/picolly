import React from 'react';
import { ThemeProvider, Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';

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
              <Route path="/auth" exact element={<Login />} />
            </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;