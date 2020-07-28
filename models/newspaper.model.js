const db = require('../utils/db');

const tbl_newspaper = 'newspaper';

module.exports = {
    allmostview : function(){
        return db.load(`SELECT title,date,image,name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory ODER BY views DESC LIMIT 10`);
    },
    allnews : function(){
        return db.load(`SELECT title,date,image,name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory ODER BY date DESC LIMIT 10`);
    },
    singlecategory: function(id){
        return db.load(`SELECT title,date,image,name FROM ${tbl_newspaper} as n join subcategory as nc on
        idmaincategory WHERE idsubcategory = ${id} `);
    },
    allmaincategory: function(id){
        return db.load(`SELECT title,date,image,name,date,abstract FROM ${tbl_newspaper} join maincategory on
        idmaincategory WHERE idmaincategory = ${id}`);
    },
    allsubcategory: function(id){
        return db.load(`SELECT n.title,n.date,n.image,sc.name,n.date,n.abstract FROM (${tbl_newspaper} as n join 
            newssubcategory as ns on n.idnews = ns.idnews)join subcategory as sc on sc.idsubcategory =
             ns.idsubcategory WHERE ns.idsubcategory = ${id}`);
    },
    alltag: function(id){
        return db.load(`SELECT n.title,n.date,n.image,sc.name,n.date,n.abstract FROM (${tbl_newspaper} as n join 
            newssubcategory as ns on n.idnews = ns.idnews)join subcategory as sc on sc.idsubcategory =
             ns.idsubcategory WHERE ns.idsubcategory = ${id}`);
    }
}