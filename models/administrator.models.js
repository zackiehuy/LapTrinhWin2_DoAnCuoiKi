const db = require('../utils/db');

const tbl_maincategory = 'maincategory';
const tbl_subcategory = 'subcategory';

module.exports = {
    allmaincategory : function(){
        return db.load(`SELECT idmaincategory,name FROM ${tbl_maincategory}`);
    },
    singlemaincategory : function(id){
        return db.load(`SELECT idmaincategory,name FROM ${tbl_maincategory} WHERE idmaincategory = ${id}`);
    },
    allsubcategory : function(){
        return db.load(`SELECT idsubcategory,name FROM ${tbl_subcategory}`);
    },
    singlesubcategory : function(id){
        return db.load(`SELECT idsubcategory,name FROM ${tbl_subcategory} WHERE idsubcategory = ${id}`);
    }
};