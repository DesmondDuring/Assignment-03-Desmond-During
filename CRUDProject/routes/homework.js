var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Homework = require('../model/homework');
const homework = require('../model/homework');


/* Read Operation --> Get route for displaying the Homeworks list */
router.get('/',async(req,res,next)=>{
    try{
        const HomeworkList = await Homework.find();
        res.render('homework/list',{
            title:'Get Started! Here\'s your Current Homework List', icon:'Add Below',
            HomeworkList:HomeworkList
        })}
        catch(err){
            console.error(err);
            res.render('homework/list',{
                error:'Error on the server'
            })
        }
        });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('homework/add',{
            title: 'Add Homework',icon:'Add Below',
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newHomework = Homework({
            "Subject":req.body.Subject,
            "Year":req.body.Year,
            "Description":req.body.Description,
        });
        Homework.create(newHomework).then(()=>{
            res.redirect('/homework');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const homeworkToEdit= await Homework.findById(id);
        res.render('homework/edit',
            {
                title:'Edit Homework',
                icon:'Add Below',
                Homework:homeworkToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedHomework = Homework({
            "_id":id,
            "Subject":req.body.Subject,
            "Year":req.body.Year,
            "Description":req.body.Description,
        });
        Homework.findByIdAndUpdate(id,updatedHomework).then(()=>{
            res.redirect('/homework')
        })
    }
    catch(err){
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Homework.deleteOne({_id:id}).then(()=>{
            res.redirect('/homework')
        })
    }
    catch(error){
        console.error(err);
        res.render('homework/list',{
            error:'Error on the server'
        })
    }
});


module.exports = router;
