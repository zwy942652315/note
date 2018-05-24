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
	tags: { type: [String], index: true } 
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('note', noteListSchema, 'noteList')