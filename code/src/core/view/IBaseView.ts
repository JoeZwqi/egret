interface IBaseView {
	/**
	 * 是否已经初始化
	 */
	isInit():boolean;

	/**
	 * 面板是否显示
	 */
	isShow():boolean;

	/**
	 * 添加到某个父类
	 */
	addToParent(p:egret.DisplayObjectContainer):void;

	/**
	 * 对面板进行初始化，用于子类继承重写
	 */
	initUI():void;

	/**
	 * 对面板进行数据的初始化，用于子类继承重写
	 */
	initData():void;

	/**
	 * 面板开启执行函数，用于子类继承
	 */
	open(...param:any[]):void;

	/**
	 * 面板关闭执行函数，用于子类继承
	 */
	close(...param:any[]):void;

	/**
	 * 面板销毁，释放一些资源
	 */
	destory():void;

	/**
	 * 面板设置是否可见或隐藏
	 */
	setVisiable(value:boolean):void;
}