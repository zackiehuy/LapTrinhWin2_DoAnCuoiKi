const db = require('../utils/db');

module.exports = {
    all : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc
        on n.idmaincategory = mc.idmaincategory WHERE n.idmaincategory = ${id} and n.status = 4 and n.statusnews = 0`);
    },
    single : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,n.idmaincategory,name FROM newspaper as n 
        join maincategory as mc on n.idmaincategory = mc.idmaincategory WHERE n.idnews = ${id} and 
        n.status = 4 and n.statusnews = 0`);
    },
    subcategory : function(){
        return db.load(`SELECT idsubcategory,name as names FROM subcategory WHERE status = 0`);
    },
    maincategory : function(id){
        return db.load(`SELECT idmaincategory,name FROM maincategory WHERE status = 0 and idmaincategory != ${id}`);
    },
    tag : function(id){
        return db.load(`SELECT idtag,name FROM tag WHERE status = 0 and idnews = ${id}`);
    },
    singlecategory : function(id){
        return db.load(`SELECT idmaincategory,name FROM maincategory WHERE status = 0 and idmaincategory = ${id}`);
    }
}