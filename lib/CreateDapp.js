const cmd=require('node-cmd');
const fs = require("fs");
const del = require('del');
const Log = require('../lib/Log');
module.exports = (argv)=> {
    let f2eFramework ='';
    let rename = '';
    switch (argv.type) {
        case 'vue':
            f2eFramework = 'https://github.com/MikeCheng1208/Vuejs-template.git';
            rename = 'Vuejs-template';
            break;

        case 'react':
            f2eFramework = 'https://github.com/MikeCheng1208/Reactjs-template.git';
            rename = 'Reactjs-template';
            break;
    }

    cmd.get(`git clone ${f2eFramework}`, clone);
    function clone(err) {
        if (err) return Log.ErrorLog('clone ERROR!');
        fs.rename(rename, `${argv.type}-${argv.name}`, fsRename)
        Log.SuccessLog('==== Clone Success ====');
    }

    function fsRename(err) {
        if (err=='null') return Log.ErrorLog('rename ERROR!');
        del([`./${argv.type}-${argv.name}/.git`]).then(unlink);
        Log.SuccessLog('==== Rename Success ====');
    }
    function unlink(err) {
        if (err=='null') return Log.ErrorLog('file unlink ERROR!');
        Log.SuccessLog('==== Del .git Success ====');
    }
}