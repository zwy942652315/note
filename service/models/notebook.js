var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notebookListSchema = new Schema({
	notebookId: {
		type: Number,
	},
	bookname: {
		type: String,
		default: ''
	},
	user_id: { type: Schema.Types.ObjectId, ref: 'user'} 
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('notebook', notebookListSchema, 'notebookList')