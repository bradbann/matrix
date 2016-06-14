import Component from '../../app/component';
import { compile } from '../../app/util';
import Flex from '../flex/flex';

export default class Navgation extends Component {
    constructor(){
        super();
        this.name = 'navgation';
    }

    _components(components){
        if ( !components ) components = {};
        components.flex = compile(Flex);
        if ( this.components ){
            components = this.components(components);
        }
        return components;
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<flex align-items="center" justify="center"><slot></slot></flex>`;
    }
}
