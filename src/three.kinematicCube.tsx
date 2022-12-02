import type { PlaneProps, Triplet } from '@react-three/cannon'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { MeshPhongMaterialProps, useThree } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import type { InstancedMesh, Mesh } from 'three'
import { Color } from 'three'
import { useControls } from 'leva'

function Plane({ color=null, ...props }) {
  usePlane(()=>({...props}))
  return null
}

function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [6] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7))
}

function BoundaryBox() {
  const {viewport} = useThree()
  return (<>
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[0, viewport.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 1]} rotation={[0, -Math.PI, 0]} />
  </>)
}

function InstancedSpheres() {
  const {number, active } = useControls({number: 100, active:false})
  const [ref] = useSphere(
    (index) => ({
      args: [0.125],
      mass: 1,
      position: [Math.random(), Math.random(), Math.random()*10],
    }),
    useRef<InstancedMesh>(null),
  )
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, number]}>
      <sphereGeometry args={[0.125, 16, 16]} />
      <meshStandardMaterial color="black" />
    </instancedMesh>
  )
}

export default function KinematicCube() {
  return(
  <Canvas shadows gl={{ alpha: false }} camera={{ position: [0, 0, 20], fov: 50, near: 10, far: 40 }}>
    <color attach="background" args={['yellow']} />
    <hemisphereLight intensity={0.5} />
    <spotLight
      position={[30, 0, 30]}
      angle={0.3}
      penumbra={1}
      intensity={2}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
    />
    <OrbitControls/>
    <Physics gravity={[0, -1, 0]}>
      <BoundaryBox/>
      <InstancedSpheres />
      <Mouse/>
    </Physics>
  </Canvas>
)}