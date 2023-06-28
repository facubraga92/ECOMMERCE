const express=require('express')
const Products = require('../models/Products')
const productsRouter=express.Router()

productsRouter.get('/',(req,res)=>{
    Products.findAll()
.then((data)=>res.status(200).send(data))
.catch((err)=>console.log(err))
})

productsRouter.get('/:id',(req,res,next)=>{
    const {id}=req.params
    Products.findByPk(id)
    .then((data)=>{ if (!data) {
        var error = new Error("product was not found!");
        error.status = 404;
        throw error;
      }
      res.status(200).send(article);
    })
    .catch(next)}
)

module.exports=productsRouter;