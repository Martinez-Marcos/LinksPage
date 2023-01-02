
const express = require('express');
const router = express.Router();
const pool = require('../datebase');
const { selectFields } = require('express-validator/src/select-fields');
const { exit } = require('process');

router.get('/add', (req, res) => {
    pool.query(`SELECT * FROM grs`,(err,results)=>{
        res.render('links/add.hbs',{results});
    })
})

router.post('/add', (req, res) =>{
    const {link, group, title, description} = req.body;
    const newLink = {
        link,
        group,
        title,
        description
    } 
    
    pool.query(`SELECT * FROM grs`,(err,results)=>{
        let exist=false;
        let i=0;
        do{
            
            if (results[i].title==newLink.group) exist=true; newLink.group = results[i].id;
            i++
        }while(!exist||i!=results.length)
        if (exist){ 
            pool.query(`INSERT INTO links (url,title,description,grs_id) VALUE ("${newLink.link}", "${newLink.title}", "${newLink.description ?? null}","${newLink.group}")`,
            (err,result)=>{
                console.log(err,";",result);
                res.redirect(`/links/`);
            }) 
        }else{
            pool.query(`INSERT INTO grs (title,description) VALUE ('${title}')`,(err,results)=>{
                pool.query(`INSERT INTO links set ? (url,title,description,grs_id) VALUE ('${newLink.link}', '${newLink.title}', '${newLink.description ?? null}',${newLink.group})`,
                (err,results)=>{
                res.redirect(`/links/`);
                });
            })
        }
    })  
    
})

router.get(`/`,(req,res)=>{
    pool.query(`SELECT * FROM links;`,(err,result)=>{
        res.render(`links/links`,{result});
    });
    
    /*
})
    .then (()=>{
        res.render(`links/links`, [links]);
    })
    .catch((err)=>{
        console.log(err);
    })*/
    
})
module.exports = router;