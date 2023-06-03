const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.post('/authenticate', async (req, res) => {
	const { username } = req.body;
	try {
		const r = await axios.put(
			'https://api.chatengine.io/users',
			{ username: username, secret: 'username', first_name: username },
			{ headers: { 'private-key': '3ebd1eee-a32f-4114-b35b-0485872ded6d' } }
		);
		return res.status(r.status).json(r.data);
	} catch (e) {
		return res.status(e.response.status).json(e.response.data);
	}
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
