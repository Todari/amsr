import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';
import { Toaster } from './components/ui/toaster';

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
  }, [])

  const handleScroll = () => {
    setScrollPosition({ prev: scrollPosition.current, current: window.scrollY });
    setIsScrollDown(scrollPosition.prev <= scrollPosition.current)
    if (window.scrollY < 50) {
      setIsScrollDown(false)
    }
  }


  return (
    <div>
      <Header visible={!isScrollDown} />

      <Routes>
        <Route path='/' Component={Main} />
        <Route path='/apply' Component={Apply} />
      </Routes>
      <Toaster/>

    </div >

  )
}

export default App;
