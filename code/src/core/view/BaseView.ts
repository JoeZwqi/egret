/**
 * 通用面板显示基类，包含一些与显示相关的共有函数
 */
class BaseView extends eui.Component{

	public constructor() {
		super();
	}

	//当前面板的事件集
	private event = [];

	/**
	 * 通用事件添加函数
	 */
	public addEvent(ev:string, obj:any,func:Function, capture?:boolean, priority?:number){
		if (obj === void 0){
			console.error("can not add event to undefined target!")
			return ;
		}

		obj.addEventListener(ev,func,this, capture, priority);
		this.event.push([ev,func,obj]);
	}

	/**
	 * 添加点击事件的监听函数
	 */
	public addTouchEvent(obj:any, func:Function, capture?:boolean, priority?:number){
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj,func,capture, priority);
	}

	/**
	 * 添加点击后抬起事件的监听函数
	 */
	public addTouchEndEvent(obj:any, func:Function){
		this.addEvent(egret.TouchEvent.TOUCH_END, obj,func);
	}

	/**
	 * 添加状态改变的监听函数
	 */
	public addChangeEvent(obj:any, func:Function){
		this.addEvent(egret.TouchEvent.CHANGE, obj,func);
	}

	/**
	 * 删除点击事件监听函数
	 */
	public removeTouchEvent(obj:any, func:Function){
		if (obj === void 0){
			console.error("can not remove event from undefined target!")
			return ;
		}
		obj.removeEventListener(egret.TouchEvent.TOUCH_TAP,func,this);		
	}

	/**
	 * 删除此面板所有的事件
	 */
	public removeEvents(){
		while(this.event.length){
			let ev = this.event.pop();
			ev[2].removeEventListener(ev[0],ev[1],this);
		}
	}

	public observe(func: Function, myFunc:Function, callObj:any = undefined){
		//TODO observe
	}

	public removeObserve(){

	}

	public $close(){
		let doClose = function(target:egret.DisplayObjectContainer){

			for (let i = 0; i < target.numChildren; i ++){
				let obj = target.getChildAt(i);

				if (obj instanceof BaseView){
					if (obj instanceof BaseEuiView){
						(obj as BaseEuiView).destory();
					}
					(obj as BaseView).$close();
				}else if (obj instanceof egret.DisplayObjectContainer){
					doClose(obj);
				}else if (obj instanceof eui.List){
					// TODO WatcherUtil
				}else if (obj ){
					//TODO MovieClip
				}
			}
		}

		//关闭子View
		doClose(this);
		//TimerManager
		this.removeEvents();
		this.removeObserve();
	}

	public setSkinPart(partName:string, instance:any):void{
		super.setSkinPart(partName, instance);

		if (!instance || !this.skin || !this.skin[partName] || this.skin[partName] == instance){
			return ;
		}

		let p = this.skin[partName].parent;
		let pIndex = p.getChildIndex(this.skin[partName]);
		// removeFromParent(this.skin[partName]);
		for (let i = 0; i < BaseView.replaceKeys.length; i++){
			let key = BaseView.replaceKeys[i];
			if (this.skin[partName][key] != undefined){
				instance[key] = this.skin[partName][key];
			}
		}
		 this.skin[partName] = instance;
		 p.addChildAt(instance, pIndex);
	}

	public static replaceKeys :string[] = ["x","y","alpha", "anchorOffsetX", "anchorOffsetY", "blendMode", "bottom",
		"cacheAsBitmap", "currentState", "enable", "filters", "height", "horizontalCenter", "hostComponentKey",
		"includeInLayout","left", "mask", "matrix", "maxHeight", "maxWidth", "minHeight", "minWidth", "name",
		"percentHeight", "percentWidth", "right", "rotation", "scaleX", "scaleY", "scrollRect", "skewX", "skewY",
		"skinName", "top", "touchChildren", "touchEnable", "verticalCenter", "visible", "width", "icon"
	]


}