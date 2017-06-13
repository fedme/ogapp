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
        PathMemory.buttons[0].addEventListener('click', PathMemory.SaveRememberedPath);

        PathMemory.buttons[1] = document.getElementById('btn-save-path-memory-cells');
        PathMemory.buttons[1].addEventListener('click', PathMemory.SaveRememberedCells);

        PathMemory.buttons[2] = document.getElementById('btn-path-memory-start');
        PathMemory.buttons[2].addEventListener('click', function() { app.Goto('rt-map-route') });
        

        

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
        MapRoute.Reset();

        // Change MapRoute buttons
        document.querySelectorAll('#rt-map-route .history')[0].style.display = "none";
        document.getElementById('btn-save-path').style.display = "none";
        document.getElementById('btn-save-path-memory').style.display = "block";
        PathMemory.instructions.style.display = "block";

        // Set instructions
        PathMemory.instructions.innerHTML = "1. Please redraw your path on the map";

        // Show MapRoute component
        app.Goto('rt-path-memory-instructions');

    },


    /**
     * SaveRememberedPath()
     */
    SaveRememberedPath: function() {
        PathMemory.rememberedPath = MapRoute.SavePath();
        console.log(PathMemory.rememberedPath);

        // Set MapRoute in path-memory-monster-cells mode
        MapRoute.SetMode('path-memory-monster-cells');
        document.getElementById('btn-save-path-memory').style.display = "none";
        document.getElementById('btn-cancel-single-cell-mode').style.display = "none";
        document.getElementById('btn-cancel-path').style.display = "none";
        
        document.getElementById('btn-save-path-memory-cells').style.display = "block";

        // Set instructions
        PathMemory.instructions.innerHTML = "2. Please tap on the path cells where you picked up monsters";
    
    },


    /**
     * SaveRememberedCells()
     */
    SaveRememberedCells: function() {
        var cells = document.querySelectorAll('td[data-path-memory-selected="1"]');
        for (var i=0; i < cells.length; i++) {
            var cell = cells[i];
            PathMemory.rememberedCells.push({
                'x': MapRoute.GetX(cell),
                'y': MapRoute.GetY(cell),
            });
        }
        console.log(PathMemory.rememberedCells);
    }

};

PathMemory.Initialize();