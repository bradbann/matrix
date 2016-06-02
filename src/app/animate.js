'use strict';

import transitionEnd from './transitionend';

export const animateForward = function(oldWebview, newWebview, cb){
    newWebview.$node.classList.add('mx-webview-forward');
    setTimeout(function(){
        newWebview.$node.classList.add('active');
        if ( oldWebview ){
            oldWebview.$node.classList.add('mx-webview-backward');
        }
        transitionEnd(newWebview.$node).bind(function(){
            transitionEnd(newWebview.$node).unbind();
            newWebview.$node.classList.remove('mx-webview-forward');
            oldWebview.$node.classList.remove('active');
            oldWebview.$node.classList.remove('mx-webview-backward');
        });
    }, 0)
}
