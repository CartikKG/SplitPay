const express=require("express");
const connect=require("./config/db")
const usersControler=require('./routes/usersRoutes')
const groupRoutes=require('./routes/groupRoutes')
const config=require('./config/config')
const cors=require('cors')
const passport = require('passport');
const personalExpense= require('./routes/personalExpense')
const passportSetup = require('./controlers/passport');
const cookieSession = require("cookie-session");
const authRoute = require('./routes/auth')
const app=express();
app.use(express.json())
app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }));
// app.use(cors())
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:"GET,POST,PUT,DELETE",
        credentials:true
        
    })
    )
    app.use('/users',usersControler)
    app.use('/group',groupRoutes);
    app.use('/expense', personalExpense);
    app.use(passport.initialize());
    app.use(passport.session());
app.use('/auth',authRoute)
app.listen(config.PORT,async(req,res)=>{
    try {
        await connect();
        console.log(`Server Listening on port ${config.PORT}`);
    } catch (error) {
        console.log(error)
    }
})
