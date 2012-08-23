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

![Game screenshot](https://github.com/iloire/math-race/raw/master/screenshots/math-race01.png)

[http://letsnode.com:8090/](http://letsnode.com:8090/)

[You can also watch a short video to see the game being played](http://www.youtube.com/watch?v=LXbYSJfLUW8&feature=youtu.be)

##Installation

###Install dependencies with npm:

    npm install

###Configuration

Edit config file to reflect where are you running the server from (so the browser renders the proper link to socket.io resources)

```javascript
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
```

Run the server

	node server.js 8090

##History

### 0.1

 * Basic functionality. In-memory, no database.
 * Twitter Bootstrap CSS with themes from http://bootswatch.com/

##TODO

 * Use redis database for persistence.
 * Twitter auth

##License

 Copyright (c) 2012 Iván Loire

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.