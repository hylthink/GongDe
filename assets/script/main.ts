import { _decorator, Animation, AnimationClip, AnimationComponent, AnimationState, Component, Input, input, Node } from 'cc';
import { TGameSDK } from './lib/tgame';
// import { TGameSDK } from './lib/tgame';
const { ccclass, property } = _decorator;
@ccclass('Main')
export class Main extends Component {
    @property(AnimationComponent) 
    ani: AnimationComponent = null!;

    start() {
        this.ani.play("idle");
        let tgame =  new TGameSDK();
        tgame.init();
        
    }

    protected onEnable(): void {
        input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
    }

    protected onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);

    }

    private _onTouchStart() {
        this.ani.play("hit");
        this.ani.once(Animation.EventType.FINISHED, () => {
            this.ani.play("idle");
        })
    }

    update(deltaTime: number) {
        
    }
}

