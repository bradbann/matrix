import Component from '../../app/component';

export default class Cell extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cell mx-cell-linked"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.linked = Boolean;

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
