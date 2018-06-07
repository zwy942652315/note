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
	isCollect: {
		type: Boolean,
		default: false
	},
	notebook_id: { type: Schema.Types.ObjectId, ref: 'notebook'},
	user_id: { type: Schema.Types.ObjectId, ref: 'user'} 
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('note', noteListSchema, 'noteList')