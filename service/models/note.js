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
	notebook_id: { type: Schema.Types.ObjectId, ref: 'notebook' } 
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('note', noteListSchema, 'noteList')