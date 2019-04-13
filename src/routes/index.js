const express = require('express')
const app = express()
const path= require('path')
const hbs = require('hbs')
const Estudinate =require('./../models/estudiante.js')
const Cursos =require('./../models/cursos.js')
const Inscrito =require('./../models/inscritos.js')
const bcrypt = require('bcrypt');
const session = require('express-session')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')

require('./../helpers/helpers');

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (req, res)=>{

	Cursos.find({estado:true}).exec((err, resultados)=>{
		if(err){
			return console.log(err);
		}
		//console.log(resultados);
		res.render('index',{
			listadodisponible : resultados,
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
 			
		})
	})

	
});
 

app.get('/crearUsuario', (req, res)=>{

	

	res.render('crearUsuario', {
		titulo: 'Inicio',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
});

app.get('/salir', (req, res)=>{
	req.session.destroy((err)=> {
  res.render('index', {
		titulo: 'Inicio',
		sesion : false,
 		nombre:''
	})
})
	
});


// leer registros
app.get('/vernotas', (req, res)=>{
	Estudinate.find({}).exec((err, respuesta)=>{
		if(err){
			return console.log(err)
		}
	
	res.render('vernotas', {
		listado: respuesta,
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
})
});

//Actualizar rgistors
//
app.get('/actualizar', (req, res)=>{
	Estudinate.findById(req.session.usuario,  (err, usuario)=> {
		if(err){
			return console.log(err)
		}
		res.render('actualizar',{			
			nombre : usuario.nombre,
 			documento : usuario.documento,
 			correo : usuario.correo,
 			telefono : usuario.telefono,
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
		})
	});
	
}); 


app.post('/eliminar', (req, res)=>{
	Estudinate.findOneAndDelete({documento:req.body.documento}, req.body,  (err, resultados)=>{
		if(err){
			return console.log(err);
		}
		res.render('eliminar',{
			nombre : resultados.nombre,
 			mensaje:'<div class="alert alert-danger" role="alert"> Eliminado Correctamente</div>',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
		})
	})
	
}); 

// Ingresar con logien

 app.post('/ingresar', (req, res)=>{
 	

	Estudinate.findOne({documento: req.body.documento}, (err, resultados)=>{
		if(err){
			return console.log(err);
		}
		if(!resultados){
		return res.render('ingresar',{
 			mensaje:'<div class="alert alert-warning" role="alert">Usuario no encontrado</div>',
		})
		}

		if(!bcrypt.compareSync(req.body.password, resultados.password)){
			return res.render('ingresar',{
 			mensaje:'<div class="alert alert-danger" role="alert">Contaseña incorrecta</div>',
		})
		}
			req.session.usuario=resultados._id;
			req.session.nombre=resultados.nombre;
			req.session.documento=resultados.documento;
			if(resultados.tipo=='administrador'){
			req.session.tipo=true
		} else{
			req.session.tipo=false
		}
		

			//console.log(req.session);
		res.render('ingresar',{
 			mensaje:'<div class="alert alert-success" role="alert"> Ingresa Exitorso Bienvenido '+ resultados.nombre+'</div>',
 			sesion : true,
 			nombre:req.session.nombre,
 			tipo:req.session.tipo,
 			documento:req.session.documento
		})
	})
	
}); 


// Actualizar registro
app.post('/actualizar', (req, res)=>{
	Estudinate.findOneAndUpdate({documento:req.body.documento}, req.body, {new:true}, (err, resultados)=>{
		if(err){
			return console.log(err);
		}
		res.render('actualizar',{
			nombre : resultados.nombre,
 			documento : resultados.documento,
 			correo : resultados.correo,
 			telefono : resultados.telefono,
 			mensaje:'<div class="alert alert-success" role="alert"> Actualizado Correctamente</div>',
		})
	})
	
}); 

// app.post('/', (req, res)=>{
// 	req.session.usuaeio = req.body.usuario
// 	res.render('indexpost', {
// 		titulo: 'Inicio',
// 		sesion: sesion
// 	})
// });
// 

app.post('/actualizar', (req, res)=>{
	Estudinate.findOneAndUpdate({documento:req.body.documento}, req.body, {new:true}, (err, resultados)=>{
		if(err){
			return console.log(err);
		}
		res.render('actualizar',{
			nombre : resultados.nombre,
 			documento : resultados.documento,
 			correo : resultados.correo,
 			telefono : resultados.telefono,
 			mensaje:'<div class="alert alert-success" role="alert"> Actualizado Correctamente</div>',
		})
	})
	
}); 


  
 app.post('/', (req, res)=>{
 	let tipop="no entro";
 		Estudinate.findOne({tipo : "administrador"}, (err, result)=>{
		if(err){
			return console.log(err)
		}
		try {


		if(result.tipo!='administrador'){
			tipop="administrador";
		} else {
			tipop="aspirante";
		}
		console.log(tipop);
		}
		catch(error){
			tipop="administrador";
		}
		
	});

 	let estudiante=new Estudinate ({
 		nombre : req.body.nombre,
 		documento : req.body.documento,
 		correo : req.body.correo,
 		telefono : req.body.telefono,
 		tipo : tipop,
 		password : bcrypt.hashSync(req.body.password, 10),

 	}) 

 	estudiante.save( (err, resultado)=>{
 		if(err){
 			res.render('indexpost', {
			mostrar: err
			})
 		}
 		res.render('indexpost', {
		mostrar: '<div class="alert alert-success" role="alert">  Registro creado con exito <br> <h1>Bienvenido  </h1></div>'  //aqui podemos enviar cualquier recultado
	})
 	})
});





//-------------------------------cursos ----------------------------------------------------------------------

app.get('/crearcurso', (req, res)=>{
	res.render('crearcurso', {
		titulo: 'Inicio',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
});

app.post('/crearcurso', (req, res)=>{
 	let curso=new Cursos ({
 		nombre : req.body.nombre,
 		idcurso : req.body.idcurso,
 		descripcion : req.body.descripcion,
 		valor : req.body.valor,
 		modalidad : req.body.modalidad,
 		intencidad : req.body.intencidad,
 		estado : true
 		

 	})

 	curso.save( (err, resultado)=>{
 		if(err){
 			res.render('crearcurso', {
			mensaje: err
			})
 		}
 		console.log(resultado);
 		res.render('crearcurso', {
		mensaje: '<div class="alert alert-success" role="alert">  Registro creado con exito</div>',  //aqui podemos enviar cualquier recultado
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
 	})
});

app.post('/eliminarcurso', (req, res)=>{
	Cursos.findOneAndDelete({idcurso:req.body.idcurso}, req.body,  (err, resultados)=>{
		if(err){
			return console.log(err);
		}
		res.render('eliminar',{
			nombre : resultados.nombre,
 			mensaje:'<div class="alert alert-danger" role="alert"> Eliminado Correctamente</div>',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
		})
	})
	
}); 

// leer registros
app.get('/vercursos', (req, res)=>{
	Cursos.find({}).exec((err, respuesta)=>{
		if(err){
			return console.log(err)
		}
	
	res.render('vercursos', { 
		listadocursos: respuesta,
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
})
});

app.get('/inscribir', (req, res)=>{
	Cursos.find({}).exec((err, respuesta)=>{
		if(err){
			return console.log(err)
		}
	
	res.render('inscribir', {
		titulo: 'Inscribirse a un curso',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento,
			nombre:req.session.documento,
		listadoselect:respuesta
	})
})
	
});

app.get('/verinscritos', (req, res)=>{
	Inscrito.find({}).exec((err, respuesta)=>{
		if(err){
			return console.log(err)
		}
	
	res.render('verinscritos', {
		titulo: 'Listado',
		listadoinscritos:respuesta,
		Curso:Cursos,
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
})
	
});

app.post('/inscribir', (req, res)=>{
 	let inscrito=new Inscrito ({
 		idcurso : req.body.idcurso,
 		documento : req.body.documento,
 		iddocumento : req.body.idcurso+'-'+req.body.documento
 		})

 	// Inscrito.find({iddocumento:req.body.idcurso+'-'+req.body.documento}).exec((err, respuesta)=>{
	

			inscrito.save( (err, resultado)=>{
 		if(err){
 			res.render('inscribirpost', {
			mensaje: '<div class="alert alert-danger" role="alert"> Ya se encuentra registrado en la base de datos</div>' 
			})
 		}
 		
 		res.render('inscribirpost', {
		mensaje: '<div class="alert alert-success" role="alert">  Registro creado con exito</div>',
 			sesion : res.locals.sesion,
 			tipo:req.session.tipo,
 			documento:req.session.documento
	})
 		
	})
 	
});




app.get('*', (req, res)=>{
	res.render('error', {
		titulo: 'Error 404',
	})
}); 



module.exports=app