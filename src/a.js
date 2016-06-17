import * as miox from './main';
class Tab extends miox.component {
    constructor(){
        super();
    }

    template(){
        return `<div class="mx-cells eee" role="cells" :style="{'border-color':borderColor}" :class="{'ttt':main}"><slot></slot></div>`;
    }

    props(props){
        if ( !props ) props = {};
        props.main = Boolean;
        return props;
    }
}

export default Tab
