
import { _decorator, Component, Node, Vec3, tween, randomRange, Prefab, instantiate, RigidBody, random, randomRangeInt, Collider, Vec2 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('CarManager')
export class CarManager extends Component {
    static v_instance:CarManager;
    onLoad(){
        CarManager.v_instance = this;
    }

    @property({type:Node})
    v_car:Node;
    @property({type:Node})
    v_carAttackStartPosition:Node;
    @property
    v_carAttackNumber:number = 10;
    @property({type:[Node],serializable:true})
    v_attackTarget:Node[] = [];
    @property({type:Prefab})
    v_attacSphere:Prefab;
    v_attackHeight:{min:number,max:number} = {min:0,max:0};
    @property
    v_intercalTime:number = 0.1;

    f_ATK(){
        this.schedule(()=>{
            let temp:Node = instantiate(this.v_attacSphere);
            temp.setParent(GameManager.v_instance.v_gameObjectParsent);
            temp.setWorldPosition(this.v_carAttackStartPosition.worldPosition);
            temp.addComponent(CarAttact);
            let tempTS:CarAttact = temp.getComponent(CarAttact);
            tempTS.f_Initialization(this.v_attackTarget[randomRangeInt(0,this.v_attackTarget.length)],{min:-3,max:3},{min:5,max:10},{min:-3,max:3},{min:0.3,max:1},this.v_intercalTime * 2,true);
            },this.v_intercalTime,10);
    }
}



export class CarAttact extends Component{
    v_target:Vec3;
    v_height:number;
    v_time:number;
    v_isInitialization:boolean;
    v_intervalTime:number;
    f_Initialization(target:Node,targetPosX:{min:number,max:number},height:{min:number,max:number},targetPosZ:{min:number,max:number},time:{min:number,max:number},intervalTime:number,isInitialization:boolean){
        this.v_target = Vec3.add(new Vec3(),target.worldPosition,new Vec3(randomRange(targetPosX.min,targetPosX.max),0,randomRange(targetPosZ.min,targetPosZ.max)));
        this.v_isInitialization = isInitialization;
        this.v_time = randomRange(time.min,time.max);
        this.v_height = randomRange(height.min,height.max);
        this.v_intervalTime = intervalTime;
        this.f_Attack(this.node,this.v_target,this.v_height);
    }
    f_Attack(startTr:Node,targetVec3:Vec3,height:number){
        tween(startTr.getWorldPosition(new Vec3()))
            .delay(0)
            .to(this.v_time, targetVec3, { 'onUpdate': (target:Vec3,ratio:number):void=>{ 
                this.node.worldPosition =  Vec3.add(new Vec3(),target,new Vec3(0,Math.sin(Math.PI*ratio) * height,0));},"onComplete":()=>{
                    this.f_Fissure({min:height * 0.4,max:height * 0.3});
                }})
            .union()
            .repeat(1)
            .start();  
    }
    f_Fissure(height:{min:number,max:number}){
        this.schedule(
            ()=>{let temp:Node = instantiate(CarManager.v_instance.v_attacSphere);
            temp.setParent(GameManager.v_instance.v_gameObjectParsent);
            temp.setWorldPosition(this.node.worldPosition);
            let radius:number = randomRange(0.3,0.7);
            temp.setWorldScale(Vec3.multiply(new Vec3(),this.node.getWorldScale(new Vec3()),new Vec3(radius,radius,radius)));

            temp.addComponent(Fissure);
            let tempTS:Fissure = temp.getComponent(Fissure);
            tempTS.f_Initialization(temp.getWorldPosition(new Vec3()),{min:temp.getWorldScale(new Vec3()).x * -3,max:temp.getWorldScale(new Vec3()).x * 3},height,{min:0.5,max:1},this.v_intervalTime * 2);
            },this.v_intervalTime,7);
    }
}

export class Fissure extends Component{

    v_intervalTime:number;
    v_height:number;
    f_Initialization(targetVec3:Vec3,radius:{min:number,max:number},height:{min:number,max:number},time:{min:number,max:number},intervalTime:number){
        let tempVec3 = Vec3.add(new Vec3(),targetVec3,new Vec3(randomRange(radius.min,radius.max),0,randomRange(radius.min,radius.max)));
        this.v_height = randomRange(height.min,height.max);
        let tim = randomRange(time.min,time.max);
        this.v_intervalTime = intervalTime;
        this.f_Move(this.node,tempVec3,this.v_height,tim);
    }
    f_Move(startTr:Node,targetVec3:Vec3,height:number,time:number){
        let tween1 = tween(startTr.getWorldPosition(new Vec3()))
            .delay(0)
            .to(time, targetVec3, { 'onUpdate': (target:Vec3,ratio:number):void=>{ 
                this.node.worldPosition =  Vec3.add(new Vec3(),target,new Vec3(0,Math.sin(Math.PI*ratio) * height,0));},"onComplete":()=>{
                    if (this.node.getWorldScale(new Vec3()).x >= 0.3) {
                        this.f_Fissure({min:this.v_height * 0.4,max:this.v_height * 0.3});
                    }
                }})
            .union()
            .repeat(1)
            .start();  
    }

    f_Fissure(height:{min:number,max:number}){
        this.schedule(
        ()=>{let temp:Node = instantiate(CarManager.v_instance.v_attacSphere);
        temp.setParent(GameManager.v_instance.v_gameObjectParsent);
        temp.setWorldPosition(this.node.worldPosition);
        let radius:number = randomRange(0.3,0.7);
        temp.setWorldScale(Vec3.multiply(new Vec3(),this.node.getWorldScale(new Vec3()),new Vec3(radius,radius,radius)));

        temp.addComponent(Fissure);
        let tempTS:Fissure = temp.getComponent(Fissure);
        tempTS.f_Initialization(temp.getWorldPosition(new Vec3()),{min:temp.getWorldScale(new Vec3()).x * -3,max:temp.getWorldScale(new Vec3()).x * 3},height,{min:0.5,max:1},this.v_intervalTime * 2);
        },this.v_intervalTime,5);
    }
}
