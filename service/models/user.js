var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	nickName: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		default: ''
	},
	city: {
		type: String,
		default: ''
	},
	province: {
		type: String,
		default: ''
	},
	country: {
		type: String,
		default: ''
	},
	avatarUrl: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: ''
	},
	openid: {
		type: String,
		default: ''
	},
	session_key: {
		type: String,
		default: ''
	}
},
	{timestamps: {createdAt: 'createtime', updatedAt: 'modifytime'}}
)

module.exports = mongoose.model('user', userSchema, 'userList')