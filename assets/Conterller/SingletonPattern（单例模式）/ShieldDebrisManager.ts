
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ShieldDebrisManager
 * DateTime = Tue Jan 11 2022 07:14:22 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = ShieldDebrisManager.ts
 * FileBasenameNoExtension = ShieldDebrisManager
 * URL = db://assets/Conterller/SingletonPattern（单例模式）/ShieldDebrisManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('ShieldDebrisManager')
export class ShieldDebrisManager extends Component {
    static v_instance:ShieldDebrisManager;

    //生成护盾
    @property
    v_shieldDebris_Target:Node = new Node();
    @property({type:Prefab})
    v_shieldDebris:Prefab;
    @property
    v_shieldDebris_MoveSpeed1:number = 1;
    @property
    v_shieldDebris_MoveSpeed2:number = 50;
    @property
    v_shieldDebris_Dis:number = 10;
    onLoad(){
        ShieldDebrisManager.v_instance = this;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
