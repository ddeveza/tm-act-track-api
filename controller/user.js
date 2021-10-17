const UserDB = require('../model/user');

class User {
     //Fetch all users
     getUser =  async (req,res) => {
        await UserDB.find({},(err,result)=>{
            
            if (!err) {
                res.status(200).send(result);
            }else {
                res.status(404).json({
                    message:"Error Fetching Data"
                 });
            }
        }).sort({_id:-1}).clone();
     }
     //Create all users
     createUser =  async (req,res) => {
        const {name,hours,tag,activity,date} = req.body.dataApi;
        
        //Fetch data from the client....
        const user =await new UserDB({
            name: name,
            hours:hours,
            tag:tag,
            activity:activity,
            date:date
        });

        //save data in the database.....
        await user.save().then(result => {
            console.log(result)
            res.status(200).send(result);
        }).catch(err=>{
            console.log(err)
            res.status(404).json({
                message:"Error"
             });
        })

       
    }
    //Update user 
    updateUser =  async (req,res) => {
       console.log (req.body);
        const {_id ,name,hours,tag,activity,date} =await req.body.newRow;
        console.log(_id);
       await UserDB.findById(_id,async (err,updateFriendAge)=>{
            updateFriendAge.name = name;
            updateFriendAge.hours = hours;
            updateFriendAge.tag = tag;
            updateFriendAge.activity = activity;
            updateFriendAge.date = date;
            await updateFriendAge.save()
                                 .then(result => {
                                    res.status(200).json({
                                        message:"Updated"
                                     });
                                 })
                                 .catch(err =>{
                                    res.status(404).json({
                                        message:"Not Updated"
                                     });
                                 });
        })
       
    }
    //Delete user...
    deleteUser =  async (req,res) => {
      
       const id= req.body._id;
       
        await UserDB.deleteOne({_id:id})
                         .then(result => {
                            res.status(200).json({
                                message:"Deleted"
                             });

                         })
                         .catch(err=> {
                            res.status(404).json({
                                message:err.message
                             });
                         });
        
    }

}


const userController = new User() 
module.exports = userController;