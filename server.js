// load the .env file and variables;
require('dotenv').config({ path: `.env` });
const app = require('./app');

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`App started and running at http://127.0.0.1:${PORT}`);
});