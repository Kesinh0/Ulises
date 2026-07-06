function cleanUser(user) {
	const { contrasenaHash, ...cleanedUser } = user;
	return cleanedUser;
}

module.exports = cleanUser;
