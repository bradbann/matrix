import Component from '../../app/component';

export default class Cell_Body extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cell-body" role="cell:body"><slot></slot></div>`;
    }
}
