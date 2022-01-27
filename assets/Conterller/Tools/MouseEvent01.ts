
import { _decorator, Component, Node ,Input,input} from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('MouseEvent01')
export class MouseEvent01 extends Component {
    onLoad(){
        input.on(Input.EventType.MOUSE_DOWN,(event)=>void{

        },this.node);
        input.on(Input.EventType.MOUSE_UP,(event)=>void{

        },this.node);
    }
}
