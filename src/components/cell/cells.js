import Component from '../../app/component';

export default class Cells extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cells" :style="{'border-color':borderColor}"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.borderColor = "";

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
