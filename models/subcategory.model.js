const db = require('../utils/db');

const tbl_subcategory = 'subcategory';

module.exports = {
    allWithmain : function(id){
        return db.load(`SELECT name as namesub FROM ${tbl_subcategory} WHERE idmaincategory = ${id}`);
    },
    singlewithnews: function(){
        return db.load(`SELECT name as namesub FROM ${tbl_subcategory} WHERE idmaincategory = ${id}`);
    }
}