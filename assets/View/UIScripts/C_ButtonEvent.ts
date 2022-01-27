
import { _decorator, Component, Node, RigidBody,instantiate, Vec3, KeyCode, macro, Input, input ,EventKeyboard, SystemEvent, Event, Material, Sprite, color, lerp ,EventMouse, UIOpacityComponent, math, Prefab, Game, NodePool, Camera} from 'cc';
import { FactoryPattern } from '../../Conterller/FactoryParttern（工厂模式）/FactoryPattern';
import { CameraManager } from '../../Conterller/SingletonPattern（单例模式）/CameraManager';
import { GameManager } from '../../Conterller/SingletonPattern（单例模式）/GameManager';
import { PlayerManager } from '../../Conterller/SingletonPattern（单例模式）/PlayerManager';
import { ShieldDebrisManager } from '../../Conterller/SingletonPattern（单例模式）/ShieldDebrisManager';
import { MouseControler } from '../../Conterller/Tools/MouseControler';
import { My_Tools02_Delegates } from '../../Conterller/Tools/Tools';

const { ccclass, property } = _decorator;

@ccclass('C_ButtonEvent')
export class C_ButtonEvent extends Component {
        /*--------------------------------------初始化相关--------------------------------------- */
    onLoad(){
        this.f_ThisGameObjectVarInitialization();
    }
    start(){
        this.f_QuoteVarInitializatoin();
    }
    //切换关卡时需要重新初始化初始化的参数
    private f_CutLevelInitialization(){

    }

    //切换关卡时不需要初始化的参数
    private f_CutLevelDontInitialization(){

    }

    //自身的组件参数初始化
    private f_ThisGameObjectVarInitialization(){
        //1.
        this.v_mirrorSprite = this.v_mirrorGameObject.getComponent(UIOpacityComponent);
    }

    //引用其他物体的参数初始化
    private f_QuoteVarInitializatoin(){
        
    }

    //需要存储记录的参数
    private f_StorageLocalDate(){

    }
    /*--------------------------------------1.瞄准镜逻辑相关--------------------------------------- */
    @property({type:Node})
    v_mirrorGameObject:Node;

    v_isOpenMirror:boolean = false;
    @property({type:Vec3})
    v_startingPiont:Vec3 = new Vec3();//起始位置

    @property({type:Vec3})
    v_targetPoint:Vec3 = new Vec3(0,0,0);//目标点
    @property
    v_mirrorMoveSpeed:number = 0;
    @property
    v_mirrorShowAndCancealSpeed:number = 0;
    //本物体的脚本
    v_mirrorSprite:UIOpacityComponent = null;

    f_SetMirrorStating(){
        this.v_isOpenMirror = !this.v_isOpenMirror;
        console.log(this.v_isOpenMirror);
    }
    //移动
    private f_Move(v_direction:boolean,deltaTime: number){
        //正反方向
        if (v_direction) {
            this.v_mirrorGameObject.position = Vec3.lerp(new Vec3,this.v_mirrorGameObject.position,this.v_targetPoint,this.v_mirrorMoveSpeed * deltaTime);

        }else{
            this.v_mirrorGameObject.position = Vec3.lerp(new Vec3,this.v_mirrorGameObject.position,this.v_startingPiont,this.v_mirrorMoveSpeed * deltaTime);
        }
    }

    //修改透明度
    private f_SetSprite(v_direction:boolean,deltaTime: number){
        if (v_direction) {
            this.v_mirrorSprite.opacity = math.lerp(this.v_mirrorSprite.opacity,255,this.v_mirrorShowAndCancealSpeed * deltaTime);
        }else{
            this.v_mirrorSprite.opacity = math.lerp(this.v_mirrorSprite.opacity,0,this.v_mirrorShowAndCancealSpeed * deltaTime);
        }
    }

    private f_SetCameraFov(v_direction:boolean,deltaTime: number){
        if (v_direction) {
            CameraManager.v_instance.v_mainCamera.getComponent(Camera).fov = math.lerp(CameraManager.v_instance.v_mainCamera.getComponent(Camera).fov,20,this.v_mirrorMoveSpeed * deltaTime);
        }else{
            CameraManager.v_instance.v_mainCamera.getComponent(Camera).fov = math.lerp(CameraManager.v_instance.v_mainCamera.getComponent(Camera).fov,45,this.v_mirrorMoveSpeed * deltaTime);
        }
    }

