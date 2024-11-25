var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Homework = require('../model/homework');


// Gets the route for displaying the Homework
router.get('/',async(req,res,next)=>{
    try{
        const HomeworkList = await Homework.find();
        res.render('homework/list',{
            title:'Get Started! Here\'s your Current Homework List', icon:'Add Listings Below',
            HomeworkList:HomeworkList
        })}
        catch(err){
            console.error(err);
            res.render('homework/list',{
                error:'Error on the server'
            })
        }
        });
// Gets the route for displaying the homework/add page
router.get('/add',async(req,res,next)=>{
    try{
        res.render('homework/add',{
            title: 'Add Homework',icon:'Add Values Below',
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
// Posts the route for processing the homework/add page
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
// Gets the route for displaying the homework/edit page
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const homeworkToEdit= await Homework.findById(id);
        res.render('homework/edit',
            {
                title:'Edit Homework',
                icon:'Edit Values Below',
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
// Posts the route for processing the homework/edit page  
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
// Gets the route to perform the delete operation 
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
