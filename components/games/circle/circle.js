import { useEffect,useRef } from "react"
import Style from '../../../styles/games/circle/circle.module.css'

const Circle = () => {

  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const element = ref.current;
      if (!element) return;

      const transform = `translateY(${event.clientY - 100}px) translateX(${event.clientX - 100}px)`;
      element.style.transform = transform;
    };

    window.addEventListener("click", handleClick, false);

    return () => {
      window.removeEventListener("click", handleClick, false);
    };
  }, []);

    return(
        <div className={Style.circle} ref={ref}>

        </div>
    )
}

export default Circle