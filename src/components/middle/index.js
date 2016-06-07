import Component from '../../app/component';

export default class Middle extends Component {
    constructor(){
        super();
        this.name = 'middle';
    }
    _computed(options){
        if ( !options ){ options = {} }
        options.class = function(){
            const cls = [];
            if ( this.align ){
                cls.push('mx-text-' + this.align);
            }
            return cls.join(' ');
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
        return `<div class="mx-middle-outter" role="middle" :style="{'height':height}" :class="class"><div class="mx-middle-inner"><slot></slot></div></div>`;
    }

    _props(props){
        if ( !props ){ props = [] };
        props.push('height', 'align');

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
