const db = require('../utils/db');

module.exports = {
    listaccept : function(id){
        return db.load(`SELECT tittle,abstract as ab,content,name,idmaincategory FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and (n.status = 1 or n.status = 2)`);
    },
    listrefuse : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,name,reason,idmaincategory FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and n.status = 3`);
    },
    listwait : function(id){
        return db.load(`SELECT idnews,tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc on 
    n.idmaincategory = mc.idmaincategory WHERE n.writter = ${id} and n.status = 4`);
    },
    allcategory : function(){
        return db.load(`SELECT idmaincategory,name FROM maincategory`);
    },
    single : function(id){
        return db.load(`SELECT tittle,abstract as ab,content,name FROM newspaper as n join maincategory as mc on 
        n.idmaincategory = mc.idmaincategory WHERE n.idnews = ${id} and (n.status = 4 n.status = 3)`);
    },
    singletag : function(id){
        return db.load(`SELECT name,idtag FROM tag WHERE idnews = ${id}`)
    },
    addnews : function(entity){
        return db.add('newspaper' , entity);
    },
    addtagnews : function(entity){
        return db.add('tag',entity);
    },
    singletittle : function(tittle){
        return db.load(`SELECT idnews FROM newspaper WHERE tittle = ${tittle}`);
    },
    patch: function (entity) {
        const condition = {
          idnews: entity.idnews
        }
        delete entity.idnews;
        return db.patch('newspaper', entity, condition);
      },
    del: function (id) {
        const condition = {
          idnews: id
        }
        return db.del('newspaper', condition);
    }
}