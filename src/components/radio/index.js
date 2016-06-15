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
        return `
        <label class="mx-radio" role="input:radio">
            <input type="radio" :name="name" :value="value" class="mx-radio-input" v-model="data">
            <span :style="{'font-size':size}" @click.stop="radioClick" class="mx-radio-vision"></span>
            <slot><slot>
        </label>`;
    }
    _methods(methods, take){
        if(!methods) methods = {};

        methods.radioClick=function(){
            this.data = this.value;
        }

        return take('methods', methods);
    }

    _events(events, take){
        if ( !events ) events = {};
        events['message:click'] = function(){
            this.radioClick();
        }

        return take('events', events);
    }

    _props(props, take){
        if ( !props ){ props = [] };
        props.push('name', 'value', 'size', 'data');
        return take('props', props);
    }
}
