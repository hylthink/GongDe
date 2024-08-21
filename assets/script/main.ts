<<<<<<< HEAD
import { _decorator, AnimationComponent, Node, Label, Color, Vec3, tween, EventTouch, assetManager, ImageAsset, SpriteFrame, Texture2D, Input, input, Component, Prefab } from 'cc';
import { TonSDK } from './ton-sdk';
import { ObjectPool } from './object-pool'; 
=======
import { _decorator, AnimationComponent, Node, Label, Color, Vec3, tween, EventTouch, assetManager, ImageAsset, SpriteFrame, Texture2D, Input, input, Component } from 'cc';
import { TonSDK } from './ton-sdk';
import { ObjectPool } from './ObjectPool'; 
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Prefab)
    floatingTextPrefab: Prefab = null!;

    @property(AnimationComponent) 
    ani: AnimationComponent = null!;

    @property(Node) 
    menuNode: Node = null!;

    @property(Node) 
    shopNode: Node = null!;

    @property(Node) 
    infoNode: Node = null!;

    @property(Label) 
    nameLabel: Label = null!;

    @property(Label) 
    idLabel: Label = null!;

    @property(SpriteFrame) 
    iconSpriteFrame: SpriteFrame = null!;

    @property(Label) 
    jettonLabel: Label = null!;

    @property(Label) 
    demeritLabel: Label = null!; 
    
    @property(Node) 
    maincanvasNode: Node = null!;

    private _tonsdk: TonSDK = null!;
    private _clickCount: number = 0; 

    private _floatingTextPool: ObjectPool = null!;
<<<<<<< HEAD
    private _floatingTextPosition: Vec3 = new Vec3(0, 0, 0);
    private _floatingTextEndPosition: Vec3 = new Vec3(0, 200, 0);

    @property(Node) 
    private _prefab: Node = null!; // Assumes this is being used or intended for future use

=======
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
    iconSprite: any;

    start() {
        this.menuNode.active = false;
        this.shopNode.active = false;
        this.infoNode.active = false;
        //this.ani.play("idle");

        this._tonsdk = TonSDK.getInstance();
        this._tonsdk.init("https://muyu.bolinjoy.com/tonconnect-manifest.json").then(() => {
            this.menuNode.active = true;
            this._showUserInfo();
<<<<<<< HEAD

        });

        this._clickCount = 0;
        this._updateDemeritLabel();
        this._floatingTextPool = new ObjectPool(this.floatingTextPrefab);
=======
        });

        this._clickCount = 0;
        this.demeritLabel.string = `功德：${this._clickCount}`;
        
        // 对象池
        this._floatingTextPool = new ObjectPool(new Node());
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
    }

    protected onEnable(): void {
        input.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
    }

    protected onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
    }

    private _onTouchStart(event: EventTouch) {
        this.ani.play("hit");
<<<<<<< HEAD

        this.ani.once(AnimationComponent.EventType.FINISHED, () => {
            this.ani.play("idle");
        }, this);

        this._clickCount++;
        this._updateDemeritLabel();
=======
    
        this.ani.once(AnimationComponent.EventType.FINISHED, () => {
            this.ani.play("idle");
        }, this);
    
        this._clickCount++;
        this.demeritLabel.string = `功德：${this._clickCount}`;
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
        
        this._showFloatingText("功德+1");
    }
    
    private _showFloatingText(text: string) {
        const floatLabelNode = this._floatingTextPool.get();
        const floatLabel = floatLabelNode.getComponent(Label);
        floatLabel.string = text;
        floatLabel.color = this._getRainbowColor();
        
        floatLabelNode.parent = this.maincanvasNode; 
<<<<<<< HEAD
        floatLabelNode.position = this._floatingTextPosition;
        
        tween(floatLabelNode)
            .to(1, { position: this._floatingTextEndPosition })
            .call(() => {
                this._floatingTextPool.put(floatLabelNode);
=======
        floatLabelNode.position = new Vec3(0, 0, 0); 
        
        tween(floatLabelNode)
            .to(1, { position: new Vec3(0, 200, 0) }) 
            .call(() => {
                this._floatingTextPool.put(floatLabelNode); 
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
            })
            .start();
    }
    
    private _getRainbowColor(): Color {
        const colors = [
            new Color(255, 0, 0),    // Red
            new Color(255, 127, 0),  // Orange
            new Color(255, 255, 0),  // Yellow
            new Color(0, 255, 0),    // Green
            new Color(0, 0, 255),    // Blue
            new Color(75, 0, 130),   // Indigo
            new Color(148, 0, 211)   // Violet
        ];
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
<<<<<<< HEAD
    }

    private _updateDemeritLabel() {
        const labelText = `功德：${this._clickCount}`;
        this.demeritLabel.string = labelText;
    }

    update(deltaTime: number) {
=======
    }

    update(deltaTime: number) {

>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
    }

    public onBtnTonClick() {
        if (this._tonsdk.isConnected()) {
            this._tonsdk.disconnect();
            this.infoNode.active = false;
        } else {
            this._tonsdk.openModal();
        }
    }

    public onBtnShareClick() {
        let userId = '';
        const userData = this._tonsdk.getUserInfo();
        console.log("userData : ", userData);
        if (userData) {
            userId = userData.id + '';
        }
        this._tonsdk.share("https://t.me/GongDeBot/GongDe?startapp=ref_code_" + userId, "Invite you to play an interesting game");
    }

    public async onBtnShopClick() {
        this.shopNode.active = true;
<<<<<<< HEAD
        console.log("await this._tonsdk.showJetton");
=======
        console.log("await this._tonsdk.showJetton")
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
        const jettonContent = await this._tonsdk.showJetton();
        console.log(jettonContent);
        this.jettonLabel.string = "jetton: " + jettonContent.name;
    }

    public onBtnShopCloseClick() {
        this.shopNode.active = false;
    }

    public onBtnBuyTonClick() {
        this._tonsdk.buyTon(0.01);
    }

    public onBtnBuyStarClick() {
        this._tonsdk.buyStar(0.01);
    }

    private _showUserInfo() {
        this.infoNode.active = true;
        this.idLabel.string = "";
        this.nameLabel.string = "";
        this.iconSprite.spriteFrame = this.iconSpriteFrame;

        this.idLabel.string = this._tonsdk.getAccount();
        let userData = this._tonsdk.getUserInfo();
        console.log("userData : ", userData);
        if (userData) {
            this.infoNode.active = true;
            if (userData.username) {
                this.nameLabel.string = userData.username;
            } else {
                this.nameLabel.string = userData.first_name + ' ' + (userData.last_name || '');
            }

            if (userData.photo_url) {
                const fileExtension = userData.photo_url.split('.').pop().toLowerCase();
                if (fileExtension == 'jpeg' || fileExtension == 'jpg' || fileExtension == 'png') {
                    assetManager.loadRemote<ImageAsset>(userData.photo_url, (err, imageAsset) => {
                        if (err) {
                            console.error('Failed to load image:', err);
                            return;
                        }
                        const spriteFrame = new SpriteFrame();
                        const texture = new Texture2D();
                        texture.image = imageAsset;
                        spriteFrame.texture = texture;
                        this.iconSprite.spriteFrame = spriteFrame;
                    });
                }
            }
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> c0a3ece599baf170fe27888693ec3e5d6ff9bb5c
