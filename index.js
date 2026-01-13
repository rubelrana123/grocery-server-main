// // index.js
// const app = require("./app");

// // Export the app for Vercel to handle the routing
// module.exports = app;



const app = require("./app");
const { PORT } = require("./src/configs/config");

app.get('/', async(req, res) => {
    res.send('server running')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


