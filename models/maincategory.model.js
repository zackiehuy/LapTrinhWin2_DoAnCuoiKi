const db = require('../utils/db');
const { count } = require('console');

const tbl_maincategory = 'maincategory';

module.exports = {
    all : function(){
        return db.load(`SELECT idmaincategory,name FROM ${tbl_maincategory}`);
    },
    single : function(id){
        return db.load(`SELECT name FROM ${tbl_maincategory} WHERE idmaincategory = ${id}`);
    },
    count : function(id){
        return db.load(`SELECT count(idmaincategory) FROM ${tbl_maincategory}`);
    }
}
