import Component from '../../app/component';

export default class Flex_Item extends Component {
    constructor(){
        super();
        this.name = 'flex-item';
    }

    _computed(options){
        if ( !options ){ options = {} }
        options.style = function(){
            const cls = [];

            if(this.flex){
                cls.push(
                    '-webkit-box-flex: ' + this.flex,
                    '-webkit-flex: ' + this.flex,
                    '-ms-flex: ' + this.flex,
                    'flex: ' + this.flex
                )
            }


            if ( this.order ) {
                cls.push('order:' + this.order);
            }

            return cls.join(';');
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



        if ( typeof this.computed === 'function' ){
            options = this.computed(options);
        }
        return options;
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-flex-item" :class="classes" :style="style"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = [] };

        props.push('flex', 'order', 'justify', 'align-self', 'basis');

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
