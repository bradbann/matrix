import Component from '../../app/component';
import { compile } from '../../app/util';
import Flex_Item from '../flex/flex-item';

export default class Navgation_Item extends Component {
    constructor(){
        super();
        this.name = 'navgation-item';
    }

    _components(components){
        if ( !components ) components = {};
        components['flex:item'] = compile(Flex_Item);
        if ( this.components ){
            components = this.components(components);
        }
        return components;
    }

    _computed(computed){
        if ( !computed ) computed = {};
        computed.grid = function(){
            return (this.center ? 1 : 0 ) + ' 0 ' + (this.width || 0);
        }
        if ( this.computed ){
            computed = this.computed(computed);
        }
        return computed;
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<flex:item :flex.sync="grid" :class="{'mx-text-center': center, 'mx-text-left': left, 'mx-text-right': right}"><slot></slot></flex:item>`;
    }

    _props(props){
        if ( !props ) props = {};
        props.width = String;
        props.center = Boolean;
        props.left = Boolean;
        props.right = Boolean;
        if ( this.props ){
            props = this.props(props);
        }
        return props;
    }
}
