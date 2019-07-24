/*************************************************************************************/
/* vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
import config from '../../../application.config.js';


(function main() {
    const elements = document.querySelectorAll('*[id]');
    const components = {};

    for(const element of elements)
        components[element.id] = element;

    console.log(components);
})();
