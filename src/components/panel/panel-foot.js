import Component from '../../app/component';

export default class Panel_Foot extends Component {
    constructor(){
        super();
        this.name = 'panel-foot';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-panel-foot" :class="{'mx-panel-linked':linked}"><slot></slot></div>`;
    }
    _props(props, take){
        if ( !props ){ props = {} };
        props.linked = Boolean;
        return take('props', props);
    }
}
