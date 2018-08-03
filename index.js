const express = require('express');
const bodyParser = require('pr-express-body-parser');
const pg = require('pg');
const url = 'postgres://henrygolden:Bballs77@localhost:5432/henrygolden';
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser({ extended: true }));



pg.connect(url, (err, database) => {
    if (err) return console.log(err)
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      next();
    });
    require('./routes')(app, database); 
    if (!module.parent){
      app.listen(port, () => {
        console.log('We are live on ' + port);
      });
    }             
  });

module.exports = app;  

