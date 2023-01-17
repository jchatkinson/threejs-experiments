//global state shared atoms using Jotai
import { atom } from "jotai";
import { proxy, useSnapshot } from 'valtio';
import { derive } from 'valtio/utils'

//a simple uid = suid
export const suid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');

export class Obj {
    uid:string;
    selected:boolean;
    visible:boolean;
    hovered:boolean;
    color:string;
    userData:object;
    constructor({uid=suid(), selected=false, visible=true, hovered=false, color="black", userData={}}={}) {
        this.uid = uid;
        this.selected = selected;
        this.visible = visible;
        this.hovered = hovered;
        this.color = color;
        this.userData = userData;
    }
}

export class Node extends Obj {
    position:number[]; 
    restraint:number[];
    
    constructor({position=[0,0,0], restraint=[0,0,0,0,0,0], uid=suid(), selected=false, visible=true, hovered=false, color="indianred", userData={}}={}) {
        super({uid, selected, visible, hovered, color, userData});
        this.position = position;
        this.restraint = restraint;
    }
};

export class Frame extends Obj {
    ni:Node; 
    nj:Node;
    E:number;
    A:number;
    I:number;
    J:number;
    constructor({ni=new Node(), nj=new Node(), uid=suid(), E=29000, A=1, I=1, J=1, selected=false, visible=true, hovered=false, color="navy", userData={}}={}) {
        super({uid, selected, visible, hovered, color, userData});
        this.ni = ni;
        this.nj = nj;
        this.E = E;
        this.A = A;
        this.I = I;
        this.J = J;
    }

    //lenth of frame
    get length() {
        let diffsquared = this.ni.position.map((x,ii)=>Math.pow(x-this.nj.position[ii], 2)) // (x1-x2)^2
        return Math.sqrt(diffsquared.reduce((sum, val)=>sum+val));
    }
};

export const store = proxy({
    nodes: [new Node(), new Node({position:[10,0,0]}), new Node({position:[10,10,0]})],
    options: {
        view: {
            node:true,
            frame:true,
            restraint: false,
            coordinate: false,
            uid: false,
        }
    }
})

derive({
    frames: (get) => [
        new Frame({ni:get(store.nodes[0]), nj:get(store.nodes[1])}), 
        new Frame({ni:get(store.nodes[0]), nj:get(store.nodes[2])}), 
        new Frame({ni:get(store.nodes[1]), nj:get(store.nodes[2])}), ]
}, {
    proxy: store,
})


// const frames = [
//     new Frame({ni:nodesAtom[0], nj:nodesAtom[1]}),
//     new Frame({ni:nodesAtom[0], nj:nodesAtom[2]}),
//     new Frame({ni:nodesAtom[1], nj:nodesAtom[2]})
// ]new Node(), new Node({position:[10,0,0]}), new Node({position:[10,10,0]})

//create a set of atoms for a simple triangle structure nodes
// export const nodesAtom = atom<Node[]>([new Node(), new Node({position:[10,0,0]}), new Node({position:[10,10,0]})]);

//create a writeonly atom to add nodes
// export const addNodeAtom = atom(null, (get,set,update:Node)=>set(nodesAtom, (prev)=>[...prev, update]))

//create a writeonly atom to edit nodes
// export const editNodeAtom = atom(null, (get,set,editedNode:Node)=>{
//     const nodes = get(nodesAtom);
//     const ii = nodes.findIndex(n=>n.uid === editedNode.uid); 
//     if (ii<0 || editedNode === nodes[ii]) {
//         //nothing has changed, return.
//         return
//     } else {
//         nodes[ii] = editedNode;
//         set(nodesAtom,nodes)
//     }
// });

//initialize an empty frames atom
// export const framesAtom = atom<Frame[]>([]);

//create writeonly atom to add frames
// export const addFrameAtom = atom(null, (get,set,update:Frame)=>set(framesAtom, (prev)=>[...prev, update]));
