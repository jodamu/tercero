const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const cursoSchema=new Schema({
	idcurso: {
		type:Number,
		require: true,
		unique: true
	},
	nombre:{
		type: String,
		require: true
	},
	descripcion: {
		type: String,
		require: true
	},
	valor: {
		type: Number,
		require: true
	},
	modalidad: {
		type: String
	},
	intencidad: {
		type: Number
	},
	estado: {
		type: Boolean,
		default: true
	}

}); 

cursoSchema.plugin(uniqueValidator);


const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso