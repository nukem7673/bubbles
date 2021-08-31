import { useEffect, useRef, useState } from 'react'
import { GradientSteps } from './Effects'
import Bubbles from './Bubbles'
import { WhiteCircle } from './Draw'


const useCanvas = (draw, options = {}) => {
  const [currentCanvas, updateCanvas] = useState(null)
  const canvasRef = useRef(null)
  
  useEffect(() => {
    console.log(`useCanvas is now running . . . `)
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || '2d')

    const bubbleArray = Bubbles({context});

    const circleOptions = {
      x: window.innerHeight/2,
      y: window.innerWidth/2,
      radius: Math.min(window.innerWidth, window.innerHeight) / 2.75 + 10,
      colors: {
        stroke: "#ffffff",
        fill: "transparent"
      },
      lineWidth: 10
    }

    let frameCount = 0
    let animationFrameId

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++
     
      // WhiteCircle(circleOptions, context);
      bubbleArray.sort((a, b) => {
        return a.z - b.z;
      })
      draw(bubbleArray, frameCount)

      animationFrameId = window.requestAnimationFrame(render)
    }


    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return canvasRef
}

export default useCanvas
