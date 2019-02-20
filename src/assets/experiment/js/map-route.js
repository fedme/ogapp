/**
 * MapRoute Component
 */
var MapRoute = {

    /**
     * Properties
     */
    mode: 'map-route',
    first: true,
    lastCell: null,
    table: null,
    cancelSingleCellMode: false,
    buttons: [],
    counter: 1,
    streets: [{ 'x': 13, 'y': 3 }, { 'x': 3, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 3, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 1, 'y': 23 }, { 'x': 2, 'y': 23 }, { 'x': 3, 'y': 23 }, { 'x': 4, 'y': 23 }, { 'x': 5, 'y': 23 },
    { 'x': 6, 'y': 23, 'npc1': '12r_re_pipe' }, { 'x': 7, 'y': 23 }, { 'x': 8, 'y': 23 }, { 'x': 9, 'y': 23 }, { 'x': 10, 'y': 23 }, { 'x': 11, 'y': 23 }, { 'x': 12, 'y': 23 }, { 'x': 13, 'y': 23 }, { 'x': 14, 'y': 23 }, { 'x': 15, 'y': 23 }, { 'x': 16, 'y': 23 }, { 'x': 17, 'y': 23 }, { 'x': 18, 'y': 23 }, { 'x': 19, 'y': 23 }, { 'x': 20, 'y': 23 }, { 'x': 21, 'y': 23 }, { 'x': 22, 'y': 23 }, { 'x': 23, 'y': 23 }, { 'x': 24, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 3, 'y': 22 }, { 'x': 8, 'y': 22 }, { 'x': 13, 'y': 22 }, { 'x': 18, 'y': 22 }, { 'x': 23, 'y': 22 }, { 'x': 3, 'y': 21 }, { 'x': 8, 'y': 21 },
    { 'x': 13, 'y': 21, 'npc1': '7r_ro_crown' }, { 'x': 18, 'y': 21 }, { 'x': 23, 'y': 21 }, { 'x': 3, 'y': 20 },
    { 'x': 8, 'y': 20, 'npc1': '3y_ro_hair' }, { 'x': 13, 'y': 20 },
    { 'x': 18, 'y': 20, 'npc1': '10r_re_viking' }, { 'x': 23, 'y': 20 }, { 'x': 3, 'y': 19 }, { 'x': 8, 'y': 19 }, { 'x': 13, 'y': 19 }, { 'x': 18, 'y': 19 }, { 'x': 23, 'y': 19 }, { 'x': 3, 'y': 18 }, { 'x': 4, 'y': 18 }, { 'x': 5, 'y': 18 }, { 'x': 6, 'y': 18 }, { 'x': 7, 'y': 18 }, { 'x': 8, 'y': 18 }, { 'x': 9, 'y': 18 },
    { 'x': 10, 'y': 18, 'npc1': '6y_re_wings' }, { 'x': 11, 'y': 18 }, { 'x': 12, 'y': 18 }, { 'x': 13, 'y': 18 }, { 'x': 14, 'y': 18 }, { 'x': 15, 'y': 18 }, { 'x': 16, 'y': 18 }, { 'x': 17, 'y': 18 }, { 'x': 18, 'y': 18 }, { 'x': 19, 'y': 18 },
    { 'x': 20, 'y': 18, 'npc1': '4y_re_elvis' }, { 'x': 21, 'y': 18 }, { 'x': 22, 'y': 18 }, { 'x': 23, 'y': 18 }, { 'x': 3, 'y': 17 }, { 'x': 8, 'y': 17 }, { 'x': 13, 'y': 17 }, { 'x': 18, 'y': 17 }, { 'x': 23, 'y': 17 }, { 'x': 3, 'y': 16 }, { 'x': 8, 'y': 16 }, { 'x': 13, 'y': 16 }, { 'x': 18, 'y': 16 }, { 'x': 23, 'y': 16 }, { 'x': 3, 'y': 15 }, { 'x': 8, 'y': 15 }, { 'x': 13, 'y': 15 }, { 'x': 18, 'y': 15 }, { 'x': 23, 'y': 15 }, { 'x': 3, 'y': 14 }, { 'x': 8, 'y': 14 }, { 'x': 13, 'y': 14 }, { 'x': 18, 'y': 14 }, { 'x': 23, 'y': 14 }, { 'x': 3, 'y': 13 }, { 'x': 4, 'y': 13 },
    { 'x': 5, 'y': 13, 'npc1': '2y_ro_horn' }, { 'x': 6, 'y': 13 }, { 'x': 7, 'y': 13 }, { 'x': 8, 'y': 13 }, { 'x': 9, 'y': 13 }, { 'x': 10, 'y': 13 }, { 'x': 11, 'y': 13 }, { 'x': 12, 'y': 13 }, { 'x': 13, 'y': 13 }, { 'x': 14, 'y': 13 }, { 'x': 15, 'y': 13 }, { 'x': 16, 'y': 13 }, { 'x': 17, 'y': 13 }, { 'x': 18, 'y': 13 }, { 'x': 19, 'y': 13 },
    { 'x': 20, 'y': 13, 'npc1': '8r_ro_antenna' }, { 'x': 21, 'y': 13 }, { 'x': 22, 'y': 13 }, { 'x': 23, 'y': 13 }, { 'x': 3, 'y': 12 }, { 'x': 8, 'y': 12 }, { 'x': 13, 'y': 12 }, { 'x': 18, 'y': 12 }, { 'x': 23, 'y': 12 }, { 'x': 3, 'y': 11 },
    { 'x': 8, 'y': 11, 'npc1': '11r_re_beard', 'npc2': '9r_ro_horns' }, { 'x': 13, 'y': 11 }, { 'x': 18, 'y': 11 }, { 'x': 23, 'y': 11 }, { 'x': 3, 'y': 10 }, { 'x': 8, 'y': 10 }, { 'x': 13, 'y': 10 },
    { 'x': 18, 'y': 10, 'npc1': '1y_ro_wig' }, { 'x': 23, 'y': 10 }, { 'x': 3, 'y': 9 }, { 'x': 8, 'y': 9 }, { 'x': 13, 'y': 9 }, { 'x': 18, 'y': 9 }, { 'x': 23, 'y': 9 }, { 'x': 3, 'y': 8 }, { 'x': 4, 'y': 8 }, { 'x': 5, 'y': 8 }, { 'x': 6, 'y': 8 }, { 'x': 7, 'y': 8 }, { 'x': 8, 'y': 8 }, { 'x': 9, 'y': 8 }, { 'x': 10, 'y': 8 }, { 'x': 11, 'y': 8 }, { 'x': 12, 'y': 8 }, { 'x': 13, 'y': 8 }, { 'x': 14, 'y': 8 }, { 'x': 15, 'y': 8 }, { 'x': 16, 'y': 8 }, { 'x': 17, 'y': 8 }, { 'x': 18, 'y': 8 }, { 'x': 19, 'y': 8 }, { 'x': 20, 'y': 8 }, { 'x': 21, 'y': 8 }, { 'x': 22, 'y': 8 }, { 'x': 23, 'y': 8 }, { 'x': 3, 'y': 7 }, { 'x': 8, 'y': 7 }, { 'x': 13, 'y': 7 }, { 'x': 18, 'y': 7 }, { 'x': 23, 'y': 7 }, { 'x': 3, 'y': 6 }, { 'x': 8, 'y': 6 }, { 'x': 13, 'y': 6 }, { 'x': 18, 'y': 6 }, { 'x': 23, 'y': 6 }, { 'x': 3, 'y': 5 }, { 'x': 8, 'y': 5 }, { 'x': 13, 'y': 5 },
    { 'x': 18, 'y': 5, 'npc1': '5y_re_mustache' }, { 'x': 23, 'y': 5 }, { 'x': 3, 'y': 4 }, { 'x': 8, 'y': 4 }, { 'x': 13, 'y': 4 }, { 'x': 18, 'y': 4 }, { 'x': 23, 'y': 4 }, { 'x': 1, 'y': 3 }, { 'x': 2, 'y': 3 }, { 'x': 3, 'y': 3 }, { 'x': 4, 'y': 3 }, { 'x': 5, 'y': 3 }, { 'x': 6, 'y': 3 }, { 'x': 7, 'y': 3 }, { 'x': 8, 'y': 3 }, { 'x': 9, 'y': 3 }, { 'x': 10, 'y': 3 }, { 'x': 11, 'y': 3 }, { 'x': 12, 'y': 3 }, { 'x': 13, 'y': 3 }, { 'x': 14, 'y': 3 }, { 'x': 15, 'y': 3 }, { 'x': 16, 'y': 3 }, { 'x': 17, 'y': 3 }, { 'x': 18, 'y': 3 }, { 'x': 19, 'y': 3 }, { 'x': 20, 'y': 3 }, { 'x': 21, 'y': 3 }, { 'x': 22, 'y': 3 }, { 'x': 23, 'y': 3 }, { 'x': 24, 'y': 3 }, { 'x': 25, 'y': 3 }, { 'x': 3, 'y': 2 }, { 'x': 23, 'y': 2 }, { 'x': 3, 'y': 1 }, { 'x': 23, 'y': 1 }],
    userPaths: [],
    userPathIndex: null,
    drawingTime: 300000,
    startDrawingPathTimestamp: 0,

    monsterCells: {
        "12r_re_pipe": { 'x': 6, 'y': 23 },
        "7r_ro_crown": { 'x': 13, 'y': 21 },
        "3y_ro_hair": { 'x': 8, 'y': 20 },
        "10r_re_viking": { 'x': 18, 'y': 20 },
        "6y_re_wings": { 'x': 10, 'y': 18 },
        "4y_re_elvis": { 'x': 20, 'y': 18 },
        "2y_ro_horn": { 'x': 5, 'y': 13 },
        "8r_ro_antenna": { 'x': 20, 'y': 13 },
        "11r_re_beard": { 'x': 8, 'y': 11 },
        "9r_ro_horns": { 'x': 8, 'y': 11 },
        "1y_ro_wig": { 'x': 18, 'y': 10 },
        "5y_re_mustache": { 'x': 18, 'y': 5 }

    },
    //userNpcs: [],

    /**
     * Cordova: Initialize()
     */
    Initialize: function () {
        document.addEventListener('deviceready', MapRoute.onDeviceReady.bind(MapRoute), false);
    },


    /**
     * Cordova: onDeviceReady()
     */
    onDeviceReady: function () {
        MapRoute.ReceivedEvent('deviceready');
    },


    /**
     * Cordova: ReceivedEvent()
     */
    ReceivedEvent: function (id) {
        switch (id) {
            case 'deviceready':
                MapRoute.Setup();
                MapRoute.SetHandlers();
                break;
        }
    },


    /**
     * Setup()
     */
    Setup: function () {

        MapRoute.table = document.getElementById('table1');

        for (i = 25; i > 0; i--) {
            var row = document.createElement("tr");
            for (j = 1; j <= 25; j++) {
                var cell = document.createElement("td");
                cell.setAttribute('data-x', j);
                cell.setAttribute('data-y', i);
                //cell.setAttribute('data-selectable', MapRoute.IsStreetByCoords(j, i));
                cell.setAttribute('data-selectable', 'false');
                cell.setAttribute('data-selected', '0');
                cell.setAttribute('data-counter-1', '0');
                cell.setAttribute('data-counter-2', '0');
                cell.setAttribute('data-counter-3', '0');
                row.appendChild(cell);
            }
            MapRoute.table.appendChild(row);
        }


        MapRoute.SetStreets(); // Enables streets and places npcs
        MapRoute.table.addEventListener('touchmove', MapRoute.TouchMoveHandler);
    },


    /**
     * SetHandlers()
     */
    SetHandlers: function () {

        MapRoute.buttons[0] = document.getElementById('btn-cancel-path');
        MapRoute.buttons[0].addEventListener('click', MapRoute.CancelPath);

        MapRoute.buttons[1] = document.getElementById('btn-cancel-single-cell-mode');
        MapRoute.buttons[1].addEventListener('click', MapRoute.CancelSingleCellModeSwitch);

        MapRoute.buttons[2] = document.getElementById('btn-save-path');
        MapRoute.buttons[2].addEventListener('click', MapRoute.SavePath);

        MapRoute.buttons[3] = document.getElementById('btn-choose-path');
        MapRoute.buttons[3].addEventListener('click', MapRoute.ChoosePathDialog);

        var cells = document.querySelectorAll('#table1 td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', MapRoute.TappedSingleCell);
        }

    },


    /**
     * SetMode()
     */
    SetMode: function (mode) {
        MapRoute.mode = mode;
    },


    /**
     * IsInMode()
     */
    IsInMode: function (mode) {
        return MapRoute.mode === mode;
    },


    /**
     * Reset()
     */
    Reset: function () {
        MapRoute.userPathIndex = null;
        MapRoute.userPaths = [];
        MapRoute.CancelPath();
    },


    /**
     * GetChosenPath
     */
    GetChosenPath: function () {
        return MapRoute.userPaths[MapRoute.userPathIndex];
    },


    /**
     * GetChosenPathMonsters()
     */
    GetChosenPathMonsters: function () {
        return MapRoute.GetChosenPath().monsters;
    },


    /**
     * UpdateHistory()
     */
    UpdateHistory: function () {
        var ol = document.querySelectorAll('div.controls div.history ol')[0];
        var btnSave = document.getElementById('btn-save-path');
        btnSave.innerHTML = 'Save as path number ' + (MapRoute.userPaths.length + 1);
        ol.innerHTML = '';
        for (var i = 0; i < MapRoute.userPaths.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = 'Path ' + (i + 1);
            li.setAttribute('data-path-index', i);
            li.setAttribute('data-selected-path', 'false');
            li.addEventListener('click', MapRoute.LoadPath);
            ol.appendChild(li);
        }
    },


    /**
     * LoadPath()
     */
    LoadPath: function (evt) {
        var lis = document.querySelectorAll('div.history li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].setAttribute('data-selected-path', 'false');
        }
        evt.target.setAttribute('data-selected-path', 'true');
        return MapRoute.DrawPath(MapRoute.userPaths[parseInt(evt.target.getAttribute('data-path-index'))]);
    },


    /**
     * ChoosePathDialog()
     */
    ChoosePathDialog: function () {
        // navigator.notification.confirm(
        //     'Are you sure you want to select this path?', // message
        //     MapRoute.ChoosePath,            // callback to invoke with index of button pressed
        //     'Select this path',           // title
        //     ['Yes','No']     // buttonLabels
        // );

        if (window.confirm("Are you sure you want to select this path?")) {
            MapRoute.ChoosePath(1);
        }
    },


    /**
     * ChoosePath()
     */
    ChoosePath: function (buttonIndex) {
        if (buttonIndex !== 1) return;
        var selections = document.querySelectorAll('li[data-selected-path="true"]');
        if (!selections.length > 0) return;
        var pathIndex = parseInt(selections[0].getAttribute('data-path-index'));
        console.log('You have chosen path ' + pathIndex);
        MapRoute.userPathIndex = pathIndex;

        OP.Start();

    },


    /**
     * SetStreets()
     */
    SetStreets: function () {
        for (var i = 0; i < MapRoute.streets.length; i++) {
            var street = MapRoute.streets[i];
            var cell = MapRoute.GetCell(street.x, street.y);
            cell.setAttribute('data-selectable', 'true');

            if (street.npc1 != null && street.npc1 != "")
                cell.setAttribute('data-npc1', street.npc1);

            if (street.npc2 != null && street.npc2 != "")
                cell.setAttribute('data-npc2', street.npc2);
        }
    },


    /**
     * TouchMoveHandler()
     */
    TouchMoveHandler: function (evt) {
        var el = null;
        var currentCell = null;
        //console.log(evt);

        for (i = 0; i < evt.touches.length; i++) {
            el = evt.touches[i];
            currentCell = document.elementFromPoint(el.clientX, el.clientY);

            // if cell is selectebale  and contigous with path
            if (currentCell != MapRoute.lastCell && MapRoute.IsCell(currentCell) && MapRoute.IsNextToPath(currentCell) && MapRoute.IsSelectable(currentCell)) {
                MapRoute.lastCell = currentCell;

                MapRoute.SelectCell(MapRoute.lastCell);

                // if it's the first drawn cell of the path
                if (MapRoute.first) {
                    MapRoute.first = false;

                    MapRoute.startDrawingPathTimestamp = new Date();

                    // if it is the first cell of the first path ever drawn
                    if (MapRoute.userPaths.length == 0) {
                        setTimeout(drawingHalfTimeUp, MapRoute.drawingTime / 2);
                        setTimeout(drawingTimeUp, MapRoute.drawingTime);
                    }
                }

            }
        }
    },


    /**
     * SelectCell()
     */
    SelectCell: function (cell) {
        if (!MapRoute.IsCell(cell)) return;
        var times = MapRoute.GetSelectedTimes(cell) < 3 ? MapRoute.GetSelectedTimes(cell) + 1 : 3;
        cell.setAttribute('data-selected', times);
        cell.setAttribute('data-counter-' + times, MapRoute.counter);
        MapRoute.counter++;
    },


    /**
     * DrawPath()
     */
    DrawPath: function (path) {
        if (path == null) return;
        MapRoute.CancelPath();
        for (var i = 0; i < path.pathCells.length; i++) {
            MapRoute.SelectCell(MapRoute.GetCell(path.pathCells[i].x, path.pathCells[i].y));
        }
    },


    /**
     * SavePath()
     */
    SavePath: function () {
        var path = [];
        var cells = MapRoute.GetPathCells();
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var times = MapRoute.GetSelectedTimes(cell);
            for (var j = 1; j <= times; j++) {
                path.push({
                    'count': parseInt(cell.getAttribute('data-counter-' + j)),
                    'x': MapRoute.GetX(cell),
                    'y': MapRoute.GetY(cell),
                    'npcs': MapRoute.GetNpcs(cell)
                });
            }
        }

        // Order path
        path.sort(function (a, b) {
            if ((typeof b.count === 'undefined' && typeof a.count !== 'undefined') || a.count < b.count) {
                return -1;
            }
            if ((typeof a.count === 'undefined' && typeof b.count !== 'undefined') || a.count > b.count) {
                return 1;
            }

            return 0;
        });

        // Saving path 
        var currentTimeStamp = new Date();

        var pathTemp = {
            'pathLength': path.length,
            'pathTurns': MapRoute.CountPathTurns(path),
            'pathCells': path,
            'nMonsters': 0,
            'monsters': [],
            'drawingTime': (currentTimeStamp - MapRoute.startDrawingPathTimestamp) / 1000
        };

        // Saving monsters
        for (var i = 0; i < path.length; i++) {
            for (var j = 0; j < path[i].npcs.length; j++) {
                var found = false;
                var npc = path[i].npcs[j];
                for (var w = 0; w < pathTemp.monsters.length; w++) {
                    if (pathTemp.monsters[w] == npc) {
                        found = true;
                        break;
                    }
                }
                if (!found) pathTemp.monsters.push(npc);
            }
        }

        pathTemp.nMonsters = pathTemp.monsters.length;


        /**
         * MODE: map-route
         */
        if (MapRoute.IsInMode('map-route')) {
            // Saving path
            var pathIndex = MapRoute.userPaths.length;
            MapRoute.userPaths[pathIndex] = pathTemp;
        }


        /**
         * MODE: path-memory
         */
        if (MapRoute.IsInMode('path-memory')) {
            return pathTemp;
        }


        MapRoute.CancelPath();
        MapRoute.UpdateHistory();
    },


    /**
     * GetMonsterCell()
     */
    GetMonsterCell: function (monster) {
        if (monster == null) return null;
        return MapRoute.monsterCells[monster];
    },


    /**
     * IsMonsterCellCorrect()
     */
    IsMonsterCellCorrect: function (monster, cell) {
        if (monster == null || cell == null) return null;
        var monsterCell = MapRoute.GetMonsterCell(monster);
        return (monsterCell.x === cell.x && monsterCell.y === cell.y);
    },


    /**
     * OLD IsNextToPath()
     
    IsNextToPath: function(cell) {
        if (MapRoute.first) {
            return (MapRoute.GetX(cell) == 13 && MapRoute.GetY(cell) == 3);
        }

        var neighbours = MapRoute.GetNeighbours(MapRoute.lastCell);
        for (var i=0; i < neighbours.length; i++) {
            if (neighbours[i] == cell) return true;
        }
        return false;
    },

    */


    /**
     * IsNextToPath()
     */
    IsNextToPath: function (cell) {
        if (MapRoute.first) {
            return (MapRoute.GetX(cell) == 13 && MapRoute.GetY(cell) == 3);
        }

        var neighbours = MapRoute.GetNeighbours(cell);
        for (var i = 0; i < neighbours.length; i++) {
            if (MapRoute.IsCell(neighbours[i]) && MapRoute.BelongsToPath(neighbours[i])) return true;
        }
        return false;
    },


    /**
     * IsStreetByCoords()
     */
    IsStreetByCoords: function (x, y) {
        for (var i = 0; i < MapRoute.streets.length; i++) {
            if (x == MapRoute.streets[i].x && y == MapRoute.streets[i].y) return true;
        }
        return false;
    },


    /**
     * CancelPath()
     */
    CancelPath: function () {
        var cells = MapRoute.GetPathCells();
        for (var i = 0; i < cells.length; i++) {
            cells[i].setAttribute('data-selected', '0');
        }
        MapRoute.first = true;
        MapRoute.counter = 1;
        return;
    },


    /**
     * CancelSingleCellModeSwitch()
     */
    CancelSingleCellModeSwitch: function () {
        if (MapRoute.cancelSingleCellMode)
            return MapRoute.CancelSingleCellModeOff();
        else return MapRoute.CancelSingleCellModeOn();
    },


    /**
     * CancelSingleCellModeOn()
     */
    CancelSingleCellModeOn: function () {
        MapRoute.cancelSingleCellMode = true;
        var cells = document.querySelectorAll('td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.borderColor = 'red';
        }
    },


    /**
     * CancelSingleCellModeOff()
     */
    CancelSingleCellModeOff: function () {
        MapRoute.cancelSingleCellMode = false;
        var cells = document.querySelectorAll('td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.borderColor = 'rgba(255, 255, 255, 0)';
        }
    },


    /**
     * TappedSingleCell()
     */
    TappedSingleCell: function (evt) {

        //console.log('tapped single cell');

        if (MapRoute.cancelSingleCellMode) {
            var times = MapRoute.GetSelectedTimes(evt.target) > 0 ? MapRoute.GetSelectedTimes(evt.target) - 1 : 0;
            evt.target.setAttribute('data-selected', times);
        }

        if (MapRoute.IsInMode('path-memory-monster-cells')) {
            var selected = evt.target.getAttribute('data-path-memory-selected');
            var selected = (parseInt(selected) === 0 || selected == null) ? 1 : 0;
            evt.target.setAttribute('data-path-memory-selected', selected);
        }

        if (MapRoute.IsInMode('path-memory-choose-monster-cell')) {
            var cell = { "x": parseInt(evt.target.getAttribute('data-x')), "y": parseInt(evt.target.getAttribute('data-y')) };
            PathMemory.AnswerQuestionDialog(cell);
        }

    },


    /**
     * CountPathTurns()
     */
    CountPathTurns: function (path) {
        if (path == null || path.length < 3) return 0;
        var turns = 0;
        for (var i = 0; i < path.length; i++) {
            //console.log('path cell ' + path[i].x, path[i].y)
            if (i >= 2 && path[i].x != path[i - 2].x && path[i].y != path[i - 2].y) {
                //console.log('-- TURN FROM ' + path[i-2].x, path[i-2].y + ' TO ' + path[i].x, path[i].y);
                turns++;
            }

        }
        return turns;
    },


    /**
     * GetPathCells()
     */
    GetPathCells: function () {
        return document.querySelectorAll('td[data-selected="1"], td[data-selected="2"], td[data-selected="3"]');
    },


    /**
     * IsSelectable()
     */
    IsSelectable: function (cell) {
        if (cell == null) return false;
        return cell.getAttribute("data-selectable") == "true";
    },


    /**
     * IsCell()
     */
    IsCell: function (el) {
        if (el == null) return false;
        return el.hasAttribute("data-x");
    },


    /**
     * GetSelectedTimes()
     */
    GetSelectedTimes: function (cell) {
        if (cell === null || !MapRoute.IsCell(cell)) return 0;
        return parseInt(cell.getAttribute('data-selected'));
    },


    /**
     * GetSelectedTimes()
     */
    BelongsToPath: function (cell) {
        if (cell === null || !MapRoute.IsCell(cell)) return false;
        return parseInt(cell.getAttribute('data-selected')) > 0;
    },


    /**
     * GetNeighbours()
     */
    GetNeighbours: function (cell) {
        if (cell === null) return [];
        var x = parseInt(cell.getAttribute('data-x'));
        var y = parseInt(cell.getAttribute('data-y'));
        var neighbours = [
            MapRoute.GetCell(x - 1, y),
            MapRoute.GetCell(x, y + 1),
            MapRoute.GetCell(x + 1, y),
            MapRoute.GetCell(x, y - 1)
        ];
        return neighbours.clean(null);
    },


    /**
     * GetCell()
     */
    GetCell: function (x, y) {
        //console.log('getCell (' + x + ',' + y + ')');
        var cells = document.querySelectorAll('td[data-x="' + x + '"][data-y="' + y + '"]');
        if (cells.length > 0) return cells[0];
        else return null;
    },


    /**
     * GetX()
     */
    GetX: function (cell) {
        if (cell === null) return 0;
        return parseInt(cell.getAttribute('data-x'));
    },


    /**
     * GetY()
     */
    GetY: function (cell) {
        if (cell === null) return 0;
        return parseInt(cell.getAttribute('data-y'));
    },


    /**
     * GetNpcs()
     */
    GetNpcs: function (cell) {
        if (cell === null) return [];
        var npcs = [];
        if (cell.getAttribute('data-npc1') != null && cell.getAttribute('data-npc1') != "") {
            npcs.push(cell.getAttribute('data-npc1'));
        }
        if (cell.getAttribute('data-npc2') != null && cell.getAttribute('data-npc2') != "") {
            npcs.push(cell.getAttribute('data-npc2'));
        }
        return npcs;
    },


    /**
     * GetStreets()
     */
    GetStreets: function () {
        var tiles = document.querySelectorAll('td[data-selected=1]');
        var arrayString = '';
        for (var i = 0; i < tiles.length; i++) {
            arrayString += "{ 'x': " + MapRoute.GetX(tiles[i]) + ", 'y': " + MapRoute.GetY(tiles[i]) + "}, ";
        }
        console.log(arrayString);
    }

};



/**
 * Timeout alerts and Beep sound
 */

const drawingTimeUp = async () => {
    if (MapRoute.userPathIndex != null || !MapRoute.IsInMode('map-route')) return;
    await beep(4);
    alert("Drawing time is up!\nThe time for drawing has ended!");
};



const drawingHalfTimeUp = async () => {
    await beep(2);
    alert("Half time passed!\nOnly half time remaining for drawing!");
};

const beepSound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

const beep = async (n) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < n; i++) {
        beepSound.play();
        await delay(500);
    }

}

MapRoute.Initialize();