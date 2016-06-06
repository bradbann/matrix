import Component from '../../app/component';

export default class Flex_Item extends Component {
    constructor(){
        super();
    }

    _computed(options){
        if ( !options ){ options = {} }
        options.style = function(){
            const cls = [];
            cls.push('-webkit-box-flex: ' + this.grow);
            cls.push('-webkit-flex: ' + this.grow);
            cls.push('-ms-flex: ' + this.grow);
            cls.push('flex: ' + this.grow);
            return cls.join(';');
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
        return `<div class="mx-flex-item" :style="style"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };

        props.grow = {
            type: Number,
            default: 1
        }

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
