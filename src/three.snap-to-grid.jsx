import { useRef, useState } from 'react'
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";


//from https://codesandbox.io/s/musing-night-wso9v?file=/src/Obj.jsx:49-153
export default function ThreeSnapToGrid() {
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Canvas style={{ background: "white" }} shadows dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <directionalLight        intensity={0.5}        castShadow        shadow-mapSize-height={1512}        shadow-mapSize-width={1512}      />
      <gridHelper args={[100, 100]} />    
      <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} initPos={[5,0,3]} /> */
      <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} initPos={[-5,0,3]} />
      <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} initPos={[-2,0,-5]} />
      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 0]} />
      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
    </Canvas>
  )
}

function Obj({ setIsDragging, floorPlane, initPos=[0,0,0] }) {
  const [pos, setPos] = useState(initPos);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { mass:0.5, tension:200, friction: 10 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([Math.round(planeIntersectPoint.x), 0, Math.round(planeIntersectPoint.z)]);
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1.2 : 1,
        rotation: [y / aspect, x / aspect, 0]
      });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh {...spring} {...bind()}>
      <sphereGeometry ref={dragObjectRef} attach="geometry" args={[0.5]}/>
      <meshToonMaterial attach="material" color={"blue"}/>
    </animated.mesh>
  );
}