import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/travel-platform",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connection successful....."))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password:String,
    firstName: String,
    lastName:String
});

const userDetails = new mongoose.model("userDetails", userSchema);

let msg = new userDetails({
   username: "Sathvik",
    password:"Sathu@2003",
    firstName: "Sathvik",
    lastName:"Chowdari"
})

// msg.save().then((err, result) => {
//     if (err) {
//     console.error(err);
//   } else {
//     console.log('User saved successfully:', savedUser);
//   }
// }).catch(err => {
//     console.log(err);
// })
    
    const groupSchema = new mongoose.Schema({
    name: String,
        members: Number,
    description:String,
    comments:Array
    });

 export const groupDetails = new mongoose.model("groupDetails", groupSchema);
let msg1 = new groupDetails({
    name: 'backpackers',
    members: 2000,
        
        comments: ["very good"," hello","How are you"]
})
let msg2 = new groupDetails({
      name:'cheap-travel',
        members: 1500,
          comments: []
})
let msg3 = new groupDetails({
    name:'motor-travel',
        members: 3000,
          comments: []
})
//     msg1.save().then((err, result) => {
//     if (err) {
//     console.error(err);
//   } else {
//     console.log('User saved successfully:', savedUser);
//   }
// }).catch(err => {
//     console.log(err);
// })

//     msg2.save().then((err, result) => {
//     if (err) {
//     console.error(err);
//   } else {
//     console.log('User saved successfully:', savedUser);
//   }
// }).catch(err => {
//     console.log(err);
// })

//     msg3.save().then((err, result) => {
//     if (err) {
//     console.error(err);
//   } else {
//     console.log('User saved successfully:', savedUser);
//   }
// }).catch(err => {
//     console.log(err);
// })


const profileSchema = new mongoose.Schema({
    name: String,
    followers: Number,
    following:Number,
    bio:String,
    email: String,
    groupsJoined:Array
    });

export const profileDetails = new mongoose.model("profileDetails", profileSchema);


let msg5 = new profileDetails({
    name: 'Sathvik',
    followers:2587,
    following:45,
    bio: "enthusiast toward travel",
    email: "sathu.puligundla@gmail.com",
    groupsJoined:[]
    
})
//     msg5.save().then((err, result) => {
//     if (err) {
//     console.error(err);
//   } else {
//     console.log('User saved successfully:', savedUser);
//   }
// }).catch(err => {
//     console.log(err);
// })

export default userDetails;