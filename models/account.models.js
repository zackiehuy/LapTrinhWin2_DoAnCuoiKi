const db = require('../utils/db');

const tbl_account = 'account';

module.exports = {
    forget : function(user){
        return db.load(`SELECT * FROM ${tbl_account} WHERE username = '${user}'`);
    },
    profile: function(ida){
        return db.load(`SELECT * FROM ${tbl_account} WHERE ida = ${ida}`);
    }
};