import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'


export default function Move(props) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  useEffect(() => {
    api({ x: props.x, y: props.y })
  }, [props.x, props.y, api])

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }))

  // Bind it to a component
  return (
    <animated.div {...bind()} style={{ x, y, touchAction: 'none', position: 'absolute' }}>
      {props.children}
    </animated.div>
  )
}
