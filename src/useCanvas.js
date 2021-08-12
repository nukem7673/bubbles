import { useEffect, useRef, useState } from 'react'
import { GradientSteps } from './Effects'
import Bubbles from './Bubbles'
import { WhiteCircle } from './Draw'


const useCanvas = (draw, options = {}) => {
  const [currentCanvas, updateCanvas] = useState(null)
  const canvasRef = useRef(null)
  const colors = GradientSteps('#00e1ff', '#ff00f2', 100)
  
  useEffect(() => {
    console.log(`useCanvas is now running . . . `)
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || '2d')

    const bubbleArray = Bubbles({context});

    const circleOptions = {
      x: window.innerHeight/2,
      y: window.innerWidth/2,
      radius: Math.min(window.innerHeight,window.innerWidth) / 4,
      colors: {
        stroke: "#ffffff",
        fill: "transparent"
      }
    }

    let frameCount = 0
    let animationFrameId

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      options.color = colors[frameCount % 100]

      
      WhiteCircle(circleOptions, context);
      draw(bubbleArray)

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
