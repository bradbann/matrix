import Component from '../../app/component';

export default class Flex_Item extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-flex-item"><slot></slot></div>`;
    }
}
