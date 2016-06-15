import Component from '../../app/component';

export default class Checkbox extends Component {
    constructor(){
        super();
        this.name = 'checkbox';
    }
    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<label class="mx-checkbox" :type="type" role="input:checkbox" :for="id" ><input :checked="checked" :id="id" type="checkbox" :name="name" :value="value" class="mx-checkbox-input"><span @click="elClick" class="mx-checkbox-vision"></span><slot><slot></label>`;
    }
    _methods(methods){
        if(!methods) methods = {};

        methods.elClick=function(){
            this.$el.click()
        }
        if (this.methods){
            methods = this.methods(methods);
        }

        return methods;
    }

    _props(props){
        if ( !props ){ props = {} };
        props = {
            name :String,
            value:String,
            id:String,
            size:String,
            type:String,
            checked:Boolean
        }

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
