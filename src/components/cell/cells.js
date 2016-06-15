import Component from '../../app/component';

export default class Cells extends Component {
    constructor(){
        super();
        this.name = 'cells';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cells" role="cells" :style="{'border-color':borderColor}"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.borderColor = String;
        return take('props', props);
    }
}
