
import { _decorator, Component, Node, find, Vec3 } from 'cc';
import { AxsicControler } from '../Tools/AxsicControler';
const { ccclass, property } = _decorator;
@ccclass('PlayerManager')
export class PlayerManager extends Component {
    static v_instance:PlayerManager;
    onLoad(){
        PlayerManager.v_instance = this;
    }
    @property({type:Node})
    v_player:Node;

    @property({range:[0,10],slide:true})
    v_moveSpeed:number = 0;
    @property({type:Node,})
    v_target:Node;

    f_Initialization(){
        this.v_player.addComponent(PlayerMove);
        let temp:PlayerMove = this.v_player.getComponent(PlayerMove);
        temp.f_Initialization(true);
    }
}

export class PlayerMove extends AxsicControler {
    v_isInitialization:boolean = false;
    f_Initialization(v_isInitialization:boolean){
        this.v_isInitialization = v_isInitialization;
    }
    update (deltaTime: number) {
        if (this.v_isInitialization) {
            this.f_Move(deltaTime,PlayerManager.v_instance.v_target,PlayerManager.v_instance.v_moveSpeed);
        }
    }
    f_Move(deltaTime: number,target:Node,moveSpeed:number){
        if (target != this.node) {
            this.node.worldPosition = Vec3.add(new Vec3(),target.getWorldPosition(new Vec3()),new Vec3(0,2,0));
        }
        else{
            this.node.translate(new Vec3(-moveSpeed * this.v_Horizontal * deltaTime,-moveSpeed * this.v_Height * deltaTime,-moveSpeed * this.v_Vertical * deltaTime));
        }
    }
}
