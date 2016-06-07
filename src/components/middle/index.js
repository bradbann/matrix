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
        return `<div class="mx-middle" role="middle" :style="{height:height}" :class="{'mx-text-center': center}"><slot></slot></div>`;
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
