// TypeScript file
function _create_single_instance<T>(this:{new():T}):T{
    "user strict";

    if(!this) return undefined;

    if ((this as any) === BaseView) throw new Error("can not call BaseView::ins()");
    if (this.hasOwnProperty('ins')){
        const f = (this as any).ins;
        if (f !== _create_single_instance){
            return (this as any).ins();
        }
    }

    const thiz = this;
    const instance = new this();
    const f = function (){
        if (this == thiz) return instance;
        return this && _create_single_instance.call(this) ||undefined;
    };
    (this as any).ins = f;
    return  instance;
}

class BaseClass{
    public static readonly ins = _create_single_instance;
}