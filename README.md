# MIOX

它是一套基于`vuejs`的快速APP创建的框架，解决在实际生产环境中遇到的`webview`之间切换的路由架构。通过对`history`的监听来同步webview页面，达到与原生app相同的webview功能。

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

api简介

### MIOX的静态方法或者属性

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

 - `backgroundColor` 默认:'#222',
 - `debug` 默认:false,
 - `delimiters` 默认:["{{", "}}"],
 - `unsafeDelimiters` 默认:["{{{", "}}}"],
 - `async` 默认:true,
 - `animate` 默认:'slide'
    - {string} slide|fade|scale|drown|cube
    - {json}
        - forward: {function} 进入动画
        - back: {function} 退出动画

一旦创建完毕，将返回一个`app`对象。


#### widgets

全局组件被编译成vue配置对象后的集合。

``` javascript
console.log(widgets);
```


### MIOX 的中间件模式

请参阅 [http://www.expressjs.com.cn/4x/api.html#app.use](http://www.expressjs.com.cn/4x/api.html#app.use)

我们的路由中间件同理`express`的路由中间件。

#### use(path, fn)

> *非严格模式匹配路由规则*

 - `path` {string | undefined}  路由规则，如果不存在就是`/`
 - `fn` {function|router} 路由回调或者路由新中间件对象。如果启用的是新中间件对象，那么此中间件用作路由的分发。

``` javascript
app.use(function(next){
	console.log('Hello world!');
	next();
})
```

如果是路由分发

``` javascript
const server = new connect();

server.use(function(next){
	console.log('Hello world!');
	next();
});

app.use(server);
```

#### at(path, fn)

> *严格模式匹配路由规则*

 - `path` {string | undefined} 路由规则，如果不存在就是 `/`
 - `fn` 匹配回调

``` javascript
app.at('/', function(next){
	app.publish(webview, next);
})
```

#### 严格模式与非严格模式

如果我嘛当前路径是`/a/b/c`

在非严格模式下 `/a` 或者`/a/b`或者`/a/b/c`都能匹配上当前路径

在严格模式下 `/a`和`/a/b`都不能匹配上当前路径，只有`/a/b/c`能匹配

#### publish(webview, next)

 - `webview` {class} 需要被渲染的webview对象
 - `next` 渲染完毕后的回调

``` javascript
app.publish(webview, next);
connect.publish(webview, next);
```

#### define(name, object)

定义一个简化的路由到`webview`模板对象

``` javascript
app.define('/a/b/', webview);
```

### MIOX 的全局事件

#### event:ready

框架渲染完毕后的事件

``` javascript
app.on('ready', function(){
	console.log('ready');
})
```

#### event: route:start

路由开始匹配前的事件

``` javascript
app.on('route:start', function(){
	console.log('route start');
})
```

#### event route:end

路由匹配完成后的事件

``` javascript
app.on('route:end', function(){
	console.log('route end');
})
```

### App 的内部条转方法

#### 方法

##### this.$redirect(url) 与 this.$reback(url)

这2个方法都会重新创建`webview`来产生页面

##### this.$forward(url) 与 this.$back(url)

这2个方法都会搜索已经存在的url是否匹配上当前需要跳转的url，如果存在，使用后退或者前进，但是方法永远固定。如果没有该url，将会自动创建。

##### this.$refresh(url)

刷新页面

## MIOX 的webview创建

创建一个`webview`需要继承自原生的webview对象。来看一个例子：

``` javascript
import { webview } from 'miox';

class IndexPageWebview extends webview {
	constructor(){
		super();
	}

	// ready和destoryed 方法将同事继承自配置参数
	ready(){
		console.log('ready2')
	}

	destoryed(){
		console.log('destoryed 3')
	}

	// 我们通过render方法渲染出webview的vue配置对象
	render(){
		return {
			template: `<h1 @click="a">11111111</h1>...`,
			ready(){
				console.log('ready 1')
			},
			destoryed(){
				console.log('destoryed 1')
			},
			methods: {
				a(){
					alert(1)
				}
			}
		}
	}
}
```

webview的创建，核心就是编写render返回的vue参数。参数匹配请具体参考 [http://cn.vuejs.org/api/](http://cn.vuejs.org/api/)


## MIOX 的组件编写与继承

所有组件的编写都基于原生组件对象或者已有组件对象

基于原生

``` javascript
import { component } from 'miox';

class tab extends component {
	constructor(){
		super();
	}

	_data(data, take){
		if (!data) data = { b: 2, c: 3 };

		//支持复用
		data = take('data', data);

		return data;
		// 或者这样返回function
		return function(){
			return data;
		}
	}

	_computed(computeds, take){
		if ( !computeds ) computeds = {};

		computeds.a = function(){
			return this.b + this.c;
		}

		// 支持复用
		computeds = take('computed', computeds);

		return computeds;
	}

	// 模板化方法
	_template(){
		if ( this.template ){
			// 支持再复用
			return this.template();
		}
		return `<div>...</div>`
	}

	_props(props, take){
		if ( !props ) props = {};
		props.main = Boolean;

		// 支持复用
		props = take('props', props);

		return props;
	}
}
```

所有webview的方法都是vuejs配置参数都变形，变形逻辑如下：

如果我们要配置vuejs的`props`属性，那么我们使用`_props`或者直接`props`的方法来返回数据。这个方法接受2个参数：

 - `source-data` 原始数据，即这个对象的原始存在数据
 - `take` 继承回调。用来支持后续的再继承功能。而这个方法同样存在2个参数：
	 - `name` 再继承的方法名称
	 - `data` 继承数据

如何较好的设计组件，将决定组件的可服用继承性。

我们来看一个已由组件的变化继承：

``` javascript
import { components } from 'miox';

class NewComponent extends components.cells {
	constructor(){
		super();
	}

	props(props, take){
		props.keep = Boolean;

		// 如果不写take方法，那么下次将无法被继承
		props = tabke('extend_props', props);
		// 同时下次被继承时候的名称为'extend_props'

		return props;
	}
}
```
