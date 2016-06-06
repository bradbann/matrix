import Component from '../../app/component';

export default class Flex extends Component {
    constructor(){
        super();
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-flex-box"><slot></slot></div>`;
    }
}
