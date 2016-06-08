import Component from '../../app/component';

export default class AppView extends Component {
    constructor(){
        super();
        this.name = 'appview';
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-appview" role="appview"><slot></slot></div>`;
    }
}
