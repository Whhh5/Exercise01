
import { _decorator, Component, Node, find, Layers, Vec3, Prefab } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('GameManager')
export class GameManager extends Component {
    static v_instance:GameManager;

    // @property({type:Node})
    // v_mainCamera:Node = find("Main Camera");
    // @property({type:Node})
    // v_player:Node = find("Player");
    @property({type:Node})
    v_car:Node = null;

    @property({type:Node})
    v_gameObjectParsent:Node = null;

    @property({type:Prefab})
    v_public_Cube:Prefab;
    @property({type:Node})
    v_public_Cube_Node:Node;


    v_pubilc_Vec3:Vec3 = null;
    onLoad(){
        GameManager.v_instance = this;
    }
}
