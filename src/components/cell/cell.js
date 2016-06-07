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
        return `<div class="mx-cell" :class="{'mx-cell-linked':linked}" :style="{'border-color':borderColor}"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.linked = Boolean;

        props.borderColor = String;

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
