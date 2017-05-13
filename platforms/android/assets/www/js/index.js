/**
 * app : OG App
 */
var app = {

    /**
     * Properties
     */
    buttons: [],
    preloadedImages: [],
    initialTimeStamp: null,
    data: {
        'uid': 0,
        'duration': 0,
        'date': null,
        'chosenPath': null,
        'allPaths': null,
        'objectsQuestions': null,
        'monstersQuestions': null
    },


    
    /**
     * Cordova: initialize()
     */
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    /**
     * Cordova: onDeviceReady()
     */
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    
    /**
     * Cordova: receivedEvent()
     */
    receivedEvent: function(id) {

        switch (id) {
            case 'deviceready':
                this.Setup();
                app.SetHandlers();
                break;
        }

        console.log('Received Event: ' + id);
    },


    /**
     * Setup()
     */
    Setup: function() {

        // Immersive mode
        AndroidFullScreen.immersiveMode();

        // Routes setup
        var routes = document.querySelectorAll('div.route'), i;
        for (i = 0; i < routes.length; ++i) {
            routes[i].style.display = 'none';
        }
        var route = document.getElementById('rt-start');
        route.style.display = 'block';

        // Routes buttons setup
        var buttons = document.querySelectorAll('button[data-href]'), i;
        for (i = 0; i < buttons.length; ++i) {
            buttons[i].addEventListener('click', app.ButtonGoto);
        }

        // Enter pinned mode
        window.plugins.locktask.startLockTask(
            function() {
                console.log('Entered lock mode');
            }, 
            function(error) {
                console.log('Error in entering lock mode: ' + error);
            }
        );

        app.SetupDb();

    },


    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        app.buttons[0] = document.getElementById('btn-initial-form');
        app.buttons[0].addEventListener('click', app.InitialFormSubmit);

        app.buttons[1] = document.getElementById('btn-app-restart');
        app.buttons[1].addEventListener('click', app.Restart);

    },


    /**
     * SetupDb()
     */
    SetupDb: function() {

        app.db = window.sqlitePlugin.openDatabase({name: 'data.db', location: 'default'});

        app.db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS data (date, uid, data)');      
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Created database table OK');
            app.GetStats();
        });
    },


    /**
     * InitialFormSubmit()
     */
    InitialFormSubmit: function() {
        var input = document.getElementById('uid-input');
        if (input.value == null || input.value == "") return;

        app.data.uid = input.value;
        app.initialTimeStamp = new Date();

        var topbarUid = document.getElementById('user-id');
        if (topbarUid) topbarUid.innerHTML = 'User ID: ' + app.data.uid;

        app.Goto('rt-map-route');
    },


    /**
     * ButtonGoto()
     */
    ButtonGoto: function(evt) {
        var href = evt.target.getAttribute('data-href');
        app.Goto(href);
        return true;
    },


    /**
     * Goto()
     */
    Goto: function(href) {
        var route = document.getElementById(href);
        if (route != null) {
            var routes = document.querySelectorAll('div.route'), i;
            for (i = 0; i < routes.length; ++i) {
                routes[i].style.display = 'none';
            }
            route.style.display = 'block';
        }
    },


    /**
     * ArrayShuffle()
     */
    ArrayShuffle: function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },


    /**
     * ImagesPreload()
     */
    ImagesPreload: function () {
        var baseIndex = app.preloadedImages.length - 1;
        for (var i = 0; i < arguments.length; i++) {
            images[baseIndex + i] = new Image();
            images[baseIndex + i].src = preload.arguments[i];
        }
    },


    /**
     * End()
     */
    End: function() {
        app.Goto('rt-end');
        app.SaveData();
    },


    /**
     * Restart()
     */
    Restart: function() {
        location.reload(); 
    },


    /**
     * SaveData()
     */
    SaveData: function() {

        var currentTimeStamp = new Date();
        app.data.date = currentTimeStamp;
        app.data.duration = (currentTimeStamp - app.initialTimeStamp) / 1000;
        app.data.chosenPath = MapRoute.userPaths[MapRoute.userPathIndex];
        app.data.allPaths = MapRoute.userPaths;
        app.data.objectsQuestions = OQ.userAnswers;
        app.data.monstersQuestions = MQ.userAnswers;

        console.log('# Saving Data...');
        console.log(app.data);

        app.SaveDataToDb();

        app.PrintDataDebug();
        
    },


    /**
     * SaveDataToDb()
     */
    SaveDataToDb: function() {
        app.db.transaction(function(tx) {
            console.log('Saving data in DB');
            console.log('with uid: ' + app.data.uid);
            tx.executeSql('INSERT INTO data VALUES (DateTime(\'now\'), ?,?)', [app.data.uid, JSON.stringify(app.data)]);
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Inserted final data in DB');
            var debugOut = document.getElementById('debug-out');
            if (debugOut) debugOut.innerHTML = debugOut.innerHTML + '<br><span style="color:red">DATA SAVED IN THE DATABASE</span>'
        });
    },


    /**
     * GetStats()
     */
    GetStats: function() {
        app.db.transaction(function(tx) {
            tx.executeSql('SELECT count(*) AS mycount FROM data', [], function(tx, res) {
                if (res.rows.length > 0) {
                    var records = res.rows.item(0).mycount;
                    var statsRecords = document.getElementById('stats-records');
                    if (statsRecords) statsRecords.innerHTML = 'Records in DB: ' + records;
                }
            }, function(error) {
                console.log('SELECT SQL statement ERROR: ' + error.message);
            });


        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            
        }); 
    },


    /**
     * DebugData()
     * Debugs data from DB in js console
     */
    DebugData: function() {
        console.log('# Debug data');
        var arr = [];  
        app.db.executeSql('SELECT * FROM data', [], function(res) {
            if (res.rows.length > 0) {
                for (var i = res.rows.length - 1; i >= 0; i--) {
                    arr.push(res.rows.item(i));
                }
            }
            console.log('[DEBUG] DATA FROM DB:');
            //console.log(arr);
            for (var i=0; i <= arr.length; i++) {
                console.log('#### uid: ' + arr[i].uid + ' on date: ' + arr[i].date + ' ####');
                console.log(JSON.parse(arr[i].data));
            }
        }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    },


    /**
     * SaveDataOnline()
     */
    SaveDataOnline: function() {
        app.db.executeSql('SELECT * FROM data', [], function(res) {
            console.log('[ONLINE SAVE DATA]');
            if (res.rows.length > 0) {
                var records = [];

                for (var i = res.rows.length - 1; i >= 0; i--) {
                    records.push({'date': res.rows.item(i).date, 'uid': res.rows.item(i).uid, 'data': JSON.parse(res.rows.item(i).data)});
                    console.log(records[i]);
                }

                $.post("https://isearch.raimaj.me/ogapp/savedata.php",{
                    data: JSON.stringify(records),
                });

            }

        }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
        
    },


    /**
     * DestroyDb()
     */
    DestroyDb: function() {
        window.sqlitePlugin.deleteDatabase({name: 'data.db', location: 'default'}, function() {
            console.log('DB deleted');
        },
        function() {
            console.log('ERROR in deleting DB');
        });
    },


    /**
     * PrintDataDebug()
     */
    PrintDataDebug: function() {
        var debugOut = document.getElementById('debug-out');
        debugOut.innerHTML = 
            'uid: ' + app.data.uid + '<br>' +
            'exp duration: ' + app.data.duration + ' seconds <br>' +
            'paths drawn: ' + app.data.allPaths.length + '<br><br>' +

            'chosen path length: ' + app.data.chosenPath.pathLength + '<br>' +
            'chosen path turns: ' + app.data.chosenPath.pathTurns + '<br>' +
            'picked monsters: ' + app.data.chosenPath.nMonsters + '<br><br>' +

            'object questions correct: ' + app.data.objectsQuestions.correct + '<br>' +
            'object questions wrong: ' + app.data.objectsQuestions.wrong + '<br><br>' +

            'monsters questions correct: ' + app.data.monstersQuestions.correct + '<br>' +
            'monsters questions wrong: ' + app.data.monstersQuestions.wrong + '<br><br>';
    }


};

app.initialize();