import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';

function App() {
  return (

    <div className="flex flex-row justify-center min-h-screen">
      <div className="grow z-10 bg-slate-100" />
      <div className="max-w-3xl w-screen">
        <Header />

        <Routes>
          <Route path='/' Component={Main} />
          <Route path='/apply' Component={Apply} />
        </Routes>
      </div>
      <div className="grow z-10 bg-slate-100" />
    </div>
  )
}

export default App;
