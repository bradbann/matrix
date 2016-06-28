import * as miox from './main';
import ComponentInit from 'miox-components';
import device from './js/device.min.js';

ComponentInit(miox);

class IndexPage extends miox.webview {
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
    }

    methods(methods){
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

    active(){
        console.log('index active');
    }

    unActive(){
        console.log('index unactive');
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
        return require("./temp/flex.html");
    }
}
class panel extends miox.webview {
    constructor(node){
        super(node);
    }
    render(){
        return require("./temp/panel.html")
    }
}

class appview extends miox.webview {
    constructor(node){
        super(node);
    }
    data() {
        return {
            a: 1
        }
    }
    active(){
        console.log('appview active');
    }

    unActive(){
        console.log('appview unactive');
    }
    render(){
        console.log(this);
        return require("./temp/appview.html")
    }
}


class aspect extends miox.webview {
    constructor(node){
        super(node);
    }
    render(){
        return require("./temp/aspect.html");
    }
}
class middle extends miox.webview {
    constructor(node){
        super(node);
    }
    render(){
        return require("./temp/middle.html")
    }
}

class cell extends miox.webview {
    constructor(node){
        super(node);
    }
    data(data = {}){
        data.a = 'men';
        return data;
    }
    render(){
        return require("./temp/cell.html");
    }
}

class button extends miox.webview {
    constructor(node){
        super(node);
    }
    data(){
        return {
            loading:false
        }
    }
    methods(){
        return {
            click:function(){
                this.loading = true;
                setTimeout(()=>{
                    this.loading = false;
                },4000)
            }
        }
    }
    active(){
        console.log(this);
        setTimeout(()=>{
            this.loading = false
        },2000)
    }
    render(){
        return require("./temp/button.html");
    }
}

class wave extends miox.webview {
    constructor(node){
        super(node);
    }
    active(){
        console.log(this);
    }
    render(){
        return require("./temp/wave.html");
    }
}



miox.ready(function(){
    const app = miox.bootstrap({
        backgroundColor: '#eee',
        debug: true,
        animate:'slide'     //  slide|fade|scale|drown
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
        .define('/', IndexPage)
        .define('/flex', flex)
        .define('/appview', appview)
        .define('/panel', panel)
        .define('/aspect', aspect)
        .define('/middle', middle)
        .define('/cell', cell)
        .define('/button', button)
        .define('/wave', wave)
        ;

    app.listen();
})
