import { useRef } from 'react'
import { OrbitControls, TorusKnot } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

export default function ThreeTest() {
  return (
    <Canvas className='h-screen'>
      <color attach="background" args={['black']} />
      <OrbitControls />
      <Thing />
    </Canvas>
  )
}

function Thing() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.01))
  return (
    <TorusKnot ref={ref} args={[1, 0.3, 128, 16]}>
      <meshNormalMaterial />
    </TorusKnot>
  )
}