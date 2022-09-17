import { useFrame } from "@react-three/fiber"
import { useEffect, useState } from 'react'
import { parameters } from "../parameters"

const Scroll = () => {
  //scroll hight
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = event => {
      setScrollY(window.scrollY)
      console.log('window.scrollY', scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Window dimensions
  const [windowSize, setWindowSize] = useState({
    width:undefined,
    height:undefined
  })
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
      console.log('window size: ',windowSize)
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [])

  // This one makes the camera move in and out
  useFrame(({ camera }) => {
    camera.position.y = - scrollY / windowSize.height * parameters.objectsDistance
  })
  return null
}

export default Scroll