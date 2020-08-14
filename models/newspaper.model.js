const db = require('../utils/db');

const tbl_newspaper = 'newspaper';

module.exports = {
    allmostview : function(id){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory WHERE n.status = 2 ORDER BY n.views DESC LIMIT ${id},5`);
    },
    allnews : function(id){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory WHERE n.status = 2 ORDER BY n.date DESC LIMIT ${id},5`);
    },
    hotnews : function(){
        return db.load(`SELECT n.idnews as idnews,mc.idmaincategory as idmain ,n.tittle as tittle,n.date as date
        ,n.image as image,mc.name as name FROM ${tbl_newspaper} as n join maincategory as mc on 
        n.idmaincategory = mc.idmaincategory WHERE DATEDIFF(date,DATE_SUB(CURDATE(),INTERVAL '7' DAY)) < 7 
        AND n.status = 2 ORDER BY n.views DESC LIMIT 0,4`)
    },
    singlecategory: function(id){
        return db.load(`SELECT title,date,image,nc.name FROM ${tbl_newspaper} as n join newssubcategory as nc on
        idmaincategory WHERE idsubcategory = ${id} AND WHERE n.status = 2`);
    },
    allmaincategory: function(id){
        return db.load(`SELECT idnews,tittle,date,image,name,date,abstract,n.idmaincategory as idmaincategory FROM ${tbl_newspaper} as n join maincategory as mc on
        n.idmaincategory = mc.idmaincategory WHERE n.idmaincategory = ${id} AND n.status = 2`);
    },
    allsubcategory: function(id){
        return db.load(`SELECT * FROM newssubcategory WHERE idsubcategory = ${id}`);
    },
    alltag: function(id){
        return db.load(`SELECT * FROM tag WHERE name = '${id}'`);
    },
    singlenews: function(id){
        return db.load(`SELECT *,n.idmaincategory as idmain FROM ${tbl_newspaper} as n JOIN maincategory as mc ON n.idmaincategory = mc.idmaincategory
        WHERE ${id} = n.idnews AND n.status = 2`);
    },
    singletags: function(id){
        return db.load(`SELECT * FROM tag WHERE ${id} = idnews`);
    },
    singlesub: function(id){
        return db.load(`SELECT * FROM subcategory as sc JOIN newssubcategory as nsc ON 
        sc.idsubcategory = nsc.idsubcategory WHERE ${id} = nsc.idnews`);
    },
    fulltexttittle: function(id){
        return db.load(`SELECT * FROM newspaper WHERE MATCH(tittle) AGAINST('${id}' IN NATURAL LANGUAGE MODE)`);
    },
    fulltexcontent: function(id){
        return db.load(`SELECT * FROM newspaper WHERE MATCH(content) AGAINST('${id}' IN NATURAL LANGUAGE MODE)`);
    },
    fulltextabstract: function(id){
        return db.load(`SELECT * FROM newspaper WHERE MATCH(abstract) AGAINST('${id}' IN NATURAL LANGUAGE MODE)`);
    },
    comment : function(id){
        return db.load(`SELECT *,n.idnews as idnews FROM comment as cm JOIN newspaper as n ON n.idnews = cm.idnews WHERE ${id} = idnews`);
    },
    newsrandom : function(id){
        return db.load(`SELECT * FROM newspaper WHERE idmaincategory = ${id} ORDER BY RAND() LIMIT 5`);
    },
    count : function(id){
        return db.load(`SELECT COUNT(idc) as count FROM comment WHERE idnews = ${id}`);
    },
    addcomment : function(entity){
        return db.add('comment',entity);
    }
}