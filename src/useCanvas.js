import {useEffect, useRef} from 'react'

const useCanvas = (draw, options={}) => {
  
  const canvasRef = useRef(null)
  
  const newColor = () => {
	return Math.floor(Math.random()*16777215).toString(16)
  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || '2d')
    let frameCount = 0
    let animationFrameId
    let color = newColor()
    const render = () => {
      frameCount++
      if (frameCount % 55 == 0)
	    color = newColor()
      draw(context, frameCount, color)
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
