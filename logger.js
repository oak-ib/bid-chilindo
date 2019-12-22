const today = new Date();
const date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();

const fs = require('fs');
const dir = './logs/'+date;
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var filename_log = './logs/'+date+'/test.log';

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: filename_log,
        timestampFormat: 'YYYY-MM-DD HH:mm:ss'
    }, log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports = log;