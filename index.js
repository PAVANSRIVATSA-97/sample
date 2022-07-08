var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")


const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrLParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connected to database"));

app.post("/signup",(req,res)=>{
    var email=req.body.email;
    var password=req.body.psw;
    var repeatpassword=req.body['psw-repeat'];
    if(password != repeatpassword){
        return res.status(404).send("Passwords do not match")
    }

    var data={
        "email":email,
        "password":password,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
          throw err;  
        }
        console.log("Record inserted Succesfully");
    });

    return res.redirect('home.html')
})
app.get("/", (req,res) =>{
    res.set({
       "Allow-access-Allow-Origin" :'*'

    })
    return res.redirect('index.html');
}).listen(3000);

app.post('/login', (req, res)=>{
    username = req.body.username
    password = req.body.userpassword
    data = {
        "email":username,
        "password":password,
    }
    let v = db.collection('users').find(data).toArray().then((data, err)=>{
        if(err || data.length == 0) return res.status(404).send("Not a registered user")
        else return res.redirect('home.html')
    })
})

console.log("listening on port 3000")