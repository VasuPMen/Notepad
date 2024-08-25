// dynamic route 
// how to take data from fronted
//parser

const express = require("express")
const path = require("path")
const fs = require("fs")

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page
app.get('/', (req, res) => {
  fs.readdir('./files',(error,files)=>{
    res.render('index',{file:files});
  })
});

app.post('/create', (req, res) => {
  console.log(req.body);
   fs.writeFile(`./files/${req.body.title.split(" ").join("") + ".txt"}`,req.body.detail,(err)=>{
    // console.log(err);
    res.redirect('/');
  })
});
app.listen(3000)

app.get('/file/:filename',(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
  res.render("check",{filename:req.params.filename , filedata:filedata})
  })
})
 

app.post('/delete/:filename', (req, res) => {
  const filename  =  req.params.filename;
  fs.unlink(`./files/${filename}`, (err) => {
    res.redirect('/');
  });
});


//dynamic route
// koini agad : hoy te params 
//profile/vau
//profile/harsh
app.get("/profile/:name",(req,res)=>{
  res.send(`hello ${req.params.name}`);
})
// app.post("/login"),(req,res)=>{
//   console.log(req.params.name);
// }

//current folder path __dirname
//+public karta public ee ave
//join karva join vapray
// console.log(__dirname);

