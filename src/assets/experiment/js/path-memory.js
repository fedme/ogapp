/**
 * PathMemory Component
 */
var PathMemory = {

    /**
     * Properties
     */
    buttons : [],
    rememberedPath : null,
    rememberedCells: [],
    instructions: null,
    currentQuestion: 0,
    monsterCells: {}, // will contain association between monsters and their cell
    tempCell: null,


    /**
     * Cordova: Initialize()
     */
    Initialize: function() {
        document.addEventListener('deviceready', PathMemory.onDeviceReady.bind(PathMemory), false);
    },


    /**
     * Cordova: onDeviceReady()
     */
    onDeviceReady: function() {
        PathMemory.ReceivedEvent('deviceready');
    },


    /**
     * Cordova: ReceivedEvent()
     */
    ReceivedEvent: function(id) {
        switch (id) {
            case 'deviceready':
                PathMemory.Setup();
                PathMemory.SetHandlers();
                break;
        }
    },


    /**
     * Setup()
     */
    Setup: function() {
        PathMemory.instructions = document.getElementById('instr-save-path-memory');
    },


    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        
        PathMemory.buttons[0] = document.getElementById('btn-save-path-memory');
        PathMemory.buttons[0].addEventListener('click', PathMemory.SaveRememberedPathDialog);

        PathMemory.buttons[1] = document.getElementById('btn-save-path-memory-cells');
        PathMemory.buttons[1].addEventListener('click', PathMemory.SaveRememberedCellsDialog);

        PathMemory.buttons[2] = document.getElementById('btn-path-memory-start');
        PathMemory.buttons[2].addEventListener('click', function() { app.Goto('rt-map-route') });

        PathMemory.buttons[3] = document.getElementById('btn-path-memory-choose-monster-cell-start');
        PathMemory.buttons[3].addEventListener('click', function() { app.Goto('rt-map-route') });

        

        /*var cells = document.querySelectorAll('#table1 td');
        for (var i=0; i < cells.length; i++) {
            cells[i].addEventListener('click', MapRoute.CancelSingleCell);
        }*/

    },


    /**
     * Start();
     */
    Start: function() {
        console.log('PathMemory start');

        // Set MapRoute in path-memory mode
        MapRoute.SetMode('path-memory');
        //MapRoute.Reset();
        MapRoute.CancelPath();

        // Change MapRoute buttons
        document.querySelectorAll('#rt-map-route .history')[0].style.display = "none";
        document.getElementById('btn-save-path').style.display = "none";
        document.getElementById('btn-save-path-memory').style.display = "block";

        document.getElementById('table1').style.backgroundImage = "url('./img/map-a-clean.png')";
        PathMemory.instructions.style.display = "block";

        // Set instructions
        PathMemory.instructions.innerHTML = "1. Please redraw your path on the map";

        // Show MapRoute component
        app.Goto('rt-path-memory-instructions');

    },


    /**
     * StartMonsterCells()
     */
    StartMonsterCells: function() {
        
        PathMemory.chosenMonsters = PMQ.GetChosenMonsters();

        PathMemory.AskQuestion();

        MapRoute.SetMode('path-memory-choose-monster-cell');

        app.Goto('rt-path-memory-choose-monster-cell-instr');
    },


    /**
     * AskQuestion()
     */
    AskQuestion: function() {

        if (PathMemory.currentQuestion >= PathMemory.chosenMonsters.length) return PathMemory.End();

        var currentMonster = PathMemory.chosenMonsters[PathMemory.currentQuestion];

        PathMemory.instructions.innerHTML = "Please tap on the purple cell where yoy picked up this monster:";
        var node = document.getElementById('path-memory-monster-img');
        node.style.display = "block";
        node.setAttribute('src', 'img/monsters/' + currentMonster + '.png');
        node.setAttribute('data-monster', currentMonster);
    },


    /**
     * AnswerQuestionDialog()
     * called by MapRoute in TappedSingleCell()
     */
    AnswerQuestionDialog: function(cell) {
        if (cell == null) return;
        if (!PathMemory.IsChosenCell(cell)) return;

        PathMemory.tempCell = cell;

        // navigator.notification.confirm(
        //     'Are you sure you picked the monster there?', // message
        //     PathMemory.AnswerQuestion,            // callback to invoke with index of button pressed
        //     'Are you sure?',           // title
        //     ['Yes','No']     // buttonLabels
        // );

        if (window.confirm("Are you sure you picked the monster there?")) { 
            PathMemory.AnswerQuestion(1);
        }

    },


    /**
     * AnswerQuestion()
     * called by AnswerQuestionDialog()
     */
    AnswerQuestion: function(buttonIndex) {

        if (buttonIndex !== 1) return;

        var cell = PathMemory.tempCell;

        PathMemory.monsterCells[PathMemory.chosenMonsters[PathMemory.currentQuestion]] = cell;

        PathMemory.currentQuestion++;
        PathMemory.AskQuestion();

    },


    /**
     * IsChosenCell()
     */
    IsChosenCell: function(cell) {
        var chosenCells = PathMemory.GetChosenCells();
        var found = false;
        for (var i=0; i < chosenCells.length; i++) {
            var chosenCell = chosenCells[i];
            if (app.IsSameCell(cell, chosenCell)) {
                found = true;
                break;
            }
        }
        console.log('not a chosen cell!');
        return found;
    },


    /**
     * GetChosenCells()
     */
    GetChosenCells: function() {
        return PathMemory.rememberedCells;
    },


    /**
     * SaveRememberedPathDialog()
     */
    SaveRememberedPathDialog: function() {
        // navigator.notification.confirm(
        //     'Save the redrawn path?', // message
        //     PathMemory.SaveRememberedPath,            // callback to invoke with index of button pressed
        //     'Are you sure?',           // title
        //     ['Yes','No']     // buttonLabels
        // );

        if (window.confirm("Save the redrawn path?")) { 
            PathMemory.SaveRememberedPath(1);
        }
    },


    /**
     * SaveRememberedPath()
     */
    SaveRememberedPath: function(buttonIndex) {
        if (buttonIndex !== 1) return;

        PathMemory.rememberedPath = MapRoute.SavePath();
        console.log(PathMemory.rememberedPath);

        // Set MapRoute in path-memory-monster-cells mode
        MapRoute.SetMode('path-memory-monster-cells');
        document.getElementById('btn-save-path-memory').style.display = "none";
        document.getElementById('btn-cancel-single-cell-mode').style.display = "none";
        document.getElementById('btn-cancel-path').style.display = "none";
        
        document.getElementById('btn-save-path-memory-cells').style.display = "block";

        // Set instructions
        PathMemory.instructions.innerHTML = "2. Please tap on the path cells where you picked up the monsters";
    
    },


    /**
     * SaveRememberedCellsDialog()
     */
    SaveRememberedCellsDialog: function() {
        // navigator.notification.confirm(
        //     'Save the selected cells?', // message
        //     PathMemory.SaveRememberedCells,            // callback to invoke with index of button pressed
        //     'Are you sure?',           // title
        //     ['Yes','No']     // buttonLabels
        // );

        var cells = document.querySelectorAll('td[data-path-memory-selected="1"]');
        if (cells.length < 1) {
            return alert('You MUST select at least one cell!');
        }

        if (window.confirm("Save the selected cells?")) { 
            PathMemory.SaveRememberedCells(1);
        }
    },


    /**
     * SaveRememberedCells()
     */
    SaveRememberedCells: function(buttonIndex) {
        if (buttonIndex !== 1) return;

        var cells = document.querySelectorAll('td[data-path-memory-selected="1"]');
        for (var i=0; i < cells.length; i++) {
            var cell = cells[i];
            PathMemory.rememberedCells.push({
                'x': MapRoute.GetX(cell),
                'y': MapRoute.GetY(cell),
            });
        }
        console.log(PathMemory.rememberedCells);

        document.getElementById('btn-save-path-memory-cells').style.display = "none";



        PMQ.Start();
    },


    /**
     * GetCorrectPlacements()
     */
    GetCorrectPlacementsNumber: function() {
        var count = 0;
        for (var monster in PathMemory.monsterCells) {
            var cell = PathMemory.monsterCells[monster];
            if (MapRoute.IsMonsterCellCorrect(monster, cell)) count++;
        }
        return count;
    },


    /**
     * GetCorrectMonstersCellsNumber()
     */
    GetCorrectMonstersCellsNumber: function() {
        var count = 0;
        var cells = PathMemory.GetChosenCells();
        for (var i=0; i < cells.length; i++) {
            var cell = cells[i];
            if (MapRoute.DoesCellBelongToPAth(cell, PathMemory.rememberedPath)) {
                // TODO
            }
        }


    },


    /**
     * End()
     */
     End: function() {
        console.log('PathMemory end');

        if (app.data.orderFirst == "oq") { // PathMemory was second, so start MQ
            MQ.Start();
        }
        else { // PathMemory was first, so start OQ
            OQ.Start();
        }
       
     }


};

PathMemory.Initialize();