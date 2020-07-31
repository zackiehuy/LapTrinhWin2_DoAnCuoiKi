
const mysql = require('mysql');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);
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
    },
    add: function (table, entity) {
        return new Promise(function (resolve, reject) {
          const sql = `insert into ${table} set ?`;
          pool.query(sql, entity, function (error, results) {
            if (error) {
              return reject(error);
            }
    
            resolve(results);
          });
        });
      }
}