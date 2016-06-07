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
        return `<div class="mx-panel-head"><slot></slot></div>`;
    }
}
