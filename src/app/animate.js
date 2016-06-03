'use strict';

import transitionEnd from './transitionend';


export const animateForward = function(oldWebview, newWebview, cb){

    newWebview.$node.style.zIndex = 1000;
    oldWebview.$node.style.zIndex = 999;

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-forward');
    console.log("webviews ready");

    setTimeout(function(){
        console.log("webviews start animation");
        newWebview.$node.style.transition="";
        addClass(oldWebview,'mx-webview-backward');
        removeClass(oldWebview,'active');
        removeClass(newWebview,'mx-webview-forward');

        addClass(newWebview,'active');
    },0);

    transitionEnd(newWebview.$node).bind(function(){
        transitionEnd(newWebview.$node).unbind();
        removeClass(oldWebview, 'mx-webview-backward');
        newWebview.$node.style.zIndex = "";
        oldWebview.$node.style.zIndex = "";

        console.log("webview animate end");
        cb();
    });

}

export const animateBackward = function(oldWebview, newWebview, cb){
    newWebview.$node.style.zIndex = 999;
    oldWebview.$node.style.zIndex = 1000;

    newWebview.$node.style.transition="none";
    addClass(newWebview,'mx-webview-backward');
    console.log("webviews ready");

    setTimeout(function(){
        console.log("webviews start animation");
        newWebview.$node.style.transition="";
        removeClass(newWebview,'mx-webview-backward');
        addClass(oldWebview,'mx-webview-forward');


    },0);

    transitionEnd(newWebview.$node).bind(function(){
        addClass(newWebview,'active');
        transitionEnd(newWebview.$node).unbind();
        removeClass(oldWebview, 'mx-webview-forward');
        removeClass(oldWebview, 'active');
        console.log("webview animate end");
        newWebview.$node.style.zIndex = "";
        oldWebview.$node.style.zIndex = "";
        cb();
    });

}

// export const animateForward = function(oldWebview, newWebview, cb){
//     addClass(newWebview, 'active');
//     removeClass(oldWebview, 'active');
//     addClass(newWebview, 'mx-webview-forward');
//     setTimeout(function(){
//         addClass(newWebview, 'mx-webview-in');
//         addClass(oldWebview, 'mx-webview-out');
//         transitionEnd(newWebview.$node).bind(function(){
//             transitionEnd(newWebview.$node).unbind();
//             removeClass(newWebview, 'mx-webview-forward');
//             removeClass(newWebview, 'mx-webview-compiling');
//             removeClass(newWebview, 'mx-webview-in');
//             removeClass(oldWebview, 'mx-webview-out');
//             cb();
//         });
//     }, 0)
// }
//
// export const animateBackward = function(oldWebview, newWebview, cb){
//     console.log(oldWebview, newWebview)
//     addClass(newWebview, 'active');
//     removeClass(oldWebview, 'active');
//     addClass(newWebview, 'mx-webview-backward');
//     setTimeout(function(){
//         addClass(newWebview, 'mx-webview-in');
//         addClass(oldWebview, 'mx-webview-back');
//         transitionEnd(newWebview.$node).bind(function(){
//             transitionEnd(newWebview.$node).unbind();
//             removeClass(newWebview, 'mx-webview-backward');
//             removeClass(newWebview, 'mx-webview-compiling');
//             removeClass(newWebview, 'mx-webview-in');
//             removeClass(oldWebview, 'mx-webview-back');
//             cb();
//         });
//     }, 0)
// }

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
