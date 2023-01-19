import { useRef } from 'react'
import { OrthographicCamera, OrbitControls, Grid } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'
import { Frame2D, Node2D, Sphere } from './shared.components'
import { folder, useControls, button } from 'leva';
import { useSnapshot } from 'valtio';
import { Node, store } from './shared.data';


export default function ThreeAddToGrid() {
    //use valtop to manage our objects
    const snap = useSnapshot(store);
    const nodes = snap.nodes; 
    const frames = snap.frames
    
    const panel = useControls({
      'Add Object': folder({
        'coordinate': [1,1,1],
        'add': button((get)=>{
          console.log(get('Add Object.coordinate'))
          store.nodes.push(new Node({position:get('Add Object.coordinate')}))},)
      }),
      'View Settings': folder({
        'grid':{value:true, onChange:(value)=>store.options.view.grid=value},
        'nodes':{value:true, onChange: (value)=>store.options.view.node=value},
        'frames':{value:true, onChange: (value)=>store.options.view.frame=value},
        'coordinates':{value:false, onChange: (value)=>store.options.view.coordinate=value},
        'restraints':{value:false, onChange: (value)=>store.options.view.restraint=value},
        'object id':{value:false, onChange: (value)=>store.options.view.uid=value},  
      }),
      'Selected Object': folder({
        'obj id':'todo'
      })
    });      

  return (
    <Canvas className='h-screen'>
      <color attach="background" args={['white']} />
      <OrthographicCamera makeDefault zoom={20} position={[0, -50, 0]} />
      <OrbitControls minZoom={10} maxZoom={50} enabled={!snap.options.lockcontrols}/>
      {snap.options.view.grid && <Grid position={[0,0,0]} infiniteGrid cellSize={1} sectionSize={10} />}
      {nodes.map((n,i)=>{
         return <Node2D key={n.uid} storeNode={store.nodes[i]} /> 
        // return <Sphere position={n.position} />
      })}

      {frames.map((f,i)=>{
        return <Frame2D key={f.uid} storeFrame={store.frames[i]} />
      })}
      
    </Canvas>
  )
}
