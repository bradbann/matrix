'use strict';

import transitionEnd from './transitionend';


export const animateForward = function(oldWebview, newWebview, cb){

    newWebview.$node.style.zIndex = 1000;
    oldWebview.$node.style.zIndex = 999;

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-forward');

    setTimeout(function(){
        console.log("webviews start animation");
        newWebview.$node.style.transition="";
        addClass(oldWebview,'mx-webview-backward');
        removeClass(oldWebview,'active');
        removeClass(newWebview,'mx-webview-forward');

        addClass(newWebview,'active');
    },0);

    transitionEnd(newWebview.$node).bind(function(){
        console.log("***********"+" END1 "+"**********");
        transitionEnd(newWebview.$node).unbind();
        removeClass(oldWebview, 'mx-webview-backward');
        newWebview.$node.style.zIndex = "";
        oldWebview.$node.style.zIndex = "";

        cb();
    });

}

export const animateBackward = function(oldWebview, newWebview, cb){
    newWebview.$node.style.zIndex = 999;
    oldWebview.$node.style.zIndex = 1000;

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-backward');

    setTimeout(function(){
        newWebview.$node.style.transition="";
        removeClass(newWebview,'mx-webview-backward');
        addClass(oldWebview,'mx-webview-forward');


    },0);

    transitionEnd(newWebview.$node).bind(function(){
        console.log("***********"+" END2 "+"**********");
        addClass(newWebview,'active');
        transitionEnd(newWebview.$node).unbind();
        removeClass(oldWebview, 'mx-webview-forward');
        removeClass(oldWebview, 'active');
        newWebview.$node.style.zIndex = "";
        oldWebview.$node.style.zIndex = "";
        cb();
    });

}


function addClass(el, cls){
    if (!el) return;
    el.$node.classList.add(cls);
}
function removeClass(el, cls){
    if (!el) return;
    if ( el.$node.classList.contains(cls) ){
        el.$node.classList.remove(cls);
    }
}
