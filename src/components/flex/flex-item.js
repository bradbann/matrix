import Component from '../../app/component';

export default class Flex_Item extends Component {
    constructor(){
        super();
        this.name = 'flex-item';
    }

    _computed(options, take){
        if ( !options ){ options = {} }
        options.style = function(){
            const cls = {};

            if ( this.flex ){
                cls.boxFlex = this.flex;
                cls.flex = this.flex;
            }


            if ( this.order ) {
                cls.order = this.order;
            }

            return cls;
        }

        options.classes = function(){
            const classes = [];

            if ( this.justify ){
                classes.push('mx-flex-justify-' + this.justify);
            }

            if ( this.alignSelf ){
                classes.push('mx-flex-align-self-' + this.alignSelf);
            }

            return classes.join(' ');
        }

        return take('computed', options);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-flex-item" :class="classes" :style="style"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = [] };
        props.push('flex', 'order', 'justify', 'align-self', 'basis');
        return take('props', props);
    }
}
