import { useRef } from 'react'
import { OrbitControls, Html } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { HomeLink } from './shared.components';
import { useState } from 'react';

export default function ThreeBindObjectToMouse() {
  return (
    <Canvas className='h-screen' camera={{position:[0,0,50]}}>
      <color attach="background" args={['white']} />
      <MouseBoundObject />
      <Html fullscreen>
        <span>Click the sphere to stop tracking. Click it again to start tracking.</span>
        </Html>
    </Canvas>
  )
}

function MouseBoundObject() {
//viewport = canbase in 3d units
  const {viewport} = useThree();
  const ref = useRef();
  const [bound,setBound] = useState(true)

  useFrame(({mouse}) => {
    if(bound) {
      const x = (mouse.x*viewport.width)/2;
      const y = (mouse.y*viewport.height)/2;
      ref.current.position.set(x,y,0);
    }
  })

  return(
    <mesh ref={ref} onClick={()=>setBound(!bound)}>
      <sphereGeometry args={[2]} />
      <meshNormalMaterial color={'blue'}/>
    </mesh>
  )
}
