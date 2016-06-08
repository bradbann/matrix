import Container from '../components/container/index';
import { Cells, Cell, Cell_head, Cell_body, Cell_foot } from '../components/cell/index';
import { Panel, Panel_head, Panel_body, Panel_foot } from '../components/panel/index';
import { Appview, Appview_head, Appview_body, Appview_foot } from '../components/appview/index';
import Icons from 'vue-icons';
import { Flex, Flex_item } from '../components/flex/index';
import Btn from '../components/button/index';
import Middle from '../components/middle/index';
import Aspect from '../components/aspect/index';

Icons.name = 'icon';

const COMPONENTS = {
    // middle
    "middle"        : Middle,

    //ratio
    "aspect"         :Aspect,

    //container
    "container"     : Container,

    // icon
    "icon"          : Icons,

    // cell
    "cells"         : Cells,
    "cell"          : Cell,
    "cell:head"     : Cell_head,
    "cell:body"     : Cell_body,
    "cell:foot"     : Cell_foot,

    // panel
    "panel"         : Panel,
    "panel:head"    : Panel_head,
    "panel:body"    : Panel_body,
    "panel:foot"    : Panel_foot,

    // flex
    "flex"          : Flex,
    "flex:item"     : Flex_item,

    // button
    "btn"           : Btn,

    // app view
    "appview"       : Appview,
    "appview:head"  : Appview_head,
    "appview:body"  : Appview_body,
    "appview:foot"  : Appview_foot
}

let keys = Object.keys(COMPONENTS);
let i = keys.length;
let result = {};

while ( i-- ){
    let cp = COMPONENTS[keys[i]];
    if ( !!cp.prototype ){
        cp = new cp();
        cp.$_install();
        result[keys[i]] = cp._vue_options;
    }
    else {
        result[keys[i]] = cp;
    }
}

export const Components = COMPONENTS;
export const COMPONENTLIST = result;
