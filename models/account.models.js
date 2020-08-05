const db = require('../utils/db');

const tbl_account = 'account';

module.exports = {
    signin : function(user,pass){
        return db.load(`SELECT username,password FROM ${tbl_account} WHERE username = ${user} AND password = ${pass}`);
    }
};