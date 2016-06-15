import Component from '../../app/component';

export default class Radio extends Component {
    constructor(){
        super();
        this.name = 'radio';
    }
    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<label class="mx-radio" role="input:radio" :for="id" ><input :id="id" type="radio" :name="name" :value="value" class="mx-radio-input"><span @click="radioClick" class="mx-radio-vision"></span><slot><slot></label>`;
    }
    _methods(methods){
        if(!methods) methods = {};

        methods.radioClick=function(){
            this.$el.click()
        }
        if (this.methods){
            methods = this.methods(methods);
        }

        return methods;
    }

    _props(props){
        if ( !props ){ props = [] };
        props.push('name', 'value','id','size');

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
