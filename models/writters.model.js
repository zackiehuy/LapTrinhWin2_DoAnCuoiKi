const db = require('../utils/db');

module.exports = {
    listaccept : function(id){
        return db.load(`SELECT tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and (n.status = 1 or n.status = 2)`)
    },
    listrefuse : function(id){
        return db.load(`SELECT tittle,abstract as ab,content,name,reason FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and n.status = 3`)
    },
    listwait : function(id){
        return db.load(`SELECT tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and n.status = 4`)
    }
}