import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';

dotenv.config();
const app= express();
// middlewares
app.use(cors())
app.use(express.json());
// connnect to db
await connectDB()
app.get('/',(req,res)=>res.send("Api Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
app.post('/webhooks',clerkWebhooks)
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT,()=>
{
    console.log(`server is runnnng on ${PORT}`);
})
