import Component from '../../app/component';

export default class Middle extends Component {
    constructor(){
        super();
        this.name = 'ratio';
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
        return `<div class="mx-ratio" role="ratio" :style="{'width':width}" :class="class"><div class="mx-ratio-inner"><slot></slot></div> <div class="mx-ratio-after" :style="{'padding-bottom':value}"></div> </div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.width = {type:String,default:'100%'};
        props.align = String;
        props.value = {type:String,default:"100%"}

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
