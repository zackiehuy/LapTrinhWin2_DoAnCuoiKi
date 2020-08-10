const db = require('../utils/db');

const tbl_account = 'account';

module.exports = {
    forget : function(user){
        return db.load(`SELECT * FROM ${tbl_account} WHERE username = '${user}'`);
    },
    profile: function(ida){
        return db.load(`SELECT * FROM ${tbl_account} WHERE ida = ${ida}`);
    },
    patch: function (entity) {
        const condition = {
          usermame: entity.username
        }
        delete entity.username;
        return db.patch(tbl_account, entity, condition);
      }
};