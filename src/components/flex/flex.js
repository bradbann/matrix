import Component from '../../app/component';

export default class Flex extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-flex-box"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };

        props.direction = {
            type: String,
            default: 'row'
        }

        props.align = {
            type: String,
            default: 'middle'
        }

        props.space = {
            type: String,
            default: 'around'
        }

        return props;
    }
}
