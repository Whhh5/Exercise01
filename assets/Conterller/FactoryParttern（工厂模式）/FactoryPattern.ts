
import { _decorator, Component, Node, Prefab ,instantiate, Vec3, CCClass, input, Input, EventKeyboard, KeyCode, randomRange, lerp, math, PhysicsRayResult, computeRatioByType, director,geometry, Camera, physics, PhysicsSystem, CameraComponent} from 'cc';
import { EnemyManager} from '../SingletonPattern（单例模式）/EnemyManager';
import { GameManager } from '../SingletonPattern（单例模式）/GameManager';
import { PlayerManager } from '../SingletonPattern（单例模式）/PlayerManager';
import { ShieldDebrisManager } from '../SingletonPattern（单例模式）/ShieldDebrisManager';
const { ccclass, property } = _decorator;
const {Ray} = geometry;
 
@ccclass('FactoryPattern')
export class FactoryPattern extends Component {
    static v_instance:FactoryPattern;

    

    //

    


    onLoad(){
        FactoryPattern.v_instance = this;
    }
    //生成护盾
    f_CreatShieldDebris(){
        let temp:Node = instantiate(ShieldDebrisManager.v_instance.v_shieldDebris);
        temp.setParent(GameManager.v_instance.v_gameObjectParsent);
        temp.setWorldPosition(PlayerManager.v_instance.v_player.getWorldPosition(new Vec3()));
        temp.addComponent(ShieldDebrisMove);
        let tempTS:ShieldDebrisMove = temp.getComponent(ShieldDebrisMove);
        tempTS.f_Initialization(true);
    }
    //生成旋风怪
    f_AddOneEnemy_Cyclone(){
        let temp = instantiate(EnemyManager.v_instance.v_cyclone);
        temp.setParent(EnemyManager.v_instance.v_cycloneParent);
        temp.addComponent(CycloneEnemyContorller);
        let tempTS:CycloneEnemyContorller = temp.getComponent(CycloneEnemyContorller);
        tempTS.f_Initialization(true,EnemyManager.v_instance.v_sphereNumber);
    }
    f_AddOneEnemy_Bat(){
        console.log("生成一个蝙蝠怪");
    }
    f_AddOneEnemy_Shackles(){
        console.log("生成一个蝙蝠怪");
    }
}





//旋风怪脚本
export class CycloneEnemyContorller extends Component {

    v_isInitialization:boolean = false;
    f_Initialization(v_isInitialization:boolean,sphereEum:number){
        console.log("生成一个旋风怪成功,添加了控制脚本,进行了初始化");
        this.v_isInitialization = v_isInitialization;
        //次数，延迟，
        this.schedule(this.f_InstantiateSphere,0.01,sphereEum,1);
    }

    f_InstantiateSphere(){
        let temp = instantiate(EnemyManager.v_instance.v_cycloneSphere);
        temp.setParent(EnemyManager.v_instance.v_cycloneParent);
        temp.addComponent(CycloneSphereMove);
        let sphereMove:CycloneSphereMove = temp.addComponent(CycloneSphereMove);
        sphereMove.f_Initialization({min:0.5,max:2},{min:1,max:5},{min:-2,max:5},{min:0.3,max:1},{min:50,max:100},this.node,true);
    }

    update(delteTime:number){
        if (EnemyManager.v_instance.v_cycloneAttackTarget != null && this.v_isInitialization) {
            this.f_Move(delteTime,EnemyManager.v_instance.v_cycloneAttackTarget,-EnemyManager.v_instance.v_cycloneMoveSpeed);
        }
    }

    f_Move(delteTime:number,v_target:Node,moveSpeed:number){

        this.node.lookAt(new Vec3(v_target.worldPosition.x,this.node.getWorldPosition(GameManager.v_instance.v_pubilc_Vec3).y,v_target.worldPosition.z));
        this.node.translate(new Vec3(0,0,moveSpeed * delteTime));
    }
}
//旋风怪的球
export class CycloneSphereMove extends Component {
    

    //跟随目标
    v_target:Node = null;

    //建议值50
    v_moveRadius:number = 0;

    v_moveHeight:number = 0;
    //建议值  1
    v_moveSpeedZ:number = 0;

    v_scaleSpeed:number = 0;

    //建议值  50
    v_moveSpeedX:number = 0;

    //是否已经初始化了
    v_isInitialization:boolean = false;

