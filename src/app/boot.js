'use strict';

import Http from './http';
import GlobalHTML from '../template/global.html';

export default class bootstrap extends Http {
    constructor(){
        super();
    }
    listen(){
        console.log(GlobalHTML)
    }
}
