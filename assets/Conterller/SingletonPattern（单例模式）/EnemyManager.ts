
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('EnemyManager')
export class EnemyManager extends Component {
    static v_instance:EnemyManager;
    onLoad(){
        EnemyManager.v_instance = this;
    }
    //生成enemy旋风
    @property({type:Prefab})
    v_cyclone:Prefab;
    @property({type:Prefab})
    v_cycloneSphere:Prefab;
    @property({type:Node})
    v_cycloneParent:Node;
    @property({type:Node})
    v_cycloneAttackTarget:Node;
    @property
    v_cycloneMoveSpeed = 5;
    @property
    v_sphereNumber = 0;

    @property({type:Prefab,tooltip:"蝙蝠怪"})
    v_bat:Prefab;
    @property({type:Prefab,tooltip:"铁链怪"})
    v_ironChain:Node
}


