import Component from '../../app/component';

export default class Cells extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cells"><slot></slot></div>`;
    }
}
