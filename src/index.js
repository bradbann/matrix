import { ready, bootstrap } from './main';

ready(function(){
    const app = bootstrap();
    on('a', function(){
        app.$server.redirect('/a/b/c?a=1&b=2');
    })
    on('b', function(){
        app.$server.reback('/');
    })
    on('c', function(){
        history.back();
    })
    on('d', function(){
        history.go(1);
    })

    app.on('route:end', function(){
        console.log('end', this.action);
    })

    app.on('ready', function(){
        console.log('ready');
    })

    app.at('/a/b/c', function(next){
        console.log('in');
        setTimeout(next, 2000);
    })

    app.listen();
    console.log(app)
})

function $(id){
    return document.getElementById(id);
}

function on(el, fn){
    $(el).addEventListener('click', fn);
}
