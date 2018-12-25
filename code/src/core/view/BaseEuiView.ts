class BaseEuiView extends BaseView implements IBaseView{

	/**
	 * 是tips的弹出界面
	 */
	public IS_CONFIRM:boolean = false;
	/**是否需要销毁 */
	protected isDestory:boolean = true;

	protected _isInit:boolean = false;
	/**动态加载的皮肤名 */
	protected dynSkinName:string;
	private _resources: string[] = null;

	/**是否一级窗口，一级窗口会把播放主界面遮挡 */
	public isTopLevel:boolean = false;
	/**互斥窗口，类名或者类字符串的数组，打开某些窗口会关闭互斥的窗口 */
	public exclusionWins:string[] = [];
	/**点击窗口外，是否监听 */
	public clickOutListen:boolean = true;


	public constructor() {
		super();

		this.percentWidth = 100;
		this.percentHeight = 100;

	}

	/**
	 * 添加互斥窗口
	 *
	 */
	public addExclusionWin(classOrName:string) :void {
		if (this.exclusionWins.indexOf(classOrName) == -1){
			this.exclusionWins.push(classOrName);
		}
	}

	/**
	 * 是否已经初始化
	 */
	public isInit():boolean{
		return this._isInit;
	}

	/**
	 * 面板是否显示
	 */
	public isShow():boolean{
		return this.stage != null && this.visible;
	};

	/**
	 * 添加到某个父类
	 */
	public addToParent(p:egret.DisplayObjectContainer):void{
		p.addChild(this);
	};

	/**
	 * 对面板进行初始化，用于子类继承重写
	 */
	public initUI():void{
		if (this.dynSkinName){
			this.skinName = this.dynSkinName;
		}
		this._isInit = true;
	};

	/**
	 * 对面板进行数据的初始化，用于子类继承重写
	 */
	public initData():void{

	};

	/**
	 * 打开自己
	 */
	public static openOne(...param:any[]){
		//TODO
		return ;
	}

	/**
	 * 面板开启执行函数，用于子类继承
	 */
	public open(...param:any[]):void{

	};

	/**
	 * 面板关闭执行函数，用于子类继承
	 */
	public close(...param:any[]):void{

	};

	/**
	 * 面板销毁，释放一些资源
	 */
	public destory():void{
		//TODO destory
	};

	public destoryView():void{
		//TODO TiemerManage->RemoveAll()
		if (this.isDestory){
			//TODO 见ViewManager->destory();
		}
	}

	public removeFromParent(){
		//TODO 
		//removeFromParent(this);
		this.destoryView();
	}

	/**
	 * 面板设置是否可见或隐藏
	 */
	public setVisiable(value:boolean):void{
		this.visible = value;
	};

	/**
	 * 加载面板需要的资源
	 * 在需要打开一个面板时，先加载所需资源再进行创建或初始化(见ViewManager->doOpenView())
	 */
	public loadResource(loadComplete:Function, initComplete:Function){
		if (this._resources && this._resources.length > 0){
			//资源加载
			ResourceUtils.ins().loadResource(this._resources,[], this, loadComplete)
			//面板创建完成
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE, initComplete,this);
		}else{
			loadComplete();
			initComplete();
		}
	}

}