    f_Initialization(v_moveRadius:{min:number,max:number},v_scaleSpeed:{min:number,max:number},v_moveHeight:{min:number,max:number},v_moveSpeedZ:{min:number,max:number},v_moveSpeedX:{min:number,max:number},v_target:Node,v_isInitialization:boolean){
        console.log("Sphere move !!!");
        this.v_target = v_target;
        this.v_moveSpeedZ = randomRange(v_moveSpeedZ.min,v_moveSpeedZ.max);
        this.v_moveSpeedX = randomRange(v_moveSpeedX.min,v_moveSpeedX.max);
        this.v_scaleSpeed = randomRange(v_scaleSpeed.min,v_scaleSpeed.max);
        this.v_moveRadius = randomRange(v_moveRadius.min,v_moveRadius.max);
        this.v_moveHeight = randomRange(v_moveHeight.min,v_moveHeight.max);

        this.v_isInitialization = v_isInitialization;
        // this.node.worldPosition = Vec3.lerp(new Vec3,this.node.worldPosition,Vec3.add(new Vec3,this.node.worldPosition,new Vec3(0,0,2)),0.2);
        // this.schedule(():void=>{this.v_isInitialization = v_isInitialization;},2,0,2);
    }

    
    update (deltaTime: number) {
        if (this.v_target != null && this.v_isInitialization) {
            this.f_Move(deltaTime,this.v_target);
        }
    }

    f_Move(delteTime:number,target:Node){
        let newTarget:Vec3 = Vec3.add(new Vec3(),target.worldPosition,new Vec3(0,this.v_moveHeight,0));
        if (Vec3.distance(this.node.worldPosition,newTarget) > this.v_moveRadius) {
            this.node.worldPosition = Vec3.lerp(new Vec3,this.node.worldPosition,newTarget,this.v_moveSpeedZ * delteTime);
        }
    
        this.node.lookAt(newTarget);
        this.node.translate(new Vec3(this.v_moveSpeedX * delteTime,0,0));
        
        this.node.scale = Vec3.lerp(new Vec3(),this.node.scale,new Vec3(0,0,0),this.v_scaleSpeed * delteTime);
        if (this.node.scale.x <= 0.1) {
            this.node.setScale(new Vec3(1,1,1));

            // this.node.setPosition(target.position);
            // this.node.worldPosition = newTarget;
            
            this.node.worldPosition = (Vec3.add(new Vec3(),newTarget,new Vec3(randomRange(math.absMax(this.v_moveRadius,this.v_moveRadius) * - 5,math.absMax(this.v_moveRadius,this.v_moveRadius) *5),randomRange(math.absMax(this.v_moveHeight,this.v_moveHeight),math.absMax(this.v_moveHeight,this.v_moveHeight) * 4),randomRange(math.absMax(this.v_moveRadius,this.v_moveRadius) * -5,math.absMax(this.v_moveRadius,this.v_moveRadius) * 5))));

            // this.node.setPosition(Vec3.add(new Vec3(),newTarget,new Vec3(randomRange(this.v_moveRadius * -2,this.v_moveRadius * 2),randomRange(this.v_moveHeight * -2,this.v_moveHeight * 2),randomRange(this.v_moveRadius * -2,this.v_moveRadius * 2))));
            // this.v_scaleSpeed = randomRange(v_scaleSpeed.min,v_scaleSpeed.max);
        }
    }
}

//护盾移动
export class ShieldDebrisMove extends Component{
    
    v_isInitialization:boolean = false;

    f_Initialization(v_isInitialization:boolean){
        this.v_isInitialization = v_isInitialization;
        console.log("1");

    }
    update (deltaTime: number) {
        if (this.v_isInitialization && ShieldDebrisManager.v_instance.v_shieldDebris_Target != null) {
            this.f_Move(deltaTime,ShieldDebrisManager.v_instance.v_shieldDebris_Target);
        }
    }

    f_Move(delteTime:number,target:Node){
        console.log("2");
        if (Vec3.distance(this.node.worldPosition,target.worldPosition) > ShieldDebrisManager.v_instance.v_shieldDebris_Dis) {
            this.node.worldPosition = Vec3.lerp(new Vec3,this.node.worldPosition,target.worldPosition,ShieldDebrisManager.v_instance.v_shieldDebris_MoveSpeed1 * delteTime);
        }
        this.node.translate(new Vec3(ShieldDebrisManager.v_instance.v_shieldDebris_MoveSpeed2 * delteTime,0,0));
        this.node.lookAt(target.worldPosition);
    }
}