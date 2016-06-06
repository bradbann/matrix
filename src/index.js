import { ready, bootstrap, webview, Promise } from './main';


require('normalize.css');
require('./css/matrix.scss');

class a extends webview {
    constructor(node){
        super(node);
    }
    a(){
        this.$back('/')
    }
    b(){
        this.$reback('/')
    }
    render(){
        return {
            template: `
                <h1 class="ddd" v-back url="/">a back</h1>
                <h1 class="ddd" v-reback url="/">a reback</h1>

                <h1 class="ddd" @click="a">a back</h1>
                <h1 class="ddd" @click="b">a reback</h1>
            `,
            methods: {
                a: this.a,
                b: this.b
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
        this.$forward('/a/b/c')
    }
    b(){
        this.$redirect('/a/b/c')
    }
    render(){
        return {
            template: `
                <h1 class="ddd" v-redirect url="/a/b/c">b redirect</h1>
                <h1 class="ddd" v-forward url="/a/b/c">b forward</h1>

                <h1 class="ddd" @click="b">b redirect</h1>
                <h1 class="ddd" @click="a">b forward</h1>

                <cells>
                    <cell>
                        <cell:head>head</cell:head>
                        <cell:body>body</cell:body>
                        <cell:foot>foot</cell:foot>
                    </cell>
                    <cell>
                        <cell:head>head</cell:head>
                        <cell:body>body</cell:body>
                        <cell:foot>foot</cell:foot>
                    </cell>
                </cells>
                <flex>
                    <flex:item>dasfads</flex:item>
                </flex>
            `,
            methods: {
                a: this.a,
                b: this.b
            },
            ready(){
                console.log(this)
            }
        }
    }
}



ready(function(){
    const app = bootstrap();

    app.on('route:start', function(){
        console.log('route start');
    })

    app.on('route:end', function(){
        console.log('route end');
    })

    app.on('ready', function(){
        console.log('ready');
    })

    app.at('/', function(next){
        app.publish(b, next);
    })

    app.at('/a/b/c', function(next){
        app.publish(a, next);
    })

    app.listen();
})
