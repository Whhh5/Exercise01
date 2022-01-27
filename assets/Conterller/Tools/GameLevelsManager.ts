
import { _decorator, Component, Node } from 'cc';
import { CameraManager } from '../SingletonPattern（单例模式）/CameraManager';
import { PlayerManager } from '../SingletonPattern（单例模式）/PlayerManager';
const { ccclass, property } = _decorator;
@ccclass('GameLevelsManager')
export class GameLevelsManager extends Component {
    static v_instance:GameLevelsManager = null;
    onLoad(){
        GameLevelsManager.v_instance = this;
    }
    start(){
        //完成所有的初始化
        this.Initiailization();
    }
    /**加载游戏开始初始化 */
    Initiailization(){
        //初始化一些管理的 公共 对象
        PlayerManager.v_instance.f_Initialization();
        CameraManager.v_instance.f_Initialization();
    }
    /**每次切换游戏模式都要进行初始化的数据 */
    SetLevelsUpdateInitiailization(){
        /**
         * 初始化摄像机的目标
         * 场景的加载
         */
    }
    /**游戏结束时候的操作（数据 和 对象 的销毁） */
    GameFinish(){
        /**
         * 删除上一个关卡产生的对象
         * 
         */
    }
}
