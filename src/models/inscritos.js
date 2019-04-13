const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const inscritoSchema=new Schema({
	idcurso: {
		type:Number,
		require: true
	},
	documento:{
		type: String,
		require: true
	},
	iddocumento: {
		type: String,
		require: true,
		unique: true
	}

}); 

inscritoSchema.plugin(uniqueValidator);


const Inscrito = mongoose.model('Inscrito', inscritoSchema);

module.exports = Inscrito