import { ready, bootstrap, webview } from './main';


require('normalize.css');
require('./css/matrix.scss');

class a extends webview {
    constructor(node){
        super(node);
    }
    a(){
        this.$reback('/')
    }
    render(){
        return {
            template: `<div class="ddd" @click="a">111</d>`,
            methods: {
                a: this.a
            },
            ready(){
                //console.log(this)
            }
        }
    }
}

class b extends webview {
    constructor(node){
        super(node);
    }
    a(){
        this.$redirect('/a/b/c')
    }
    render(){
        return {
            template: `<div class="ddd" @click="a">222</d>`,
            methods: {
                a: this.a
            },
            ready(){
                //console.log(this)
            }
        }
    }
}



ready(function(){
    const app = bootstrap();

    app.on('route:end', function(){
        //console.log('end', this.action);
    })

    app.on('ready', function(){
        //console.log('ready');
    })

    app.at('/', function(next){
        app.publish(b, next);
    })

    app.at('/a/b/c', function(next){
        app.publish(a, next);
    })

    app.listen();
    console.log(app)
})
