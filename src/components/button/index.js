import Component from '../../app/component';

export default class Button extends Component {
    constructor(){
        super();
        this.name = 'button';
    }

    _computed(options, take){
        if ( !options ){ options = {} }
        options.class = function(){
            const cls = ['mx-button-' + this.type];
            if ( this.block ){
                cls.push('mx-block');
            }
            return cls.join(' ');
        }
        return take('computed', options);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-button" role="button" :class="class"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.block = Boolean;
        props.type = {
            type: String,
            default: 'default'
        }
        return take('props', props);
    }
}
