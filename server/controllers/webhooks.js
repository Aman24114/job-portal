import { Webhook } from "svix";
import User from "../models/User.js";
// Api Contorller Function to manage clerk User With databasec
export  const  clerkWebhooks = async(req,res)=>
{
 try
 { 
    // create a svis instance with celrk webhook secret 
   const whook = new  Webhook(process.env.CLERK_WEBHOOK_SECRET)
   // verifying the header used and 
   await  whook.verify(JSON.stringify(req.body),{
    "svix-id":req.headers["svix-id"],
    "svix-signature":req.headers["svix-signature"],
    "svix-timestamp":req.headers["svix-timestamp"],
   })
   // getting dtata from req body
   const {data,type}=req.body;
   // switch case for different cases
   switch(type)
   {
    case 'user.created':
        {
           const userData = {
            _id:data.id,
            email:data.email_address[0].email_address,
            name: data.first_name + " " + data.last_name,
            image: data.image_url,
            resume: ''
           }
           await User.create(userData)
           res.json({})
           break;
        }
        case 'user.updated':
        {
            const userData = {
                email:data.email_address[0].email_address,
                name: data.first_name + " " + data.last_name,
                image: data.image_url,
               }
               await User.findByIdAndUpdate(data.id,userData)
               res.json({})
               break;
        }
        case 'user.deleted':
        {
          await User.findByIdAndDelete(data.id)
          res.json({})
          break;
        }
        default:
        break;
   }   
 }
 catch(error)
 {
  console.log(error.message);
  res.json({success:false,message})   
 }
}
