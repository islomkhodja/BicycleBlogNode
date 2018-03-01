	/*
CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`user_name` varchar(100) NOT NULL UNIQUE,
	`user_email` varchar(155) NOT NULL UNIQUE,
	`user_pass` varchar NOT NULL,
	`user_type` varchar(20) NOT NULL DEFAULT 'admin',
	`user_status` varchar NOT NULL DEFAULT 'enable',
	PRIMARY KEY (`user_id`)
);

 */

var md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('users', {
		user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
		user_name: {type: DataTypes.STRING(100), unique: true, allowNull: false},
		user_email: {type: DataTypes.STRING(155), unique:true, allowNull: false, validate: {isEmail: true}},
		user_pass: {	
			type: DataTypes.STRING, 
			allowNull: false,
			set(val) {
				this.setDataValue('user_pass', md5(val));
			} 
		},
		user_type: {type: DataTypes.ENUM('admin', 'member'), allowNull:false, defaultValue:'admin'},
		user_status: {type: DataTypes.ENUM('enable', 'disable'), allowNull: false, defaultValue: 'enable'},
		user_register_time : {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
	},{
  timestamps: false
})

	return Users;	
}
