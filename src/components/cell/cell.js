import Component from '../../app/component';

export default class Cell extends Component {
    constructor(){
        super();
        this.name = 'cell';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cell" role="cell" @click="forClick" data-left="0" :class="{'mx-cell-linked':linked}" :style="{'border-color':borderColor,'padding-left':left}"><slot></slot></div>`;
    }
    _methods(methods, take){
        if(!methods) methods = {};

        methods.forClick = function(){
            if ( this.throught ){
                this.$broadcast('message:click');
            }
        }

        return take('methods', methods);
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.linked = Boolean;
        props.throught = Boolean;
        props.borderColor = String;
        props.left = { type: String, default: '' };
        props.for = String;
        return take('props', props);
    }
}
