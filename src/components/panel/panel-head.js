import Component from '../../app/component';

export default class Panel_Head extends Component {
    constructor(){
        super();
        this.name = 'panel-head';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-panel-head" :class="{'mx-panel-linked':linked}"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.linked = Boolean;
        return take('props', props);
    }
}
