'use strict';

import transitionEnd from './transitionend';

export const animateForward = function(oldWebview, newWebview, cb){
    addClass(newWebview, 'active');
    removeClass(oldWebview, 'active');
    addClass(newWebview, 'mx-webview-forward');
    setTimeout(function(){
        addClass(newWebview, 'mx-webview-in');
        addClass(oldWebview, 'mx-webview-out');
        transitionEnd(newWebview.$node).bind(function(){
            transitionEnd(newWebview.$node).unbind();
            removeClass(newWebview, 'mx-webview-forward');
            removeClass(newWebview, 'mx-webview-compiling');
            removeClass(newWebview, 'mx-webview-in');
            removeClass(oldWebview, 'mx-webview-out');
            cb();
        });
    }, 0)
}

export const animateBackward = function(oldWebview, newWebview, cb){
    console.log(oldWebview, newWebview)
    addClass(newWebview, 'active');
    removeClass(oldWebview, 'active');
    addClass(newWebview, 'mx-webview-backward');
    setTimeout(function(){
        addClass(newWebview, 'mx-webview-in');
        addClass(oldWebview, 'mx-webview-back');
        transitionEnd(newWebview.$node).bind(function(){
            transitionEnd(newWebview.$node).unbind();
            removeClass(newWebview, 'mx-webview-backward');
            removeClass(newWebview, 'mx-webview-compiling');
            removeClass(newWebview, 'mx-webview-in');
            removeClass(oldWebview, 'mx-webview-back');
            cb();
        });
    }, 0)
}

function addClass(el, cls){
    if (!el) return;
    el.$node.classList.add(cls);
}
function removeClass(el, cls){
    if (!el) return;
    el.$node.classList.remove(cls);
}
