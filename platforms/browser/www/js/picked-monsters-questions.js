/**
 *  PMQ: Picked Monsters Questions
 */
var PMQ = {

    /**
     * Properties
     */

    monsters: [], // it gets them from MQ component
    chosenMonsters: [],
    correctRememberedPickedMonsters: 0,
    buttons: [],
    
    
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
                PMQ.Setup();
                PMQ.SetHandlers();
                break;
        }

      
    },


    /**
     * Setup()
     */
    Setup: function() {
        PMQ.monsters = MQ.monstersPresented;
    },


    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        PMQ.buttons[0] = document.getElementById('btn-picked-monsters-questions-start');
        PMQ.buttons[0].addEventListener('click', function() { app.Goto('rt-picked-monsters-questions') });

        PMQ.buttons[1] = document.getElementById('btn-pmq-end');
        PMQ.buttons[1].addEventListener('click', PMQ.DoneDialog);

    },


    /**
     * Start()
     */
    Start: function() {
        console.log('PMQ start');

        app.Goto('rt-picked-monsters-questions-instructions');

        PMQ.monsters = app.ArrayShuffle(PMQ.monsters);

        var container1 = document.getElementById('btn-container-1');
        var container2 = document.getElementById('btn-container-2');

        // Create monsters grid
        for (var i = 0; i < PMQ.monsters.length; i++) {
            var monster = PMQ.monsters[i];
            var node = document.createElement('img');
            node.setAttribute('src', 'img/monsters/' + monster + '.png');
            node.setAttribute('data-monster', monster);
            node.setAttribute('data-selected', 'false');

            node.addEventListener('click', PMQ.TappedMonster);

            if (i < PMQ.monsters.length / 2) {
                container1.appendChild(node);
            }
            else {
                container2.appendChild(node);
            }
            
        }

    },


    /**
     * TappedMonster()
     */
    TappedMonster: function(evt) {
        var selected = (evt.target.getAttribute('data-selected') == "false") ? true : false;
        evt.target.setAttribute('data-selected', selected);
    },


    /**
     * DoneDialog()
     */
    DoneDialog: function() {
        navigator.notification.confirm(
            'Are you sure?', // message
            PMQ.DoneDialogCallback,            // callback to invoke with index of button pressed
            'Are you sure"',           // title
            ['Yes','No']     // buttonLabels
        );
    },


    /**
     * DoneDialogCallback
     */
    DoneDialogCallback: function(buttonIndex) {
        if (buttonIndex !== 1) return;

        PMQ.ParseChosenMonsters();
        PMQ.End();
    },


    /**
     * ParseChosenMonsters()
     */
    ParseChosenMonsters: function() {
        var nodes = document.querySelectorAll('#rt-picked-monsters-questions img[data-selected="true"]');
        for (var i = 0; i < nodes.length; i++) {
            var monster = nodes[i].getAttribute('data-monster');
            PMQ.chosenMonsters.push(monster);
            if (PMQ.WasPickedMonster(monster)) {
                PMQ.correctRememberedPickedMonsters++;
            }
        }
    },


    /**
     * WasPickedMonster()
     */
    WasPickedMonster: function(monster) {
        if (monster === null) return false;

        var answer = false;

        var userMonsters = MapRoute.GetChosenPathMonsters();
        for (i=0; i < userMonsters.length; i++) {
            if (monster == userMonsters[i]) {
                answer = true;
                break;
            }
        }

        return answer;
    },


    /**
     * GetChosenMonsters()
     */
    GetChosenMonsters: function() {
        return PMQ.chosenMonsters;
    },


     /**
     * End()
     */
    End: function() {
        console.log('PMQ end');
        PathMemory.StartMonsterCells();
    }


};

PMQ.initialize();