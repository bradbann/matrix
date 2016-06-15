import Component from '../../app/component';
import { compile } from '../../app/util';
import Flex_Item from '../flex/flex-item';

export default class Navgation_Item extends Component {
    constructor(){
        super();
        this.name = 'navgation-item';
    }

    _components(components, take){
        if ( !components ) components = {};
        components['flex:item'] = compile(Flex_Item);
        return take('components', components);
    }

    _computed(computed, take){
        if ( !computed ) computed = {};
        computed.grid = function(){
            return (this.center ? 1 : 0 ) + ' 0 ' + (this.width || 0);
        }
        return take('computed', computed);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<flex:item :flex.sync="grid" :class="{'mx-text-center': center, 'mx-text-left': left, 'mx-text-right': right}"><slot></slot></flex:item>`;
    }

    _props(props, take){
        if ( !props ) props = {};
        props.width = String;
        props.center = Boolean;
        props.left = Boolean;
        props.right = Boolean;
        return take('props', props);
    }
}
