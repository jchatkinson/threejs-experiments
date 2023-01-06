import { useRef, useState } from 'react'
import { OrbitControls, TorusKnot } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { atom, useAtom } from 'jotai'
import { useDrag } from "@use-gesture/react";
import { HomeLink } from './shared.components';

export default function ThreeJotai() {
  const [boxes, setBoxes] = useState([]);

  const addBox = () => {
    const newbox = atom({ position: [10 * Math.random() - 5, 10 * Math.random() - 5, 0], hovered: false })
    setBoxes((prev) => [...prev, newbox]);
  }

  const addBoxAtMouse = () => {
    const newbox = atom({ position: [10 * Math.random() - 5, 10 * Math.random() - 5, 0], hovered: false })
    setBoxes((prev) => [...prev, newbox]);
  }

  return (
    <div>
      <button onClick={addBox} className="z-50 absolute inset-y-1/2 inset-x-1/2 h-12 w-24 btn -translate-x-12 -translate-y-6" >Add Box</button>
      <div className='h-screen flex flex-col'>
        <div className='flex-auto'>
          <Canvas onPointerMissed={e => console.log(e)}>
            <color attach="background" args={['lightgrey']} />
            <ambientLight intensity={0.8} />
            <pointLight position={[100, 100, 100]} intensity={0.7} />
            <Boxes boxes={boxes} />
          </Canvas>
        </div>
        <div className='flex-auto'>
          <Canvas>
            <color attach="background" args={['skyblue']} />
            <ambientLight intensity={0.8} />
            <pointLight position={[100, 100, 100]} intensity={0.7} />
            <Boxes boxes={boxes} />
          </Canvas>
        </div>
      </div>
    
    </div>

  )
}

function Boxes({ boxes }) {
  return (
    <>
      {boxes.map((box) => (
        <Box key={box.key} box={box} />
      ))}
    </>
  )
}

function Box({ box }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [{ position, hovered }, setBox] = useAtom(box);
  const mesh = useRef();

  const setHover = (x) => setBox((prev) => ({ ...prev, hovered: x }));

  const bind = useDrag(({ delta: [x, y] }) => setBox((prev) => ({ ...prev, position: [prev.position[0] + x / aspect, prev.position[1] - y / aspect, 0] })), { eventOptions: { pointer: true } });

  //give the boxes a rotating animation
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh {...bind()} position={position} ref={mesh} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? "skyblue" : "darkblue"} />
    </mesh>
  )
}

