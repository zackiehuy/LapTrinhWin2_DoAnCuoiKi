const db = require('../utils/db');

const tbl_newspaper = 'newspaper';

module.exports = {
    allmostview : function(id){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory WHERE status = 2 ORDER BY n.views DESC LIMIT ${id},5`);
    },
    allnews : function(id){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory WHERE status = 2 ORDER BY n.date DESC LIMIT ${id},5`);
    },
    hotnews : function(){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on 
        n.idmaincategory = mc.idmaincategory WHERE DATEDIFF(date,DATE_SUB(CURDATE(),INTERVAL '7' DAY)) < 7 
        AND n.status = 2 ORDER BY n.views DESC LIMIT 0,4`)
    },
    singlecategory: function(id){
        return db.load(`SELECT title,date,image,nc.name FROM ${tbl_newspaper} as n join newssubcategory as nc on
        idmaincategory WHERE idsubcategory = ${id} AND WHERE status = 2`);
    },
    allmaincategory: function(id){
        return db.load(`SELECT title,date,image,name,date,abstract FROM ${tbl_newspaper} join maincategory on
        idmaincategory WHERE idmaincategory = ${id} AND WHERE status = 2`);
    },
    allsubcategory: function(id){
        return db.load(`SELECT n.title,n.date,n.image,sc.name,n.date,n.abstract FROM (${tbl_newspaper} as n join 
            newssubcategory as ns on n.idnews = ns.idnews)join subcategory as sc on sc.idsubcategory =
             ns.idsubcategory WHERE ns.idsubcategory = ${id} WHERE status = 2`);
    },
    alltag: function(id){
        return db.load(`SELECT n.title,n.date,n.image,sc.name,n.date,n.abstract FROM (${tbl_newspaper} as n join 
            newssubcategory as ns on n.idnews = ns.idnews)join subcategory as sc on sc.idsubcategory =
             ns.idsubcategory WHERE ns.idsubcategory = ${id} WHERE status = 2`);
    }
}