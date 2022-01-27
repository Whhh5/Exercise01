
import { _decorator, Component, Node, find, Vec3, Input, input, Quat, EventMouse, serializeTag, PhysicsRayResult, PhysicsSystem, Camera,geometry, math, instantiate, Tween, tween } from 'cc';
import { MouseControler } from '../Tools/MouseControler';
import { GameManager } from './GameManager';
import { PlayerManager } from './PlayerManager';
const { ccclass, property } = _decorator;
const {Ray} = geometry;
 
@ccclass('CameraManager')
export class CameraManager extends Component {
    static v_instance:CameraManager;
    onLoad(){
        CameraManager.v_instance = this;
    }

    @property({type:Node,displayName:"主摄像机",visible:true,tooltip:"主摄像机",serializable:true})
    v_mainCamera:Node;
    @property({type:Node,displayName:"目标",visible:true,tooltip:"跟随的玩家目标目标",serializable:true})
    v_target:Node;
    @property({type:Node,displayName:"天空目标",visible:true,tooltip:"天空目标",serializable:true})
    v_skyTarget:Node;
    /**速度 */
    
    @property({range:[0,20],slide:true,displayName:"",tooltip:"左右移动速度",serializable:true})
    v_moveSpeed:number = 0;
    @property({range:[0,20],slide:true,displayName:"",tooltip:"跟随目标的旋转速度",serializable:true})
    v_rotationSpeed:number = 0;
    
    f_Initialization(){
        this.v_mainCamera.addComponent(CameraMove);
        let temp:CameraMove = this.v_mainCamera.getComponent(CameraMove);
        temp.f_Initialization(true);
    }

    f_Shake(shakeX:{Xmin:number,Xmax:number},shakeY:{Ymin:number,Ymax:number},shakeZ:{Zmin:number,Zmax:number}){
        this.v_mainCamera.translate(new Vec3(math.randomRange(shakeX.Xmin,shakeX.Xmax),math.randomRange(shakeY.Ymin,shakeY.Ymax),math.randomRange(shakeZ.Zmin,shakeZ.Zmax)));
    }
}

export class CameraMove extends Component {
    isInitialization:boolean = false;

    onLoad(){
        input.on(Input.EventType.MOUSE_MOVE,this._MouseMove,this.node);
        
    }

    f_Initialization(isInitialization:boolean){
        this.isInitialization = isInitialization;
    }

    _MouseMove(event:EventMouse){
        if (CameraManager.v_instance.v_target == PlayerManager.v_instance.v_player) {
            // GameManager.v_instance.v_player.rotate(new Quat( -event.movementY * 0.001, - event.movementX * 0.001,0));
            // GameManager.v_instance.v_player.worldRotation = new Quat(0, - event.movementX * 0.001,0);
            PlayerManager.v_instance.v_player.rotate(new Quat(0,-event.movementX * 0.001,0));
            // GameManager.v_instance.v_player.rotation = quat(GameManager.v_instance.v_player.rotation.x,GameManager.v_instance.v_player.rotation.y,0);
            // console.log(GameManager.v_instance.v_player.getRotation(new Quat()));

        }
    }
    update(deltaTime: number){
        if (this.f_Condition() && this.isInitialization) {
            this.node.worldPosition = Vec3.lerp(new Vec3,this.node.worldPosition,Vec3.add(new Vec3(),CameraManager.v_instance.v_target.worldPosition,new Vec3(0,0,0)),CameraManager.v_instance.v_moveSpeed * deltaTime);
            this.node.worldRotation = Quat.lerp(new Quat,this.node.getWorldRotation(new Quat()),CameraManager.v_instance.v_target.getWorldRotation(new Quat()),CameraManager.v_instance.v_rotationSpeed * deltaTime);
        }

        // let ray:geometry.Ray = new Ray();
        // this.node.getComponent(Camera).screenPointToRay(MouseControler.v_instance.v_moveSceenMoveX, MouseControler.v_instance.v_moveSceenMoveY, ray);
        // PhysicsSystem.instance.raycast(ray);
        // for(let i=0;i < PhysicsSystem.instance.raycastResults.length;i++)
        // {
        //     // console.log(PhysicsSystem.instance.raycastResults[i].collider.name);
        // }

        // if (PhysicsSystem.instance.raycastResults.length != 0) {
        //     this.f_A(GameManager.v_instance.v_car,PhysicsSystem.instance.raycastResults[0].hitPoint,20);
        // }

    }
    f_Condition():boolean{
        let temp = CameraManager.v_instance.v_target != this.node;
        return temp;
    } 
    
}