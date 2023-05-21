import { MongoClient, ObjectId} from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

//http://localhost:4000/users
//POST method : create a user
app.post("/users",async (req,res) => {                 
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    let userdocument = req.body;
    const db = client.db("project");
    await db.collection("user").insertOne(userdocument);

    await client.close();
    res.json({ documentInserted : true});
});

//http://localhost:4000/users
//GET method :- all users from user collection 
app.get("/users",async (req,res) => {                 
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");
    let list = await db.collection("user").find().toArray();

    await client.close();
    res.json(list);
});

//http://localhost:4000/users/6468a3d2bfd30e0980beab1f
//GET method :- returns the users with the specified id 
app.get("/users/:id",async (req,res) => {                 
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");

    let id = new ObjectId(req.params.id);
    let user = await db.collection("user").findOne({_id : id});

    await client.close();
    res.json(user);
});

//http://localhost:4000/usersquery
//GET method:- returns the users with the id specified as query 
app.get("/usersquery/:id",async (req,res) => {            
    let user = {
        id: req.params.id,
        name :"Aniket Shinde",
        email : "aniket1998@gmail.com",
    };

    res.json(user);
});

//DELETE method :-
//http://localhost:4000/users/6468a555bfd30e0980beab21
app.delete("/users/:id",async (req,res) => {                 
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");

    let id = new ObjectId(req.params.id);
    await db.collection("user").deleteOne({_id : id});

    await client.close();
    res.json({ deleted : true});
});

app.listen(4000);