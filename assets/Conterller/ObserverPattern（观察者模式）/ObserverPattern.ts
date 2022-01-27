
import { _decorator, Component, Node } from 'cc';
import { My_Tools01_Enum, My_Tools02_Delegates } from '../Tools/Tools';
const { ccclass, property } = _decorator;
const { E_Buff} = My_Tools01_Enum;
const { f_RemoveDelegate, f_AddDelegate, f_Delegate_Response} = My_Tools02_Delegates;
 
@ccclass('ObserverPattern')
export class ObserverPattern extends Component {
    static v_instance:ObserverPattern;
    onLoad(){
        ObserverPattern.v_instance = this;
    }
    //委托
    private delegate_GameLevel:Array<My_Tools02_Delegates.I_Delegate_void_void> = new Array<My_Tools02_Delegates.I_Delegate_void_void>();
    
    f_Initialization(){
        //订阅委托
        /*-----------------快上车------------------*/
        

    }

    unInitialization(){
        //取消订阅
    }
    /*
    当玩家切换游戏模式的时候
    0.记录玩家通关后的数据信息
    1.改变摄像机跟随目标
    2.地图关卡初始化
    3.销毁不必要的地图信息（上一次体验后的地图生成）
    */

    f_SetGameLevels(){

    }

    start(){

    }

    Add(){

    }
}



