import Component from '../../app/component';

export default class Cell extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cell" role="cell" data-left="0" :class="{'mx-cell-linked':linked}" :style="{'border-color':borderColor,'padding-left':left}"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.linked = Boolean;

        props.borderColor = String;

        props.left= {type:String,default:''}

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
