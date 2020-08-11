const db = require('../utils/db');

const tbl_maincategory = 'maincategory';

module.exports = {
    all : function(){
        return db.load(`SELECT name,idmaincategory FROM ${tbl_maincategory}`);
    },
    single : function(id){
        return db.load(`SELECT name,idmaincategory FROM ${tbl_maincategory} WHERE idmaincategory = ${id}`);
    },
    count : function(id){
        return db.load(`SELECT count(idmaincategory) FROM ${tbl_maincategory}`);
    }
}
