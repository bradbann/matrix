import Component from '../../app/component';

export default class Cell extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-cell"><slot></slot></div>`;
    }
}
