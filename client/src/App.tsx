import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';
import { Toaster } from './components/ui/toaster';
import { useAppSelector } from './hooks';

function App() {
  const { showHeader } = useAppSelector((state) => state.headerState)

  return (
    <div>
      <Header visible={showHeader} />

      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/apply' Component={Apply} />
      </Routes>
      <Toaster />

    </div >

  )
}

export default App;
