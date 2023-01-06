import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { HomeLink } from './shared.components'

export default function ThreeTemplate() {
  return (
    <>
    <HomeLink />
    <Canvas className='h-screen'>
      <color attach="background" args={['white']} />
    </Canvas>
    </>
  )
}
