import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Line, Text } from '@react-three/drei';
import * as THREE from 'three'
import { useDrag } from "@use-gesture/react";
import { useSnapshot } from 'valtio';
import { Node, Frame, store } from './shared.data';

// abs positioned link back to home page
export const HomeLink = ({text="Home", className="text-black"}) => {
    return (
    <div className="absolute top-0 inset-1 z-50 font-bold">
        <a href="/" className={className}>{text}</a>
    </div>
    )
}

const handleColor = (hovered=false, color="black", hoveredColor="yellow")=>{
  return (hovered ? hoveredColor : color)
}

export const Sphere = ({position}) => {
  const ref = useRef();
  return(
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5]} />
      <meshNormalMaterial color={'blue'}/>
    </mesh>
  )
}

//A dragable node contrained to the plane
export const Node2D = ({ storeNode }) => {
  const node:Node = useSnapshot(storeNode)      
  const viewOptions = useSnapshot(store.options.view);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;      
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  
  const positionText = `[${node.position[0].toFixed(2)},${node.position[1].toFixed(2)},${node.position[2].toFixed(2)}]`
  const restraintText = `[${node.restraint}]`
  const bind = useDrag(
    ({active, delta:[x,z]}) => {
      storeNode.position = [node.position[0]+x/aspect, node.position[1], node.position[2]-z/aspect];
      store.options.lockcontrols = active;
    }
  );

  return (
    <group position={node.position} visible={viewOptions.node}>
      <mesh {...bind()} ref={ref}  
        onPointerOver={(e)=>(e.stopPropagation(), setHovered(true))} 
        onPointerOut={(e)=>setHovered(false)} 
        onClick={(e)=>(console.log(node), store.selectedObject = node)}>
        
        <sphereGeometry  attach="geometry" args={[0.5,12,12]}/>
        <meshBasicMaterial attach="material" color={handleColor(hovered,node.color)} />
      </mesh>
      <Html position={[0,0,0]} >
        {viewOptions.uid && <p>{node.uid}</p>}
        {viewOptions.coordinate && <p>{positionText}</p> }
        {viewOptions.restraint && <p>{restraintText}</p>}
      </Html>
     </group>
  );
}

export const Frame2D = ({storeFrame}) => {
  const frame:Frame = useSnapshot(storeFrame);
  const viewOptions = useSnapshot(store.options.view);
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const points = [frame.ni.position, frame.nj.position];

  return (
    <Line ref={ref}
      points={points}
      color={handleColor(hovered, frame.color)}
      lineWidth={hovered ? 5 : 3}
      onPointerOver={(e)=>(e.stopPropagation(), setHovered(true))}
      onPointerOut={(e)=>setHovered(false)}
      onClick={(e)=>(console.log(frame), store.selectedObject = frame)}
      visible={viewOptions.frame}
    />
  )

}