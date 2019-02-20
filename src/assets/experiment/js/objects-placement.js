/**
 *  OP: Object Placements
 */
var OP = {

    /**
     * Properties
     */
    
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
                OP.Setup();
                OP.SetHandlers();
                break;
        }

    
    },


    /**
     * Setup()
     */
    Setup: function() {
        OQ.PreloadImages();
    },

    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        OP.buttons[0] = document.getElementById('btn-show-objects-placement');
        OP.buttons[0].addEventListener('click', OP.ObjectPlacement);

        OP.buttons[1] = document.getElementById('btn-objects-placement-end');
        OP.buttons[1].addEventListener('click', OP.EndDialog);


    },


    /**
     * Start()
     */
    Start: function() {
        console.log('OP start');

        app.Goto('rt-objects-placement');
        
        OQ.ShuffleObjects();

    },


    /**
     * ObjectPlacement()
     */
    ObjectPlacement: function() {

        var list = document.querySelectorAll('#rt-objects-placement ul')[0];
        list.innerHTML = '';
        document.body.style.overflowY = 'scroll';

        for (var i=0; i < MQ.monstersPresented.length; i++) {
            var monster = MQ.monstersPresented[i];
            var object = OQ.monstersObjects[monster];
            if (OQ.IsMonsterInUserPath(monster)) {
                list.innerHTML = list.innerHTML + '<li><img src="img/monsters/' + monster +'.png"><img src="img/objects/' + object +'.jpg"></li>';
            }  
        }

        document.getElementById('btn-objects-placement-end').style.display = "inline-block";

    },


    /**
     * EndDialog()
     */
    EndDialog: function() {
    //   navigator.notification.confirm(
    //         'Have you placed the objects as showed on the screen?', // message
    //         OP.End,            // callback to invoke with index of button pressed
    //         'Are you sure?',           // title
    //         ['Yes','No']     // buttonLabels
    //     );
        if (window.confirm("Have you placed the objects as showed on the screen?")) { 
            OP.End(1);
        }
    },


    
     /**
     * End()
     */
    End: function(buttonIndex) {

        if (buttonIndex !== 1) return;

        if (app.data.orderFirst == "oq") {
            OQ.Start();
        }
        else {
            PathMemory.Start();
        }
        
    }



};

OP.initialize();