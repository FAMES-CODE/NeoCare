const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rs', { useNewUrlParser: true }, (err) => {
	if (!err) {
		console.log('CONNECTED');
	} else {
		console.log('Nous avons une erreur dans la base de donnée, la voici: ' + err);
	}
});
module.exports = mongoose;
