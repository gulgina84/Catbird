var express = require('express');
var app = express();

var PORT = 5000;

app.use(express.static('./client/dist/'));


app.listen(PORT, () => {
  console.log(`server listening on Port: ${PORT}`);
})








