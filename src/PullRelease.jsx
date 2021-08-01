import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

export default function PullRelease(props) {
  const [{ x, y }, set] = useSpring(() => ({ x: props.x, y: props.y}))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : x, y: down ? my : props.y })
  })

  // Bind it to a component
  return (
	  <animated.div {...bind()} style={{ x, y, touchAction: 'none' , height: '200px', width: '200px'}}>
		{props.children}
	</animated.div>
)
}
