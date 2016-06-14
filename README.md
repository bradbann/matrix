# MIOX

它是一套基于`vuejs`的快速APP创建的框架，解决在实际生产环境中遇到的｀webview｀之间切换的路由架构。通过对`history`的监听来同步webview页面，达到与原生app相同的webview功能。

## 优势

 - 底层数据同步的实时性，依赖于`vuejs`的所有优势。
 - 全继承式开发，包括`webview`创建和组建的创建都采用`ES6`的`extends`来继承。达到与原生组件相同的代码书写规范。
 - 灵活的自定义性，丰富的ui表现组件，再也不用出现`div`标签，所有功能都是组件化的。
 - 上手度很低，只需要拥有基本的js能力即可操作复杂的逻辑。

## 安装及使用

框架代码包已上传至`npmjs.com`，可以通过以下命令来安装：

``` bash
npm install --save miox
```

## 创建第一个简单应用

``` javascript
import { bootstrap, ready, webview } from 'miox';
import requirejs from 'requirejs';

class IndexPage extends webview {
    constructor(){
        super();
    }

    ready(){
        return function(){
            console.log('app rendered:');
            console.log(this);
        }
    }

    render(){
        return {
            template: `
                <appview>
                    <appview:head>
                        <navgation>
                            <navgation:item left width="4em">Menu</navgation:item>
                            <navgation:center>MIOX FREAMWORK</navgation:item>
                            <navgation:item right width="4em">Configs</navgation:item>
                        </navgation>
                    </appview:head>
                    <appview:body>
                        <container>
                            <h1>Welcome to use</h1>
                            <p>MIOX framework building apps.</p>
                        </container>
                    </appview:body>
                </appview>
            `
        }
    }
}

ready(function(){
    const app = bootstrap({
        backgroundColor: '#ccc', //配置背景色
        animate: 'drown', // 配置页面间切换的动画
        debug: true //在打包时候将这个设置为false
    });

    // 使用中间件
    app.use(function(next){
        console.log('use middleware');
        setTimeout(next, 5000);
    })

    // 定义路由
    app.define('/', IndexPage);

    // or you can write like this:
    app.at('/', function(next){
        app.publish(IndexPage, next);
    });

    // use requirejs for async load
    app.at('/a/b', function(next){
        // do some loading events.
        requirejs('http://a.com/b.js', function(b){
            app.publish(b, next);
        })
    })

    app.listen();
})
```

随然以上代码看起来比较多，但是分割一下模块就简单很多了。那么，我们继续来看下这些api的作用。

## API Usage

### MIOX的静态方法活着属性

#### Vue

返回`1.0.24`版本的`Vue`对象方法。

#### Promise

返回`Promise`对象方法，如果浏览器不支持promise的话。

#### components

返回内置组件列表

#### component

返回原生组件的原声class对象，用于被继承

``` javascript
class TAB extends component {
    constructor(){
        super();
    }

    _template(template){
        return `<div class="mx-tab"><slot></slot></div>`
    }
}
```

#### connect

返回中间件继承对象

``` javascript
const app = new bootstrap();
const INDEX = new connect();

INDEX.at('/', function(next){
    INDEX.publish(WEBVIEW, next);
});

app.use(INDEX);
app.listen();
```

#### webview

返回`webview`原生对象

#### scroller

返回滚动事件的监听对象

#### compile

返回编译组件的方法。比如我们编译一个组件,返回该组件编译后的vue组件配置对象.

``` javascript
const a = Vue.extend(compile(components.cells));
console.log(a);
```

#### EventEmitter

返回`EventEmitter`;

#### ready

返回`domready`的方法。

#### define

定义一个内置的全局组件。

``` javascript
class Tab extends component {
    constructor(){
        super();
    }

    _template(){
        return `<div class="tab">tab</div>`;
    }
}


define('tab', Tab);

console.log(widgets)
```

或者这样写

``` javascript
define('tab', function(component, components){
    class Tab extends component {
        constructor(){
            super();
        }

        _template(){
            return `<div class="tab">tab</div>`;
        }
    }

    return Tab;
})
```

#### bootstrap

启动一个app服务, 配置参数如下：

 - `backgroundColor`: '#222',
 - `debug`: false,
 - `delimiters`: ["{{", "}}"],
 - `unsafeDelimiters`: ["{{{", "}}}"],
 - `async`: true,
 - `animate`:'slide'    // fade|drown|cube
