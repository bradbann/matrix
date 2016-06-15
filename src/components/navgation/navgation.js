import Component from '../../app/component';
import { compile } from '../../app/util';
import Flex from '../flex/flex';

export default class Navgation extends Component {
    constructor(){
        super();
        this.name = 'navgation';
    }

    _components(components, take){
        if ( !components ) components = {};
        components.flex = compile(Flex);
        return take('components', components);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<flex align-items="center" justify="center"><slot></slot></flex>`;
    }
}
