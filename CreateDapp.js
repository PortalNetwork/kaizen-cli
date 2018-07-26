const cmd=require('node-cmd');
const fs = require("fs");
const del = require('del');
const chalk = require('chalk');
module.exports = (argv)=> {
    const Log = console.log;
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
        if (err) return ErrorLog('clone ERROR!');
        fs.rename(rename, `${argv.type}-${argv.name}`, fsRename)
        SuccessLog('==== Clone Success ====');
    }

    function fsRename(err) {
        if (err=='null') return ErrorLog('rename ERROR!');
        del([`./${argv.type}-${argv.name}/.git`]).then(unlink);
        SuccessLog('==== Rename Success ====');
    }
    function unlink(err) {
        if (err=='null') return ErrorLog('file unlink ERROR!');
        SuccessLog('==== Del .git Success ====');
    }

    function SuccessLog(log){
        Log(chalk.green.bold(log));
    }
    function ErrorLog(log) {
        Log(chalk.white.bgRed.bold(log));
    }


}