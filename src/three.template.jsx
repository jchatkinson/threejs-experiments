import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

export default function ThreeTemplate() {
  return (
    <Canvas className='h-screen'>
      <color attach="background" args={['white']} />
    </Canvas>
  )
}
