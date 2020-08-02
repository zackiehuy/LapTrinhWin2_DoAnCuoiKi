const db = require('../utils/db');

module.exports = {
    all : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc
        on n.idmaincategory = mc.idmaincategory WHERE n.idmaincategory = ${id} and n.status = 4`);
    },
    single : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,n.idmaincategory,name FROM newspaper as n 
        join maincategory as mc on n.idmaincategory = mc.idmaincategory WHERE n.idnews = ${id} and 
        n.status = 4`);
    },
    subcategory : function(id){
        return db.load(`SELECT idsubcategory,name FROM subcategory`);
    }
}