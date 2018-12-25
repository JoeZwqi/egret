class ViewManager extends BaseClass{
	public constructor() {
		super();
	}

	/**是否需要适配长屏或者刘海 */
	public needUIAdapter:boolean = false;
	/**顶部适配 */
	public static UI_ADAPTER_TOP :number = 88;
	/**底部适配 */
	public static UI_ADAPTER_BOTTOM:number = 63;

	/**已注册的ui信息 */
	private _regesterInfo:any;
	/**UI实体 */
	private _views:{[key:string]:BaseEuiView};

	private _hCode2Key:{[hashCode:number]:string};
	/**开启中的ui */
	private _opens:string[];

	/**点击遮罩可以关闭的ui界面 */
	private _shapeView:BaseEuiView[];
	/**点击遮罩可以关闭的Pop界面 */
	private _pooView:BaseEuiView[];

}