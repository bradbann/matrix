import Component from '../../app/component';

export default class AppView extends Component {
    constructor(){
        super();
        this.name = 'appview';
    }

    _computed(computed, take){
        if ( !computed ){
            computed = {};
        }

        computed.style = function(){
            if ( this.blank ){
                return {
                    'padding-top': 20
                }
            }
        }

        return take('computed', computed);
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-appview" role="appview" :class="{'mx-appview-horizontal': horizontal}" :style="style"><slot></slot></div>`;
    }

    _props(props, take){
        if ( !props ){ props = {} };
        props.blank = Boolean;
        props.horizontal = Boolean;
        return take('props', props);
    }
}
