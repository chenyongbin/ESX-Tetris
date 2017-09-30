import "babel-polyfill";

class Block {
    constructor(...states) {
        /**
         * TODO: how to validate the states structure.
         */

        this.states = states;
        this.stateIndex = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.coordinates = this.states[this.stateIndex];
        this.coordinatesChangedHandlerSet = new Set();
    }

    resetCoordinates() {
        this.coordinates = this.states[this.stateIndex].map(co => {
            return {
                x: co.x + this.offsetX,
                y: co.y + this.offsetY,
            };
        });
        this.onCoordinatesChanged([...this.coordinates]);
    }

    onCoordinatesChanged() {
        for (let handler of this.coordinatesChangedHandlerSet) {
            handler && handler([...this.coordinates]);
        }
    }

    transition_left() {
        this.offsetX--;
        this.resetCoordinates();
    }

    transition_right() {
        this.offsetX++;
        this.resetCoordinates();
    }

    transition_down() {
        this.offsetY++;
        this.resetCoordinates();
    }

    transition_rotate() {
        this.stateIndex = this.stateIndex >= (this.states.length - 1)
            ? 0 : this.stateIndex + 1;
        this.resetCoordinates();
    }

    getCoordinates() {
        return [...this.coordinates];
    }

    adjustCoordinates(offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.resetCoordinates();
    }

    addCoordinatesChangedHandler(handler) {
        this.coordinatesChangedHandlerSet.add(handler);
    }
}

export default Block;