var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	username: {
		type: String,
		default: ''
	},
	avatar: {
		type: String,
		default: ''
	}
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('user', userSchema, 'userList')