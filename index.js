const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

app.use(cors({ origin: '*' }))


// LUDO DICE ROLLER ENDPOINTS


// Wake-up endpoint
app.get('/api/wakeup', (request, response) => {
    console.log('Ludo server waking up at:', new Date().toISOString());
    response.json({
        status: 'awake',
        message: 'Ludo server is ready',
        timestamp: new Date().toISOString()
    });
});  

// Dice roll endpoint - GET
app.get('/api/roll', (request, response) => {
    console.log('Rolling Ludo die...');
    const roll = Math.floor(Math.random() * 6) + 1;
    response.json({
        value: roll,
        isSix: roll === 6,
        timestamp: new Date().toISOString()
    });
});

// Dice roll endpoint  (for CORS demo)
app.post('/api/roll', (request, response) => {
    response.json({
        message: 'POST request - used for CORS demo',
        note: 'This triggers CORS preflight'
    });
});




// About page
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

// Version
app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})

// Ping
app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

// 2plus2
app.get('/2plus2', (request, response) => {
	console.log('Calling "/2plus2" on the Node.js server.')
	response.type('text/plain')
	response.send('4')
})

// Add two integers
app.get('/add-two-integers', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})

// Calculate BMI
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	response.type('text/plain')
	response.send('Todo: Implement "/calculate-bmi"')
})

// Test function
app.get('/test', (request, response) => {
    console.log(request);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");
    response.write("req.url="+request.url+"<br><br>");
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);
    response.end('<h3>The End.</h3>');
})

// Batman JSON
const batMan = {
	"firstName":"Bruce",
	"lastName":"Wayne",
	"preferredName":"Batman",
	"email":"darkknight@lewisu.edu",
	"phoneNumber":"800-bat-mann",
	"city":"Gotham",
	"state":"NJ",
	"zip":"07101",
	"lat":"40.73",
	"lng":"-74.17",
	"favoriteHobby":"Flying",
	"class":"cpsc-24700-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"",
	"inPerson":[
		"Monday",
		"Wednesday"
	],
	"virtual":[
		"Friday"
	]
}

app.get('/batman', (request, response) => {
	console.log('Calling "/batman" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(batMan))
})

// Favorite Places
const favoritePlaces = require('./FavoritePlaces.json');

app.get('/api/favorite-places', (req, res) => {
  res.json(favoritePlaces);
});

// Custom 404 page
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

// Start server
app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)