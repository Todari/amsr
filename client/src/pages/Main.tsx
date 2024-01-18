
import MainLandingTitle from "@/components/MainLandingTitle"
import MainLanding from "../components/MainLanding"
import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setShowHeader } from "@/store/headerStateReducer"
import scrollPosition from "@/model/scrollPosition"

const Main = () => {
  let container: null | HTMLElement = document.getElementById('snap-container')
  const [scrollPosition, setScrollPosition] = useState<scrollPosition>({ prev: 0, current: 0 })
  const dispatch = useAppDispatch();
  const { showHeader } = useAppSelector((state) => state.headerState)
  const containerRef = useRef(null)
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (container) {
      container?.addEventListener('scroll', handleScroll)
      console.log(scrollPosition.prev, scrollPosition.current)
      console.log(showHeader)
      return () => {
        container?.removeEventListener('scroll', handleScroll)
      }
    }
  }, [container?.scrollTop])

  const handleScroll = () => {
    if (container) {
      const prev = scrollPosition.current
      setScrollPosition({ prev: prev, current: container.scrollTop });
      // setScrollPosition({ prev: 0, current: 0 })
    }
    dispatch(setShowHeader(scrollPosition.prev >= scrollPosition.current))
    if (scrollPosition.current < 50) {
      dispatch(setShowHeader(true))
    }
  }
  
  return (
    <div id="snap-container" className='snap-mandatory snap-y overflow-scroll h-[100dvh]'>
      <div ref={containerRef} className="flex flex-col items-center">
        <MainLandingTitle />
        <MainLanding />
      </div>
    </div>
  )
}

export default Main