let UtilityService = {
	checkForErrors: function(body){

		let hasErrors = false;
		let errors = []

		if(!body.hasOwnProperty('username')){
			errors.push('No username provided');
		}
		if(!body.hasOwnProperty('email')){
			errors.push('No email provided');
		}
		if(!body.hasOwnProperty('password')){
			errors.push('No password provided');
		}
		return {hasErrors: hasErrors, errors: errors}
	}
}
module.exports = UtilityService;