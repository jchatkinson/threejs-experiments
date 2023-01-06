import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

export default function ThreeBindObjectToMouse() {
  return (
    <Canvas className='h-screen' camera={{position:[0,0,50]}}>
      <color attach="background" args={['white']} />
      <MouseBoundObject />
    </Canvas>
  )
}

function MouseBoundObject() {
//viewport = canbase in 3d units
  const {viewport} = useThree();
  const ref = useRef();

  useFrame(({mouse}) => {
    const x = (mouse.x*viewport.width)/2;
    const y = (mouse.y*viewport.height)/2;
    ref.current.position.set(x,y,0);
  })

  return(
    <mesh ref={ref} onClick={e=>console.log(e)}>
      <sphereGeometry args={[2]} />
      <meshNormalMaterial color={'blue'}/>
    </mesh>
  )
}
