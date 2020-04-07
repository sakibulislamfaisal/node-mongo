const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

//set username and password protectively
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const uri = process.env.DB_PATH;

//down line set or upper uri set (same jinis)
// const uri = `mongodb+srv://${username}:${password}@cluster0-mbeyh.mongodb.net/test?retryWrites=true&w=majority`;

//Create a connection with MongoClient
let client = new MongoClient(uri, { useNewUrlParser: true });




const users = ['faisal' , 'sumon' , 'lutfor', 'sakib' , 'nitu'];


//Limit and Filter method Apply 
// app.get('/products',(req,res) =>{
//      client = new MongoClient(uri, { useNewUrlParser: true });
//      client.connect(err => {
//           const collection = client.db("onlineStore").collection("products");
//           collection.find({name:'mobile'}).limit(5).toArray((err, document) =>{
                 //console.log('Inserted Products successfully..', res);
                                  //res.send(product);
//                 if(err){
//                       console.log(err);
//                       res.status(500).send({message:err});
//                 }
//                 else{
//                       res.send(document);
//                 }
//           })
//           console.log('Database connected..');
//             client.close();
          
//         });
//  })

// app.get('/',(req,res) =>{
//     res.send('Thank You very faisal rahman');
//      const person = {
//            name : 'faisal rahman',
//            age : 20
//      }
//      res.send(person);
// })


app.get('/products',(req,res) =>{
     client = new MongoClient(uri, { useNewUrlParser: true });
     client.connect(err => {
          const collection = client.db("onlineStore").collection("products");
          collection.find().toArray((err, document) =>{
                // console.log('Inserted Products successfully..', res);
                 //  res.send(product);
                if(err){
                      console.log(err);
                      res.status(500).send({message:err});
                }
                else{
                      res.send(document);
                }
          })
           // console.log('Database connected..');
            client.close();
          
        });
 })

app.get('/products/:key', (req,res) =>{
      const key = req.params.key;
      client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
           const collection = client.db("onlineStore").collection("products");
           collection.find({key}).toArray((err, document) =>{
                 // console.log('Inserted Products successfully..', res);
                  //  res.send(product);
                 if(err){
                       console.log(err);
                       res.status(500).send({message:err});
                 }
                 else{
                       res.send(document[0]);
                 }
           })
            // console.log('Database connected..');
             client.close();
           
         });
})

///get multiples values by id using mongodb database


app.post('/getProductsByKey', (req,res) =>{
      const key = req.params.key;
      const productKey = req.body;
      console.log(productKey);
      client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
           const collection = client.db("onlineStore").collection("products");
           collection.find({key: {$in : productKey}}).toArray((err, document) =>{
                 // console.log('Inserted Products successfully..', res);
                  //  res.send(product);
                 if(err){
                       console.log(err);
                       res.status(500).send({message:err});
                 }
                 else{
                       res.send(document);
                 }
           })
            // console.log('Database connected..');
             client.close();
           
         });
})

//get value 
app.get('/banana/fruits' , (req ,res) =>{
      res.send({fruits : 'apple' , quantity : 200});
})

// app.get('/users/:id' , (req, res) =>{
//       //console.log(req.params.id);
//       console.log(req.query);
//       const id = req.params.id ;
//       const name = users[id];
//      // console.log(name , id);
//      res.send({id , name});

// })
//post request 

// app.post('/adduser' , (req,res) =>{
//       console.log(req.body);
// })

// Post data form website

// app.post('/adduser', (req,res) =>{
//       console.log(req.body);
//       const name = req.body ;
//       name.id = 22;
     // res.send( name);
// })


///Database related 

app.post('/addProducts',(req,res) =>{
       const product = req.body;
       client = new MongoClient(uri, { useNewUrlParser: true });
       client.connect(err => {
          const collection = client.db("onlineStore").collection("products");
          collection.insert(product, (err, result) =>{
                 //console.log('Inserted Products successfully..', res);
                //res.send(product);
                if(err){
                      console.log(err);
                      res.status(500).send({message:err});
                }
                else{
                      res.send(result.ops[0]);
                }
          })
          //console.log('Database connected..');
          client.close();
          
        });
        
})


//placed order api


app.post('/orderPlaced',(req,res) =>{
      const orderDetails = req.body;
      orderDetails.orderTime = new Date();
      console.log(orderDetails);
      client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
         const collection = client.db("onlineStore").collection("orders");
         collection.insertOne(orderDetails, (err, result) =>{
                //console.log('Inserted Products successfully..', res);
               //res.send(product);
               if(err){
                     console.log(err);
                     res.status(500).send({message:err});
               }
               else{
                     res.send(result.ops[0]);
               }
         })
         //console.log('Database connected..');
         client.close();
         
       });
       
})




const port = process.env.PORT || 4200;
app.listen(port , () => console.log('Running on the 4200 port'));