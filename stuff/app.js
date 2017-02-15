var add = function(x, y) {
	return x + y;
}

var square = function(x) {
	return x*x;
}

for (var i = 0; i < 10; i++) {
	console.log(square(add(i, 1)));
}