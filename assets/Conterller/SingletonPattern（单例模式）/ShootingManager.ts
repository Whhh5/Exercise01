
import { _decorator, Component, Node, RigidBody,instantiate, Vec3, KeyCode, macro, Input, input ,EventKeyboard, SystemEvent, Event, Material, Sprite, color, lerp ,EventMouse, UIOpacityComponent, math, Prefab, Game, NodePool, Camera, Collider, ICollisionEvent, debug, Line, DebugMode, game, tween, Tween} from 'cc';
import { CameraManager } from '../../Conterller/SingletonPattern（单例模式）/CameraManager';
import { GameManager } from '../../Conterller/SingletonPattern（单例模式）/GameManager';
import { MouseControler } from '../../Conterller/Tools/MouseControler';

const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = BulletConnterller
 * DateTime = Sun Jan 09 2022 12:06:17 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = BulletConnterller.ts
 * FileBasenameNoExtension = BulletConnterller
 * URL = db://assets/Conterller/Scripts（控制脚本）/BulletConnterller.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
 @ccclass('ShootingManager')
 export class ShootingManager extends Component{
     static v_instance:ShootingManager;
     onLoad(){
         ShootingManager.v_instance = this;
 
         input.on(Input.EventType.MOUSE_DOWN,this.f_StartTween,this.node);
         input.on(Input.EventType.MOUSE_UP,this.f_StopTween1,this.node);
 
         this.f_Initialization();
     }
     start(){
        // this.tempTween1.start();
     }
 
     tempTween1:Tween<Vec3>;
     /**初始化枪支 */
     f_Initialization(){
         this.v_rob.addComponent(RotContorller);
         let tempTs:RotContorller = this.v_rob.getComponent(RotContorller);
         tempTs.f_Initialization(true);
         this.tempTween1 = tween(this.node.position)
            .to(0.3,new Vec3(0,0,0),{"onComplete":():void=>{this.f_ShootingMirrorMove()}})
            .union()
            .repeatForever()
            
     }
 
     @property({type:Node})
     v_rob:Node;
     @property({type:Prefab})
     buille:Prefab;
     @property({type:Node})
     v_startPosition:Node;
     @property
     v_speed:number= -100;
     @property({type:Node})
     v_target:Node;


     f_StartTween(event:EventMouse){
         if (event.getButton() == 0) {
            ShootingManager.v_instance.tempTween1.start();
         }
     }
     f_StopTween1(event:EventMouse){
        if (event.getButton() == 0) {
            ShootingManager.v_instance.tempTween1.stop();
        }
    }
 
     f_ShootingMirrorMove(){
         //先生成子弹
             let temp:Node = instantiate(ShootingManager.v_instance.buille);
             temp.setParent(GameManager.v_instance.v_gameObjectParsent);
             temp.setWorldPosition(ShootingManager.v_instance.v_startPosition.worldPosition);
             temp.setWorldRotation(ShootingManager.v_instance.v_startPosition.worldRotation);
             temp.addComponent(BulletConnterller);
             let tempTS:BulletConnterller = temp.getComponent(BulletConnterller);
             tempTS.f_Initialization(3,this.v_speed);
             CameraManager.v_instance.f_Shake({Xmin:-0.3,Xmax:0.3},{Ymin:-0.3,Ymax:0.3},{Zmin:0,Zmax:0.2});
         
     }
 }
 
 /**枪支控制器 */
 export class RotContorller extends Component{
     v_rotSpeed:number = 0;
     v_isInitialization:boolean = false;
     f_Initialization(isInitialization:boolean){
         this.v_isInitialization = isInitialization;
     }
     update(del:number){
        this.f_Move()
     }
     f_Move(){
         if (MouseControler.v_instance.hit.length != 0) {
             this.node.lookAt(MouseControler.v_instance.hit[0].hitPoint);
         }
     }
 }
 
 export class BulletConnterller extends Component {
     rb:RigidBody;
     @property
     desTime:number = 2;
     v_speed:number = -100;
 
     f_Initialization(desTime:number,speed:number){
         this.addComponent(RigidBody);
         this.rb = this.getComponent(RigidBody);
         this.rb.useCCD = true
         this.rb.mass = 0.1;
         this.rb.applyLocalImpulse(new Vec3(0,0,-10),this.node.position);
         this.f_Move(speed,desTime);
     }
     f_Move(speed:number,desTime:number){
         let colli = this.getComponent(Collider);
         colli.on("onCollisionEnter",(event:ICollisionEvent):void=>{
             this.rb.linearFactor = (new Vec3(0,0,0));
             this.rb.angularFactor = (new Vec3(0,0,0));
             this.rb.sleep();
             colli.off("onCollisionEnter");
         },this.node);
        console
         this.schedule(():void=>{
             this.destroy();
         },0,0,desTime);
     }
 }