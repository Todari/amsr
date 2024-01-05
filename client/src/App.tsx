import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';

function App() {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-row justify-center min-h-screen min-w-[320px]">
        <div className="grow z-10 bg-slate-100" />
        <div className="max-w-3xl w-screen min-w-[320px] bg-white">
          <Header />

          <Routes>
            <Route path='/' Component={Main} />
            <Route path='/apply' Component={Apply} />
          </Routes>
        </div>
        <div className="grow z-10 bg-slate-100" />
      </div>
    </div>
  )
}

export default App;
