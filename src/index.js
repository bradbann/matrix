import * as miox from './main';
import ComponentInit from 'miox-components';
//import Appview from 'miox-componets/appview/index';
import ttt from './a';

import './css/matrix.scss'

ComponentInit(miox);

// //define(Appview);
//
// // console.log(scroller);
// const aaa = miox.components.cells;
// //console.log(aaa.prototype.$_mark)
// for ( let i in aaa.constructor ){
//     //console.log(i)
// }

//console.log(Tab.arguments)

miox.define('tab', ttt);

class abc {
    constructor(){
        this.b = {};
        this.f = {};
    }
    a(){
        this.b.a = 1;
    }
    c(){
        this.f.a = 1;
    }
}

class t extends abc {
    constructor(){
        super();
    }
    a(){
        super.a();
        this.b.b = 2;
    }
}

class g extends t {
    constructor(){
        super();
    }
    c(){
        super.c();
        this.f.b = 3;
    }
}


const s = new g();

s.a();
s.c();

console.log(s.b, s.f)


class a extends miox.webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: `
                <h1 class="ddd" v-back url="/">a back</h1>
                <h1 class="ddd" v-reback url="/">a reback</h1>

                <h1 class="ddd" @click="a">a back</h1>
                <h1 class="ddd" @click="b">a reback</h1>
            `,
            ready(){
                //console.log(this)
            }
        }
    }
}

class b extends miox.webview {
    constructor(node){
        super(node);
    }

    a(){
        this.$forward('/a/b/c')
    }
    b(){
        this.$redirect('/a/b/c')
    }

    MX_comment(){
        return {
            template: `<div class="comment">comment</div>`
        }
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

    data(data){
        data.state = {menuOpen:false}
        return data;
    }

    methods(methods){
        methods = super.methods(methods);
        methods.a = this.a;
        methods.b = this.b;
        methods.menuclick = this.menuclick;
        return methods;
    }

    events(events){
        events['abc:click'] = function(top){
            console.log(top);
        }
        return events;
    }

    render(){
        return require("./temp/index.html");
    }
}


class flex extends miox.webview {
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
class panel extends miox.webview {
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

class appview extends miox.webview {
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


class aspect extends miox.webview {
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
class middle extends miox.webview {
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

class cell extends miox.webview {
    constructor(node){
        super(node);
    }
    render(){
        return {
            template: require("./temp/cell.html"),
            data: {
                a: 'men'
            },
            ready(){
                //console.log(this)
            }
        }
    }
}




miox.ready(function(){
    const app = miox.bootstrap({
        backgroundColor: '#eee',
        debug: true,
        animate:'drown'     //  slide|fade|scale|drown
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

    app
        .define('/', b)
        .define('/flex', flex)
        .define('/appview', appview)
        .define('/panel', panel)
        .define('/aspect', aspect)
        .define('/middle', middle)
        .define('/cell', cell)
        .define('/a/b/c', a)
        ;

    app.listen();
})
