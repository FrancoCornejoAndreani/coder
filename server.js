const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://fcornejo1:cornejo1@cluster0.6du1jlj.mongodb.net/?retryWrites=true&w=majority", mongoOptions}),
        secret: "coder",
        resave: false,
        saveUninitialized: false,
        rolling: true, //con eso reiniciamos el tiempo de expiracion con cada request
        cookie: {
            maxAge: 90000
        }
})
)

function authMid(req, res, next) {
    if(req.session.username){
        next();
    }else{
        res.redirect("/login");
    }
}

function loginMiddleware(req, res, next){
    if(req.session.username){
        res.redirect('/');
    }else {
        next();
    }
}

app.get("/", authMid, (req, res) => {
    
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/login', loginMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "./public/login.html"));
})

app.get("/api/login", async (req, res) =>{
    try{
        req.session.username = req.query.username;
        //document.querySelector("#bodyHtml").innerHTML = `<h1>Bienvenido ${req.session.username}</h1>`
        res.redirect("/");
    }catch(err){
        req.json({ error: true, message: err})
    }
})

app.listen(3000, () => {
    console.log("Servidor ejecutando puerto 3000")
})