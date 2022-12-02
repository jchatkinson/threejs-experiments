import { useMemo, useRef } from 'react'
import { Circle, OrbitControls, PerspectiveCamera, Point, TorusKnot } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function ThreeSplineEditor() {
    const {tension} = useControls({tension: {value: 0.5, min:0, max:1, step:0.1}})
  return (
    <Canvas className='h-screen'>
      <color attach="background" args={['#f0f0f0']} />
      <PerspectiveCamera makeDefault position={[0,250,1000]}/>
      <ambientLight color={"#f0f0f0"} />
      <spotLight position={[0, 1500, 200]} angle={Math.PI*0.2} castShadow shadow={{camera:{near:200, far:2000}, bias:-0.000222, mapSize:[10240,10240] }}/>
      
      <mesh position={[0,-200,0]}>
        <planeGeometry args={[2000,2000]} rotateX={-Math.PI/2} />
      </mesh>

      <gridHelper args={[2000,100]} position={[0,-199,0]} material={{opacity:0.25, transparent:true}} />



      <OrbitControls />
      
    </Canvas>
  )
}