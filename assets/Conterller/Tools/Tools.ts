export namespace My_Tools01_Enum{/**
    * 根据游戏模式 --> Player 对象 + 地图生成/销毁模块（装快，道具，房屋）
    *                    |                         |
    *             摄像机 target     初始化-地面---房屋---游客---游戏中道具---玩家初始位置
    * 
    * 
    * 
    */
   /**控制游戏方向*/
    export const enum E_GameLevels{
        //
        nothing,
        //测试
        text,
        //快上车
        quickUpCar,
        //纸牌
        playingCards,
    }
    //
    /**控制正在运行中的游戏进度*/
    export const enum E_GameStatus {
        //
        nothing,
        //加载
        loading,
        //开始
        start,
        //暂停
        suspend,
        //继续
        continue,
        //结束：保存数据
        finish,
    }

    /*---------------------------------------------------------------*/

    /**控制对象状态*/
    export const enum E_ObjectStatus {
        //
        nothing,
        //正在移动
        moving,
        //停止
        stop,
        //正在放技能
        skilling,
    }

    export const enum E_Description{
        /**空*/
        nothing,
        /**--------------属性-----------------*/
        /**水*/
        water,
        /**火*/
        fire,
        /**光*/
        light,
        /**电*/
        electricity,
        /**土*/
        soil,
    }

    /**控制状态*/
    export const enum E_Buff{
        /**空*/
        nothing = 0,
        /**--------------效果-----------------*/
        //移动
        speedCut = 1 << 0,
        speedUp = 1 << 1,
        //血量
        bloodCut = 1 << 2,
        bloodUp = 1 << 3,
        //攻击力
        attackCut = 1 << 4,
        attackUp = 1 << 5,
        /**--------------综合-----------------*/
        /**中毒*/
        poisoning = speedCut + attackCut,
        /**烧伤*/
        burn = bloodCut + speedUp,
        /**冰冻*/
        freezing = speedCut,
        /**眩晕*/
        dizziness = speedCut,
        /**触电*/
        electricShock = speedUp + bloodCut + attackCut,
    }
}

export namespace My_Tools02_Delegates{
    /*--------------------------------委托方法----------------------------------------------------------------------- */
    /**添加委托*/
    export function f_AddDelegate(delegate:Array<Function>,value:Function){
        delegate.push(value);
    }
    /**删除委托（需要优化一下，如果重复添加相同的委托的话，还需要一些删除规则，注意!!!!!!!!!!!!!!!）*/
    export function f_RemoveDelegate(delegate:Array<Function>,value:Function){
        delegate.splice(delegate.indexOf(value),1);
    }
    /**执行委托*/
    export function f_Delegate_Response(dele:Array<Function>,date:{}):Array<any>{
        let arr:Array<any> = new Array<any>();
        for (let index = 0; index < dele.length; index++) {
            arr.push(dele[index](date));
        }
        return arr;
    }
/*--------------------------------委托声明----------------------------------------------------------------------- */
    export interface I_Delegate{
        
    }
    export interface I_Delegate_void_void extends I_Delegate{
        ({}):void;
    }
}