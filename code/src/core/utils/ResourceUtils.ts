class ResourceUtils extends BaseClass{

	private _configs:Array<any>;
	private _onConfigComplete:Function;
	private _onConfigCompleteTarget:any;

	/**需要加载的多个资源组 */
	private _groups:any; 
	/**第几个资源组，用于group命名（“loadGroup+index”），和获取的key */
	private _groupIndex:number = 0;

	private _urlResource:any;

	public constructor() {
		super();

		this._configs = new Array<any>();
		this._groups = {};
		this._urlResource = {};

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResLoadComplete,this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResLoadProgress,this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResLoadError,this);
	}

	/**加载完一组资源*/
	private onResLoadComplete(event:RES.ResourceEvent){
		let groupName: string = event.groupName;

		if (this._groups[groupName]){
			//通知回调
			let loadComplete: Function = this._groups[groupName][0];
			let loadCompleteTarget:any = this._groups[groupName][1];
			if (loadComplete != null){
				loadComplete.call(loadCompleteTarget);
			}

			//删除相应信息
			this._groups[groupName] = null;
			delete this._groups[groupName];
		}

	}

	/**资源组加载进度 */
	private onResLoadProgress(event:RES.ResourceEvent){
		let groupName: string = event.groupName;
		if (this._groups[groupName]){
			let loadProgress:Function = this._groups[groupName][0];
			let loadProgressTarget:any = this._groups[groupName][1];
			if (loadProgress != null){
				loadProgress.call(loadProgressTarget, event.itemsLoaded, event.itemsTotal);
			}
		}
	}

	/**资源组加载出错 */
	private onResLoadError(event: RES.ResourceEvent){
		//TODO Debug->log
		this.onResLoadComplete(event);
	}


	//======================================功能===========================================================

	/**
	 * 混合加载资源组,包括图片，resource.json等
	 * @param $resource 资源数组
	 * @param $groups 资源组
	 * @param $onResourceLoadComplete 资源组加载完成后的回调
	 * @param $onResourceLoadProgress 资源组加载进度的回调
	 * @param $onResourceLoadTarget 资源组加载的回调目标
	 */
	public loadResource($resource = [], $groups = [], $onResourceLoadTarget:any = null, $onResourceLoadComplete:Function = null, $onResourceLoadProgress:Function = null){
		let needLoadArr = $resource.concat($groups);
		let groupName = "loadGroup"+this._groupIndex++;
		RES.createGroup(groupName, needLoadArr, true);
		this._groups[groupName] = [$onResourceLoadComplete,$onResourceLoadProgress,$onResourceLoadTarget];
		RES.loadGroup(groupName);
	}

	/**
	 * 加载资源组
	 * @param $groupName 资源组名
	 * @param $onResourceLoadComplete 资源组加载完成后的回调
	 * @param $onResourceLoadProgress 资源组加载进度的回调
	 * @param $onResourceLoadTarget 资源组加载的回调目标
	 */
	public loadGroup($groupName:string,  $onResourceLoadTarget:any = null, $onResourceLoadComplete:Function = null, $onResourceLoadProgress:Function = null){
		this._groups[$groupName] = [$onResourceLoadComplete,$onResourceLoadProgress,$onResourceLoadTarget];
		RES.loadGroup($groupName);
	}

	/**
	 * 加载多个资源组
	 * @param $groupName 资源组名
	 * @param $groupName 资源组数组
	 * @param $onResourceLoadComplete 资源组加载完成后的回调
	 * @param $onResourceLoadProgress 资源组加载进度的回调
	 * @param $onResourceLoadTarget 资源组加载的回调目标
	 */
	public loadGroups($groupName:string, $subGroups:Array<any>,  $onResourceLoadTarget:any = null, $onResourceLoadComplete:Function = null, $onResourceLoadProgress:Function = null){
		RES.createGroup($groupName, $subGroups);
		this._groups[$groupName] = [$onResourceLoadComplete,$onResourceLoadProgress,$onResourceLoadTarget];
		RES.loadGroup($groupName);
	}

	

}