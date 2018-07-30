
module.getGridRowCount = () => {
    if (window.localStorage) {
        let rowCount = localStorage.getItem("ESX-Tetris-GridRowCount");
        if (rowCount) return rowCount;
    }
    return 10;
}

module.getGridRowCount = () => {
    if (window.localStorage) {
        let count = localStorage.getItem("ESX-Tetris-GridColCount");
        if (count) return count;
    }
    return 10;
}