import Component from '../../app/component';

export default class Button extends Component {
    constructor(){
        super();
    }

    _computed(options){
        if ( !options ){ options = {} }
        options.class = function(){
            const cls = ['mx-button-' + this.type];
            if ( this.block ){
                cls.push('mx-block');
            }
            return cls.join(' ');
        }
        if ( typeof this.computed === 'function' ){
            options = this.computed(options);
        }
        return options;
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-button" role="button" :class="class"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.block = Boolean;
        props.type = {
            type: String,
            default: 'default'
        }

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
