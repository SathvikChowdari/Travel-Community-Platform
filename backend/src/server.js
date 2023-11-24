import express from 'express';
import cors from 'cors';
import userDetails from './database.js';
import bodyParser from 'body-parser';
import { groupDetails } from './database.js';
import { profileDetails } from './database.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/login/:userName',  async (req, res) => {
    
    const { userName } = req.params;
    
   const data = req.body;
    console.log(data);
    
    
    var uname = req.body.uname;
    var pass = req.body.pass;
    
    const ans = await userDetails.findOne({ username: uname, password: pass });
    
    if (ans === null) {
        
        res.status(200).send({ data: false});
    }
    else{
        res.status(200).send({ data: true });
    }
   
    

})

app.post('/registration/:userName',  async (req, res) => {
    
    const { userName } = req.params;
    
   const data = req.body;
    console.log(data);
    
    
    var uname = req.body.uname;
    var pass = req.body.pass;
    var fname = req.body.fname;
    var lname = req.body.lname;
    
   
    
    let msg = new userDetails({
   username: uname,
    password:pass,
    firstName:fname,
    lastName:lname
})
   
    msg.save().then((err, result) => {
    if (err) {
    console.error(err);
  } else {
    console.log('User saved successfully:', savedUser);
  }
}).catch(err => {
    console.log(err);
})
    
    res.status(200).send({ data: true });
})


app.post('/group/list',  async (req, res) => {
    
 
    
   const data = req.body;
    console.log(data);
    
    
    var text = req.body.text;
    let details = [];
    await  groupDetails.find({ name: { $regex: text, $options: 'i' } }).then(users => {
            // console.log(users)
        details = users;
        }).catch(err => {
                console.log(err);
        })
    console.log(details);
    
        
        res.status(200).send(details);
    

        
    
   
})


app.post('/group/:groupName/comments', async (req, res) => {
     const { groupName } = req.params;
     const data = req.body;
    console.log(data);
    var text = req.body.text;
    
    const ans = await groupDetails.findOne({ name: groupName });
  const re=await groupDetails.updateOne({name:groupName},{$push:{comments:text}})
    console.log(ans.comments);

    res.status(200).send(ans.comments);

})


app.post('/group/registration/:userName',  async (req, res) => {
    
    const { userName } = req.params;
    
   const data = req.body;
    console.log(data);
    
    
    var uname = req.body.uname;
    var pass = req.body.description;
    
    
   
    
    let msg = new groupDetails({
   name: uname,
        description: pass,
        members: 0,
   comments:[]
})
   
    msg.save().then((err, result) => {
    if (err) {
    console.error(err);
  } else {
    console.log('User saved successfully:', savedUser);
  }
}).catch(err => {
    console.log(err);
})
    
    res.status(200).send({ data: true });
})


app.post('/profile/:username', async (req, res) => {
     const { username } = req.params;
    //  const data = req.body;
    // console.log(data);
    // var text = req.body.text;
    
    const ans = await profileDetails.findOne({ name: username });
  
    console.log(ans);

    res.status(200).send(ans);

})

app.post('/group/:username', async (req, res) => {
    const { username } = req.params;
    const groupName = req.body.groupName;
   
    const ans = await profileDetails.findOne({ name: username });
   
    const groupsJoined =await ans.groupsJoined
   
    const foundElement = groupsJoined.find((element) => element === groupName);
   
    if (foundElement === undefined) {
        res.status(200).send(false);
    }
    else {
     
        res.status(200).send(true);
    }
    
})

app.post('/group/:username/update', async (req, res) => {
   
    const { username } = req.params;
    const groupName = req.body.groupName;
    const re = await profileDetails.updateOne({ name: username }, { $push: { groupsJoined: groupName } })
    
    res.status(200).send({ data: true });
})


app.listen(8000, () => {
    console.log("server listening");
})