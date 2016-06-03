'use strict';

import onTransitionEnd from './transitionend';
const expectedDuration = 300;


export const animateForward = function(oldWebview, newWebview, cb){

    newWebview.$node.style.zIndex = 1000;
    oldWebview.$node.style.zIndex = 999;

    console.log("old:",oldWebview,"new :",newWebview);

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-forward');

    setTimeout(function(){
        console.log("webviews start animation");
        newWebview.$node.style.transition="";
        addClass(oldWebview,'mx-webview-backward');
        removeClass(oldWebview,'active');
        removeClass(newWebview,'mx-webview-forward');

    },1000/60);

    onTransitionEnd(newWebview.$node, expectedDuration, function(){

        addClass(newWebview,'active');
        console.log("***********"+" END1 "+"**********");
        removeClass(oldWebview, 'mx-webview-backward');
        newWebview.$node.style.zIndex = "";
        oldWebview.$node.style.zIndex = "";

        cb();
    });

}

export const animateBackward = function(oldWebview, newWebview, cb){

    console.log("old:",oldWebview,"new :",newWebview);
    newWebview.$node.style.zIndex = 999;
    oldWebview.$node.style.zIndex = 1000;

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-backward');

    setTimeout(function(){
        newWebview.$node.style.transition="";
        removeClass(newWebview,'mx-webview-backward');
        addClass(oldWebview,'mx-webview-forward');
    },1000/60);

    onTransitionEnd(newWebview.$node, expectedDuration, function(){
        console.log("***********"+" END2 "+"**********");
        addClass(newWebview,'active');
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
