# collectd-node

This is a (currently demonstration) Node.js application to take data from
collectd[1] and present a real-time graph via Websockets.

`chat.html` filters out which graph to display. This is hard-coded to wlan0
until dynamically picking a plugin to monitor is implemented.

## Requirements

* [collectd][1]

* [Node.js][3]

* [Socket.IO-node][2] - git clone it into a directory at the level above this code

[1]: http://collectd.org/
[2]: https://github.com/LearnBoost/Socket.IO-node
[3]: http://nodejs.org/

## The Quick Start

* Install collectd (`collectd-core` on Ubuntu)

* Put `examples/collectd.conf` into `/etc/collectd`. This monitors load and
  interface statistics and POSTs them to localhost:8080.

	$ node ws.js

* Load up http://localhost:8080/ in a modern browser (Chrome & Firefox 4 tested).

## License 

(The MIT License)

Copyright (c) 2011, Aaron Brady, Interactive Web Solutions Ltd.  
Copyright (c) 2011, Darren Worrall, Interactive Web Solutions Ltd.  
Based on work copyright (c) 2010 LearnBoost &lt;dev@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
