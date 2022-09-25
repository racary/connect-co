import express from "express";
import routes from './routes/routes'
const app = express();
const PORT = process.env.PORT || 8080; // default port to listen

app.use(routes);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});