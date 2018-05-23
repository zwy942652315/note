var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noteListSchema = new Schema({
	noteId: {
		type: Number,
	},
	title: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	modifytime: {
		type: Date,
		default:  Date.now
	},
	tags: { type: [String], index: true } 
})

module.exports = mongoose.model('note', noteListSchema, 'noteList')