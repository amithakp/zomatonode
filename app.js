var express = require('express');
var app = express(); //object created for express
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongourl = process.env.MongoLiveUrl;
var cors =require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 8124;
//const mongoUrl = process.env.MongoLocalUrl;
//var mgurl ="mongodb://localhost:27017";


//save the db connection
var db;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//first default route
app.get('/',(req,res) => {
    res.send("Hello From Express");
}) 
//return all the city
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

//return all mealtypes
app.get('/mealType',(req,res) => {
    db.collection('mealType').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

//return all restaurants
/*app.get('/restaurant',(req,res) => {
    db.collection('restaurants').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})*/


// restaurant wrt to id
app.get('/restaurant/:id',(req,res) => {
    var id = parseInt(req.params.id);
    db.collection('restaurants').find({"restaurant_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result); 
    })
})

// query params example
/// restaurants  >>>all rst -------- restaurants?city=2 >>>rst wrt to city_name
app.get('/restaurants',(req,res) => {
    var query = {};
    if(req.query.city){
        query = {state_id:Number(req.query.city)}
    }
    db.collection('restaurants').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})


//rest wrt to mealId
app.get('/filter/:mealId',(req,res) => {
    var id =parseInt(req.params.mealId);
    var sort ={cost:1}
    var skip = 0;
    var limit = 1000000000000
    var query={"mealTypes.mealtype_id":id};
    if(req.query.sortKey){
        var sortKey = req.query.sortKey
        if(sortKey>1 || sortKey<-1 || sortKey==0){
            sortKey=1
        }
        sort = {cost: Number(sortKey)}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }

    if(req.query.lcost && req.query.hcost){
        var lcost = Number(req.query.lcost);
        var hcost = Number(req.query.hcost);
    }

    if(req.query.cuisine && req.query.lcost && req.query.hcost){
        query = {$and:[{cost:{$gt:lcost,$lt:hcost}}],
                "cuisines.cuisine_id":Number(req.query.cuisine),
                "mealTypes.mealtype_id":id}
    }
    else if(req.query.cuisine){
        query = {"mealTypes.mealtype_id":id,"cuisines.cuisine_id":Number(req.query.cuisine)}
        //query = {"mealTypes.mealtype_id":id,"cuisines.cuisine_id":{$in:[2,5]}}
    }else if(req.query.lcost && req.query.hcost){
        query = {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":id};
    }
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})



// return all the menu
app.get('/menu/:restid',(req,res) => {
    var restid = Number(req.params.restid)
    db.collection('menu').find({restaurant_id:restid}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/menuItem',(req,res) => {
    console.log(req.body);
    db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

//update order with pymnt 
app.put('/updateStatus/:id',(req,res) =>{
    var id = Number(req.params.id);
    var status = req.body.status?req.body.status:"Pending"
    db.collection('orders').updateOne(
        {id:id},
        {
            $set:{
                "date":req.body.date,
                "bank_status":req.body.bank_status,
                "bank":req.body.bank,
                "status":status
            }
        }
    )
    res.send("data updated")
})
//return all orders
app.get('/orders',(req,res) => {
    var query = req.query.email;
    db.collection('orders').find({email:query}).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

/* //return orders by post call
app.post('/orders1',(req,res) => {
    db.collection('orders').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})
*/

//insert into order table
app.post('/placeOrder',(req,res)=>{
    console.log(req.body);
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("order placed");
    })
})

 //delete all orders
app.delete('/deleteOrder',(req,res)=>{
    db.collection('orders').remove({},(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
// app.post(newFunction(),(req,res) => {
//     console.log(req.body);
//     db.collection('orders').insert(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send("order placed")
//     res.send(req.body)
//     })
// })
//connnecting with mongodb
MongoClient.connect(mongourl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('augintern');
    app.listen(port,() => {
        console.log(`Listen to port ${port}`);
    })
})


