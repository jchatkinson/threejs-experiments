import { useMemo, useRef } from 'react'
import { Circle, OrbitControls, PerspectiveCamera, Point, TorusKnot } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

export default function ThreeMolecules() {
  return (
    <Canvas className='h-screen'>
      <color attach="background" args={['yellow']} />
      <PerspectiveCamera makeDefault position={[0,0,-100]}/>
      <OrbitControls />
      <Atoms />
    </Canvas>
  )
}

//A sphere moving through space
function Atom({position=[0,0,0], velocity=[0,0,0], limit=100, ...props}) {
  const ref = useRef()
  useFrame(() => {
    // ref.current.position.x+velocity[0] > limit || ref.current.position.x+velocity[0] < -limit ? 
    ref.current.position.y += velocity[1];
    ref.current.position.z += velocity[2];
    })
  return (
    // <Point ref={ref} position={position} {...props} />
    <Circle ref={ref} position={position} args={[,12]}>
      <meshBasicMaterial color={"black"} />
    </Circle>
  )
}

//A collection of random atoms
function Atoms() {
    const positions = useMemo(()=>Array.from({length:500}, ()=> [Math.random()*100, Math.random()*100, Math.random()*100]), []);
    const velocities = useMemo(()=>Array.from({length:500}, ()=> [Math.random()*2-1, Math.random()*2-1, Math.random()*2-1]), []);
    const boundary = [100,100,100];

    return (
        <group>
            {positions.map((pos,i)=> (
              <Atom key={i} position={pos} velocity={velocities[i]} boundary={boundary} />
            ))}
        </group>
        
    )
}