import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Apply from './pages/Apply';
import { Toaster } from './components/ui/toaster';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hooks';
import { setShowHeader } from './store/headerStateReducer';

type scrollPosition = {
  prev: number,
  current: number
}

function App() {
  const [scrollPosition, setScrollPosition] = useState<scrollPosition>({ prev: window.scrollY, current: window.scrollY })
  const dispatch = useDispatch();
  const { showHeader } = useAppSelector((state) => state.headerState)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // console.log(scrollPosition.prev, scrollPosition.current)
    // console.log(showHeader)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [window.scrollY])

  const handleScroll = () => {
    setScrollPosition({ prev: scrollPosition.current, current: window.scrollY });
    dispatch(setShowHeader(scrollPosition.prev >= scrollPosition.current))
    if (window.scrollY < 50) {
      dispatch(setShowHeader(true))
    }
  }


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
