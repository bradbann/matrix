import Component from '../../app/component';

export default class Container extends Component {
    constructor(){
        super();
        this.name = 'container';
    }

    _computed(options, take){
        if ( !options ){ options = {} }
        options.style = function(){
            const cls = [];
            if ( this.border && this.borderColor ){
                cls.push('border-color:' + this.borderColor);
            }
            return cls.join(' ');
        }
        return take('computed', options);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-container" role="container" :class="{'mx-container-border': this.border}" :style="style"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.border = Boolean;
        props.borderColor = String;
        return take('props', props);
    }
}
