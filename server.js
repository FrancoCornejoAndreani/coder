const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
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
    if(!req.session.user){
        res.redirect("/login");
    }else{
        next();
    }
}

function loginMiddleware(req, res, next){
    if(req.session.user){
        res.redirect('/');
    }else {
        next();
    }
}

app.get("/", authMid, (req, res) => {
    res.sendFile(path.join(__dirname, "./public","index.html"));
})

app.get('/login', loginMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "/login.html"));
})

app.get('/logout', authMid,(req, res)=>{
    let user= req.session.user
    req.session.destroy(err=>{
      if(err){
        console.log('error en el Logout:', err)
      }else{
        res.send(`<h1>Hasta luego ${user}</h1>
        <script type="text/javascript">
        setTimeout(function(){ location.href = '/login'},2000)
        </script>`)
      }
    })
})

app.post('/process-login',(req, res)=>{
    req.session.user = req.body.username
    res.redirect('/')
})
app.get('/usuario',(req, res)=>{
    res.json({username : req.session.user})
})

app.listen(8080, () => {
    console.log("Servidor ejecutando puerto 8080")
})