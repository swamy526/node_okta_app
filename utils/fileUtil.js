var fs = require('fs');

module.exports = {
    readFile: function(fileName, callback) {
        fs.readFile(fileName, 'utf8', function readFileCallback(err, data) {
            if (err) {
                data = {};
                data.users = [];
                callback(data);
            } else {
                try {
                    data = JSON.parse(data);
                }
                catch (err) {
                    data = {};
                    data.users = [];
                }
                if (data == null){
                  data = {};
                  data.users = [];
                }

                callback(data);
            }
        });
    },
    writeFile: function(fileName, jsonDataToWrite, callback) {
        fileName = fileName || 'default.json';
        this.readFile(fileName, function(data) {
            if (jsonDataToWrite) {
                data.users.push(jsonDataToWrite);
                fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', callback);
            } else {
                callback(null);
            }
        });
    }
}