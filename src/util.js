const extend = (dest, source) => {
	for (let p in source) {
		if (p in dest) {
			dest[p] = source[p];
		}
	}
};

const getScore = (yCoordinates) => {
	if (!yCoordinates || yCoordinates.length == 0) return 0;

	let newYCoordinates = [ ...yCoordinates ];
	newYCoordinates.sort((a, b) => b - a);
	let score = 0,
		lastY = newYCoordinates.shift(),
		curY = newYCoordinates.shift(),
		n = 1;
	while (curY) {
		if (curY - lastY == 1) {
			n++;
		} else {
			score += fibonacciScore(n);
			n = 1;
			lastY = curY;
		}
		curY = newYCoordinates.shift();
	}
	return score + fibonacciScore(n);
};

const fibonacciScore = (n) => {
	if (n == 1) return 10;
	else if (n == 2) return 20;
	return fibonacci(n - 1) + fibonacci(n - 2);
};

export { extend, getScore };
