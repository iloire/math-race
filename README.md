#Math-Race

Simple knockout.js / websockets / node.js real-time game

This is a **very simple real-time game** created with node.js, knockout.js and socket.io. 

##Goal 

Try to be faster than the other players in **solving simple mathematical equations**.

Every game has a limited time (defaults to one minute), so hurry up and beat the others.

Game score history is saved across games.

**No database required** (this is just a quick demo)

Enjoy!

##Demo

[http://letsnode.com:8090/](http://letsnode.com:8090/)

[You can also watch a short video to see the game being played](http://www.youtube.com/watch?v=LXbYSJfLUW8&feature=youtu.be)

##Installation

###Install dependencies with npm:

    npm install

###Configuration

Edit config file to reflect where are you running the server from (so the browser renders the proper link to socket.io resources)

	exports.values={
		version: '0.0.1',
		server : {
			production : {
				real_time_server : {port: 8090, host: '127.0.0.1'}
			}
		}
		,
		game : {
			duration: 60 //seconds
		}
	}


Run the server

	node server.js 8090

##History

### 0.1 

 * Basic functionality. In-memory, no database.
 * Twitter Bootstrap CSS with themes from http://bootswatch.com/

##TODO

 * Use redis database for persistence. 
 * Twitter auth