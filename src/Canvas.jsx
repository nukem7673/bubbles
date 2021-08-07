import React, { useState, useEffect } from 'react'
import useCanvas from './useCanvas'

// props (draw, options)
const Canvas = props => {  
  const { draw, options, ...rest } = props

  const canvasRef = useCanvas(draw, options)
  
  return <canvas id="test" ref={canvasRef} {...rest} width={props.width} height={props.height}/>
}

export default Canvas
