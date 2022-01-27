
import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc';
import { PlayerManager } from '../SingletonPattern（单例模式）/PlayerManager';
import { AxsicControler } from '../Tools/AxsicControler';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CarConterller
 * DateTime = Sun Jan 09 2022 14:56:49 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = CarConterller.ts
 * FileBasenameNoExtension = CarConterller
 * URL = db://assets/Conterller/Scripts（控制脚本）/CarConterller.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CarConterller')
export class CarConterller extends AxsicControler {
    @property({type:RigidBody})
    v_carRigidbody:RigidBody = null;
    @property
    v_moveSpeed:number = 0;
    @property
    v_rotationSpeed:number = 0;
    start(){
        this.v_carRigidbody = this.addComponent(RigidBody);
    }
    update(deltaTime:number){
        if (PlayerManager.v_instance.v_target == this.node)
        {
            this.v_carRigidbody.applyLocalForce(new Vec3(0,0,-this.v_moveSpeed * deltaTime * this.v_Vertical),new Vec3(0,0,0));
            this.v_carRigidbody.setAngularVelocity(new Vec3(0,this.v_rotationSpeed * deltaTime * this.v_Horizontal * 0.01,0));
        }
        
    }
}
