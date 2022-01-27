
import { _decorator, Component, Node ,Prefab,NodePool,instantiate, Vec3, Camera,geometry, PhysicsSystem, PhysicsRayResult, tween} from 'cc';
import { CameraManager } from './SingletonPattern（单例模式）/CameraManager';
import { CarManager } from './SingletonPattern（单例模式）/CarManager';
import { GameManager } from './SingletonPattern（单例模式）/GameManager';
import { PlayerManager } from './SingletonPattern（单例模式）/PlayerManager';
import { MouseControler } from './Tools/MouseControler';
const { ccclass, property } = _decorator;
const {Ray} = geometry;

/**
 * Predefined variables
 * Name = Text
 * DateTime = Sun Jan 09 2022 18:51:02 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = Text.ts
 * FileBasenameNoExtension = Text
 * URL = db://assets/Conterller/Text.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Test')
export class Test extends Component {
    //对象池应用--------------------------------------------------------------
    // @property({type:Prefab})
    // enemyPrefab: Prefab;
    // @property({type:Node})
    // parentNode:Node = new Node();
    // enemyPool = new NodePool();
    //--------------------------------------------------------------
    @property({type:Node})
    gb:Node;
    @property({type:Node})
    textNode1:Node;

    @property({type:Node})
    textNode2:Node;
    @property({type:Node})
    TextNode3:Node;
    @property({type:Node})
    textNode4:Node;
    @property({type:Prefab})
    target:Node;
    onLoad () {
        //对象池应用--------------------------------------------------------------
        // let initCount = 5;
        // for (let i = 0; i < initCount; ++i) {
        //     let enemy = instantiate(this.enemyPrefab); // 创建节点
        //     this.enemyPool.put(enemy); // 通过 put 接口放入对象池
        // }
        //--------------------------------------------------------------
    }

    f_CreateEnemy() {
        //对象池应用--------------------------------------------------------------
        // let enemy = null;
        // if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        //     enemy = this.enemyPool.get();
        // } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        //     enemy = instantiate(this.enemyPrefab);
        // }
        // enemy.parent = this.parentNode; // 将生成的敌人加入节点树
        // // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
        //--------------------------------------------------------------

        //子弹测试--------------------------------------------------------------
        // let temp:Node = instantiate(this.enemyPrefab);
        // console.log(temp.position);
        // temp.setParent(GameManager.f_GetInstance(GameManager).v_mainCamera);
        // temp.addComponent(BulletConnterller);
        // console.log(temp.position);
        //--------------------------------------------------------------

        //计时器测试--------------------------------------------------------------
        // this.schedule(this.F_A,2,1,0);//间隔，重复（0 是不重复），延迟，不要重复开启
        //--------------------------------------------------------------
        // FactoryPattern.v_instance.f_AddOneEnemy_Cyclone();
        //------------------------护盾测试--------------------------------------
        // FactoryPattern.v_instance.f_CreatShieldDebris();
        //--------------------------------------------------------------
        // this.f_A();
        // this.schedule(this.f_A(),4);
        //--------------------------------------------------------------
        CarManager.v_instance.f_ATK();
        //--------------------------------------------------------------

        //--------------------------------------------------------------

        //--------------------------------------------------------------

        //--------------------------------------------------------------
    }

    update(){
        // console.log(MouseControler.v_instance.v_moveSceenMoveX + " "+MouseControler.v_instance.v_moveSceenMoveY);
        // this.f_A(this.node,new Vec3(),1);
        // let ray:geometry.Ray = new Ray();
        // CameraManager.v_instance.v_mainCamera.getComponent(Camera).screenPointToRay(MouseControler.v_instance.v_moveSceenMoveX, MouseControler.v_instance.v_moveSceenMoveY, ray);
        // PhysicsSystem.instance.raycast(ray);
        // if (PhysicsSystem.instance.raycastResults.length != 0) {
        //     this.f_A(GameManager.v_instance.v_car,PhysicsSystem.instance.raycastResults[0].hitPoint,20);
        // }
    }
    start(){
        // this.schedule(this.f_A,4,4,4);
    }

    
}
