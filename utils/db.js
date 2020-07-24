
const mysql = require('mysql');
const config = require('../config/default.json');

module.exports = {
    load: function(sql) {
        return new Promise (function(resolve , reject){
            pool.query(sql,function(error , result ,fields){
                if(error){
                    return reject(error);
                }
                resolve(result);
            });
        });
    }
}