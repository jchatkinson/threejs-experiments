//global state shared atoms using Jotai
import { proxy } from 'valtio';
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
    type:string = 'node';
    load:number[];
    constructor({position=[0,0,0], restraint=[0,0,0,0,0,0], load=[], uid=suid(), selected=false, visible=true, hovered=false, color="indianred", userData={}}={}) {
        super({uid, selected, visible, hovered, color, userData});
        this.position = position;
        this.restraint = restraint;
        this.load = load;
    }
};

export class Frame extends Obj {
    ni:Node; 
    nj:Node;
    E:number;
    A:number;
    I:number;
    J:number;
    type:string = 'frame';
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
    selectedObject: null,
    nodes: [new Node(), new Node({position:[10,0,0]}), new Node({position:[10,0,10]})],
    options: {
        lockcontrols: false,
        view: {
            grid:true,
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