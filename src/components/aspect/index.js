import Component from '../../app/component';

export default class Aspect extends Component {
    constructor(){
        super();
        this.name = 'aspect';
    }
    _computed(options, take){
        if ( !options ){ options = {} }
        options.class = function(){
            const cls = [];
            if ( this.align ){
                cls.push('mx-text-' + this.align);
            }
            return cls.join(' ');
        }
        return take('computed', options);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-aspect" role="aspect" :style="{width:width}" :class="class"><div class="mx-aspect-inner"><slot></slot></div><div class="mx-aspect-after" :style="{'padding-bottom':ratio}"></div></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.width = { type: String, default: '100%' };
        props.align = String;
        props.ratio = { type: String, default: "100%" }
        return take('props', props);
    }
}
