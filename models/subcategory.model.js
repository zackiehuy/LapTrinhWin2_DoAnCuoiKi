const db = require('../utils/db');

const tbl_subcategory = 'subcategory';

module.exports = {
    all : function(idmaincategory){
        return db.load(`SELECT name FROM ${tbl_subcategory} WHERE idmaincategory = ${idmaincategory}`);
    }

}