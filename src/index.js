import { ready, bootstrap } from './main';


require('normalize.css');
require('./css/matrix.scss')



ready(function(){
    const simplize = bootstrap();
    on('a', function(){
        simplize.redirect('/a/b/c?a=1&b=2');
    })
    on('b', function(){
        simplize.reback('/');
    })
    on('c', function(){
        history.back();
    })
    on('d', function(){
        history.go(1);
    })

    simplize.on('http:change', function(){
        console.log(this.action)
        this.action = null;
    })

    simplize.listen();
})

function $(id){
    return document.getElementById(id);
}

function on(el, fn){
    $(el).addEventListener('click', fn);
}
