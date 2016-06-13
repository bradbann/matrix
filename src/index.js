import { ready, bootstrap, webview, Promise, define, widgets, component, scroller } from './main';
// console.log(scroller);
require('normalize.css');
require('./css/matrix.scss');

// class Tab extends component {
//     constructor(){
//         super();
//     }
//
//     _template(){
//         return `<div class="tab">tab</div>`;
//     }
// }
//
//
// define('tab', Tab);
//
// console.log(widgets)


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


    menuclick(openstate,event){
        let body=  document.body;
        if(this.state.menuOpen){
            event.preventDefault();
            event.stopPropagation();
            openstate=false;
        }
        if(openstate){
            body.classList.add("mx-sidebar-open");
            this.state.menuOpen=true;
        }else{
            body.classList.remove("mx-sidebar-open");
            this.state.menuOpen=false;
        }
    }
    render(){
        return {
            template: require("./temp/index.html"),
            data:{
                state:{
                    menuOpen:false
                }
            },
            methods: {
                a: this.a,
                b: this.b,
                menuclick:this.menuclick
            },
            ready(){
                //console.log(this)
            }
        }
    }
}


class flex extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/flex.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}
class panel extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/panel.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}

class appview extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/appview.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}


class aspect extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/aspect.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}
class middle extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/middle.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}

class cell extends webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/cell.html"),
            ready(){
                //console.log(this)
            }
        }
    }
}




ready(function(){
    const app = bootstrap({
        backgroundColor: '#eee',
        debug: true,
        animate:'slide'     //  slide|fade|scale|drown|cube
    });

    app.on('route:start', function(){
        //console.log('route start');
    })

    app.on('route:end', function(){
        //console.log('route end');
    })

    app.on('ready', function(){
        //console.log('ready');
        //console.log(app)
    })

    app.at('/', function(next){
        app.publish(b, next);
    })
    app.at('/flex', function(next){
        app.publish(flex, next);
    })
    app.at('/appview', function(next){
        app.publish(appview, next);
    })
    app.at('/panel', function(next){
        app.publish(panel, next);
    })
    app.at('/aspect', function(next){
        app.publish(aspect, next);
    })
    app.at('/middle', function(next){
        app.publish(middle, next);
    })
    app.at('/cell', function(next){
        app.publish(cell, next);
    })

    app.at('/a/b/c', function(next){
        app.publish(a, next);
    })

    app.listen();
})
