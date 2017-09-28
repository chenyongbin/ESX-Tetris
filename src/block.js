import "babel-polyfill";

const _states = Symbol("states"),
    _stateIndex = Symbol("stateIndex"),
    _offsetX = Symbol("offsetX"),
    _offsetY = Symbol("offsetY"),
    _coordinates = Symbol["coordinates"],
    _coordinatesChangedHandlerSet = Symbol("coordinatesChangedHandlerSetF"),
    _resetCoordinates = Symbol("resetCoordinates"),
    _onCoordinatesChanged = Symbol("onCoordinatesChanged");

class Block {
    constructor(...states) {
        /**
         * TODO: how to validate the states structure.
         */

        this[_states] = states;
        this[_stateIndex] = 0;
        this[_offsetX] = 0;
        this[_offsetY] = 0;
        this[_coordinates] = this[_states][this[_stateIndex]];
        this[_coordinatesChangedHandlerSet] = new Set();

        this[_resetCoordinates] = this[_resetCoordinates].bind(this);
        this[_onCoordinatesChanged] = this[_onCoordinatesChanged].bind(this);
        this.transition_left = this.transition_left.bind(this);
        this.transition_right = this.transition_right.bind(this);
        this.transition_down = this.transition_down.bind(this);
        this.transition_rotate = this.transition_rotate.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.adjustCoordinates = this.adjustCoordinates.bind(this);
        this.addCoordinatesChangedHandler = this.addCoordinatesChangedHandler.bind(this);
    }

    [_resetCoordinates]() {
        this[_coordinates] = this[_states][this[_stateIndex]].map(co => {
            return {
                x: co.x + this[_offsetX],
                y: co.y + this[_offsetY],
            };
        });
        this[_onCoordinatesChanged]([...this[_coordinates]]);
    }

    [_onCoordinatesChanged]() {
        for (let handler of this[_coordinatesChangedHandlerSet]) {
            handler && handler([...this[_coordinates]]);
        }
    }
    
    transition_left() {
        this[_offsetX]--;
        this[_resetCoordinates]();
    }

    transition_right() {
        this[_offsetX]++;
        this[_resetCoordinates]();
    }

    transition_down() {
        this[_offsetY]++;
        this[_resetCoordinates]();
    }

    transition_rotate() {
        this[_stateIndex] = this[_stateIndex] >= (this[_states].length - 1)
            ? 0 : this[_stateIndex] + 1;
        this[_resetCoordinates]();
    }

    getCoordinates() {
        return [...this[_coordinates]];
    }

    adjustCoordinates(offsetX, offsetY) {
        this[_offsetX] = offsetX;
        this[_offsetY] = offsetY;
        this[_resetCoordinates]();
    }

    addCoordinatesChangedHandler(handler) {
        this[_coordinatesChangedHandlerSet].add(handler);
    }
}

export default Block;