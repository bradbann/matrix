'use strict';

export const animateForward = function(oldWebview, newWebview, cb){
    newWebview.$node.classList.add('mx-webview-forward');
}
