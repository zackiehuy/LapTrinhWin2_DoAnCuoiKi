const LRU = require('lru-cache');
const maincategoryModel = require('../models/maincategory.model');
const subcategoryModel = require('../models/subcategory.model');

const global_maincategory = 'globalmaincategory';
const global_subcategory = 'globalsubcategory';
const cache = new LRU({
    max:500,
    maxAge:1000 * 60
})

module.exports = function(app){
    app.use(async function(req,res,next){
        const data =cache.get(global_maincategory);
        if(!data){
            console.log('-- fetch `global_maincategory');
            const rows = await maincategoryModel.all();
            res.locals.lcMaincategory = rows;           
            cache.set(global_maincategory,rows);
        }
        else{
            console.log('++ cache hit for `global_maincategory');
            for(const c of data){
                delete c.isActive;
            }
            res.locals.lcMaincategory = data;
        }
        next();
    }),
    app.use(async function(req,res,next){
        const data =cache.get(global_subcategory);
        if(!data){
            console.log('-- fetch `global_subcategory');
            const subs = [];
            for(var i = 1 ; i <7 ;i++){ 
                const rowsubs = await subcategoryModel.allWithmain(i);
                subs.push(rowsubs);
            }            
            console.log(subs);
            res.locals.subCategory = subs;
            cache.set(global_subcategory,subs);
                  
        }
        else{
            console.log('++ cache hit for `global_subcategory');
            for(const c of data){
                delete c.isActive;
            }
            res.locals.lcMaincategory = data;
        }
        next();
    })
}