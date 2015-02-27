var s = require('smoothie'),
	domready = require('domready');


domready(function() {

	var smoothie = new s.SmoothieChart();
	smoothie.streamTo(document.getElementById("cpu"), 250);

	// Data
	var lines = [new s.TimeSeries(), new s.TimeSeries(), new s.TimeSeries() ,new s.TimeSeries()];

	// Add to SmoothieChart
	smoothie.addTimeSeries(lines[0]);
	smoothie.addTimeSeries(lines[1]);
	smoothie.addTimeSeries(lines[2]);
	smoothie.addTimeSeries(lines[3]);

	var ws = new WebSocket("ws://localhost:3001");
		ws.onopen = function()
		{
			// setInterval(function() {
			// 	ws.send(JSON.stringify({x: joystick.deltaX(), y: joystick.deltaY()}));
			// 	console.log("x", joystick.deltaX(), "y", joystick.deltaY());
			// }, 25);	

		};
		ws.onmessage = function(messageEvent) {
				if(!messageEvent.data) {
					return;
				}
				var data = JSON.parse(messageEvent.data);
				console.log("incoming", data);

				data.forEach(function(cpu, index) {
					lines[index].append(new Date().getTime(), cpu.cpu);
				});
		}
});