import Component from '../../app/component';

export default class Panel_Body extends Component {
    constructor(){
        super();
        this.name = 'panel-body';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-panel-body"><slot></slot></div>`;
    }
}
