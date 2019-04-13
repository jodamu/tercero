require('./config/config.js');
const express = require('express');
const app = express()
const path= require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

// paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname, "../node_modules")

//Static
app.use(express.static(dirPublic))
app.use('/js',express.static(dirNode_modules + '/jquery/dist'));
app.use('/js',express.static(dirNode_modules + '/popper.js/dist'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next)=>{
	if(req.session.usuario){
		res.locals.sesion=true
		res.locals.nombre=req.session.nombre
		res.locals.documento=req.session.documento
		if(req.session.tipo=='administrador'){
			res.locals.tipo=true
		} else{
			res.locals.tipo=false
		}
		
	}
	next()
});

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Router
app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/entrega_tres', {useNewUrlParser: true}, (err, resultado)=>{
	if (err){
		return console.log(err);
	}
	console.log("conectado...");
});

app.listen(process.env.PORT, ()=>{
	console.log('servidor en el puerto '+ process.env.PORT)
});
