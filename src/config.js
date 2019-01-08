let containerElement = document.getElementById('container'),
	blockSize = containerElement.clientWidth >= 400 ? 24 : 17;

export const panel = {
	screenMargin: 15,
	screenBackgroundColor: '#9aae82',
	screenHeightProportion: 0.7,
	controlMargin: 15,
	backgroundColor: '#264d8f'
};

export const screen = {
	padding: 2
};

export const matrix = {
	borderWidth: 2,
	blockSize: blockSize,
	bgBlockBorderColor: '#84946e',
	bgBlockBackgroundColor: '#84946e',
	blockBorderColor: '#010101',
	blockBackgroundColor: '#000',
	highlightBlockBorderColor: '#560000',
	highlightBlockBackgroundColor: '#560000'
};

export const state = {
	font: '16px Arial',
	fontSize: 16,
	top: 20,
	left: 10
};

export const control = {
	padding: 10
};
