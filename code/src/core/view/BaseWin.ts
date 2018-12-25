class BaseWin extends BaseEuiView{
	public constructor() {
		super();

	}

	/**是否全面屏，是则进行适配 */
	private isFullScreen:boolean = false;

	public initUI(){
		super.initUI();

		this._updateUIAdapter();

	}

	/**
	 * UI 适配
	 * 适配各种长屏幕和刘海屏
	 * 适配待重新思考
	 */
	private _updateUIAdapter(){

		if (!ViewManager.ins().needUIAdapter){
			return ;
		}

		if (!this.isFullScreen){
			return ;
		}

		//通用约定skin皮肤中设置节点group：gp_main，方便适配
		let mainGp = this["gp_main"] as eui.Group;
		if (mainGp){
			mainGp.top += ViewManager.UI_ADAPTER_TOP;
			mainGp.bottom += ViewManager.UI_ADAPTER_BOTTOM;
		}else{
			console.error(`全面屏${this.skinName}未设置布局Group节点：gp_main`)
		}

	}

	public open(...param){
		super.open(param);

	}

	public close(...param){
		super.close();
		//TimeManager->removeAll
		this.removeEvents();
		this.removeObserve();

	}

	/**点击关闭当前面板 */
	public clickClose(){
		//TODO ViewManager->close

	}


}