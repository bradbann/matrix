import Component from '../../app/component';

export default class Flex_Item extends Component {
    constructor(){
        super();
    }

    _computed(options){
        if ( !options ){ options = {} }
        options.style = function(){
            const cls = [
                '-webkit-box-flex: ' + this.grow,
                '-webkit-flex: ' + this.grow,
                '-ms-flex: ' + this.grow,
                'flex: ' + this.grow
            ];

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
