const jwt = require('jsonwebtoken');

generateJWT = (id, username) => {
	const payload = { id, username };

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '1h',
			},
			(err, token) => {
				if (err) {
					console.error(err);

					reject(err);
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = { generateJWT };
