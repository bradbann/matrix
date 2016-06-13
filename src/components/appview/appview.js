import Component from '../../app/component';

export default class AppView extends Component {
    constructor(){
        super();
        this.name = 'appview';
    }

    _computed(computed){
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

        if ( this.computed ){
            computed = this.computed(computed);
        }

        return computed;
    }

    _template(){
        if ( typeof this.template === 'function' ){
            return this.template();
        }
        return `<div class="mx-appview" role="appview" :style="style"><slot></slot></div>`;
    }

    _props(props){
        if ( !props ){ props = {} };
        props.blank = Boolean;

        if ( typeof this.props === 'function' ){
            props = this.props(props);
        }

        return props;
    }
}