    update(deltaTime: number){
        //1.使用按钮开启
        // this.f_Move(this.v_isOpenMirror,deltaTime);
        // this.f_SetSprite(this.v_isOpenMirror,deltaTime);
        // this.f_SetCameraFov(this.v_isOpenMirror,deltaTime);

        // //2.使用鼠标开启
        this.f_Move(MouseControler.v_instance.v_isOnMouseRightButotn,deltaTime);
            this.f_SetSprite(MouseControler.v_instance.v_isOnMouseRightButotn,deltaTime);
            this.f_SetCameraFov(MouseControler.v_instance.v_isOnMouseRightButotn,deltaTime);
        // if (MouseControler.v_instance.v_isOnMouseRightButotn && MouseControler.v_instance.v_isOnMouseLeftButotn) {
        //     this.f_ShootingMirrorMove();
        // }
    }

    /*--------------------------------------2.射击生成子弹逻辑相关shooting--------------------------------------- */
    @property({type:Prefab})
    buille:Prefab;


    f_ShootingMirrorMove(){
        //先生成子弹
        this.f_NewBullet()
        //抖动
        this.v_mirrorGameObject.translate(new Vec3(math.randomRange(-0.1,0.1),math.randomRange(0,0.1),0));
        CameraManager.v_instance.f_Shake({Xmin:-0.1,Xmax:0.1},{Ymin:-0.1,Ymax:0.1},{Zmin:0,Zmax:0});
    }

    f_NewBullet(){
        let temp:Node = instantiate(this.buille);
        temp.setParent(CameraManager.v_instance.v_mainCamera);
    }
    /*--------------------------------------3.切换护盾相关--------------------------------------- */
    f_PresentShield(){
        if (ShieldDebrisManager.v_instance.v_shieldDebris_Target == PlayerManager.v_instance.v_player) {
            ShieldDebrisManager.v_instance.v_shieldDebris_Target = PlayerManager.v_instance.v_target;
        }
        else{
            ShieldDebrisManager.v_instance.v_shieldDebris_Target = PlayerManager.v_instance.v_player;
        }
        
    }
    /*--------------------------------------4.切换player跟随目标相关--------------------------------------- */
    f_SetPlayerTargetIsCar(){
        if (PlayerManager.v_instance.v_target == GameManager.v_instance.v_car) {
            PlayerManager.v_instance.v_target = PlayerManager.v_instance.v_player;
        }
        else{
            PlayerManager.v_instance.v_target = GameManager.v_instance.v_car;
        }
        console.log(PlayerManager.v_instance.v_target.name);
    }
    f_SetPlayerTargetIsPlayer(){
        PlayerManager.v_instance.v_target = PlayerManager.v_instance.v_player;
        console.log(PlayerManager.v_instance.v_target.name);
    }
    /*--------------------------------------5.切换摄像机状态相关--------------------------------------- */
    f_SetCameraStating(){
        // switch (ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating) {
        //     case E_CameraStatus.targetPlayer:
        //         CameraManager.f_GetInstance(CameraManager).v_target = CameraManager.f_GetInstance(CameraManager).v_skyTarget;
        //         // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.targetThis;
        //         break;
        //     case E_CameraStatus.targetThis:
        //         CameraManager.f_GetInstance(CameraManager).v_target = GameManager.f_GetInstance(GameManager).v_mainCamera;
        //         // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.stop;
        //         break;
        //     case E_CameraStatus.stop:
        //         CameraManager.f_GetInstance(CameraManager).v_target = GameManager.f_GetInstance(GameManager).v_player;
        //         // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.targetPlayer;
        //         break;
        //     default:
        //         break;
        // }

        switch (CameraManager.v_instance.v_target) {
            case PlayerManager.v_instance.v_player:
                CameraManager.v_instance.v_target = CameraManager.v_instance.v_skyTarget;
                // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.targetThis;
                break;
            case CameraManager.v_instance.v_skyTarget:
                CameraManager.v_instance.v_target = CameraManager.v_instance.v_mainCamera;
                // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.stop;
                break;
            case CameraManager.v_instance.v_mainCamera:
                CameraManager.v_instance.v_target = PlayerManager.v_instance.v_player;
                // ObserverPattern.f_GetInstance(ObserverPattern).v_cameraStating = E_CameraStatus.targetPlayer;
                break;
            default:
                break;
        }
    }

    f_CreateEnemy_Cyclone(){
        FactoryPattern.v_instance.f_AddOneEnemy_Cyclone();
    }
    f_CreatShieldDebris(){
        FactoryPattern.v_instance.f_CreatShieldDebris();
    }
}
