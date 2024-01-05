import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';

type scrollPosition = {
  prev: number,
  current: number
}

function App() {
  const [scrollPosition, setScrollPosition] = useState<scrollPosition>({ prev: window.scrollY, current: window.scrollY })
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [window.scrollY])

  const handleScroll = () => {
    setScrollPosition({ prev: scrollPosition.current, current: window.scrollY });
    setIsScrollDown(scrollPosition.prev <= scrollPosition.current)
    if (window.scrollY < 50) {
      setIsScrollDown(false)
    }
  }


  return (
    <div className="bg-slate-100">
      <div className="flex flex-row justify-center min-h-screen min-w-[320px]">
        <div className="grow z-10 bg-slate-100" />
        <div className="max-w-3xl w-screen min-w-[320px] bg-white">
          <Header visible={!isScrollDown} />

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
