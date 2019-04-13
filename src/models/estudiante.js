const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const estudianteSchema=new Schema({
	nombre: {
		type:String,
		require: true,
		trim: true,
		unique: true
	},
	password:{
		type: String,
		require: true
	},
	documento: {
		type: String,
		require: true
	},
	correo: {
		type: String,
		require: true
	},
	telefono: {
		type: String,
		require: true
	},
	tipo: {
		type: String
	}

}); 

estudianteSchema.plugin(uniqueValidator);
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante