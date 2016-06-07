import Component from '../../app/component';

export default class Middle extends Component {
    constructor(){
        super();
        this.name = 'middle';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-middle-outter" role="middle" :style="{height:height}" :class="{'mx-text-center': center}"><div class="mx-middle-inner"><slot></slot></div></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.height = Number;
        props.center = Boolean;

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
