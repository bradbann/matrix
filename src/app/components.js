import Container from '../components/container/index';
import { Cells, Cell, Cell_head, Cell_body, Cell_foot } from '../components/cell/index';
import { Panel, Panel_head, Panel_body, Panel_foot } from '../components/panel/index';
import Icons from 'vue-icons';
import { Flex, Flex_item } from '../components/flex/index';
import Btn from '../components/button/index';

Icons.name = 'icon';

export default {
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
    "btn"           : Btn
}
