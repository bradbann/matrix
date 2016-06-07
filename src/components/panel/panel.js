import Component from '../../app/component';

export default class Panel extends Component {
    constructor(){
        super();
        this.name = 'panel';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-panel" :style="{'border-color':borderColor}"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.borderColor = String;

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
