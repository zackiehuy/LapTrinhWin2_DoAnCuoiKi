const db = require('../utils/db');

const tbl_maincategory = 'maincategory';

module.exports = {
    all : function(){
        return db.load(`SELECT idmaincategory,name FROM ${tbl_maincategory}`);
    }

}