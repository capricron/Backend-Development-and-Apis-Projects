// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const unix = Date.now();

  const utc = new Date(unix).toUTCString()

  res.json({ unix, utc });
})

app.get('/api/:date', (req, res) => {
  const dateString = req.params.date;

  const isUnixTimestamp = /^\d{5,}$/.test(dateString);
  const timestamp = parseInt(dateString);
  const isValidDate = isUnixTimestamp ? true : !isNaN(Date.parse(dateString));

  if (isValidDate) {
    const dateObject = isUnixTimestamp ? new Date(timestamp) : new Date(dateString);
    const unix = isUnixTimestamp ? timestamp : dateObject.getTime();
    const utc = dateObject.toUTCString();

    res.json({ unix, utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
