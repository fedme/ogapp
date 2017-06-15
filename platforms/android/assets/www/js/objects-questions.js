/**
 *  OQ: Object Questions
 */
var OQ = {

    /**
     * Properties
     */

    objects: [],
    monstersObjects: {},
    currentQuestion: 0,
    buttons: [],
    userAnswers: {
        correct: 0,
        wrong: 0,
        answers: []
    },

    objectsPresented : [
        "bol", "chaussure", "ciseaux", "cle", "fourchette", "gateau", "lunettes", "marteau", "montre", "pantalon", "pomme", "vis"
    ],

    objectsDistractors : [
        "chapeau", "cuillere", "livre", "oeuf", "scie", "serrure"
    ],
    
    
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
                OQ.Setup();
                OQ.SetHandlers();
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

        OQ.buttons[0] = document.getElementById('btn-show-objects-placement');
        OQ.buttons[0].addEventListener('click', OQ.ObjectPlacement);

        OQ.buttons[1] = document.getElementById('btn-go-objects-questions');
        OQ.buttons[1].addEventListener('click', OQ.ObjectQuestionsSetupDialog);

        OQ.buttons[2] = document.getElementById('btn-objects-question-yes');
        OQ.buttons[2].addEventListener('click', OQ.AnswerYes);

        OQ.buttons[3] = document.getElementById('btn-objects-question-no');
        OQ.buttons[3].addEventListener('click', OQ.AnswerNo);

        OQ.buttons[4] = document.getElementById('btn-objects-questions-start');
        OQ.buttons[4].addEventListener('click', function() { app.Goto('rt-objects-questions') });

    },


    /**
     * Start()
     */
    Start: function() {
        console.log('OQ start');

        app.Goto('rt-objects-placement');
        
        // Shuffle objects and populate objects property
        OQ.objectsPresented = app.ArrayShuffle(OQ.objectsPresented);

        for (var i=0; i < MQ.monstersPresented.length; i++) {
            var monster = MQ.monstersPresented[i];
            OQ.monstersObjects[monster] = OQ.objectsPresented[i];
        }

        console.log(OQ.monstersObjects);

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

        document.getElementById('btn-go-objects-questions').style.display = "inline-block";

    },


    /**
     * ObjectQuestionsSetupDialog()
     */
    ObjectQuestionsSetupDialog: function() {
      navigator.notification.confirm(
            'Have you placed the objects as showed on the screen?', // message
            OQ.ObjectQuestionsSetup,            // callback to invoke with index of button pressed
            'Are you sure?',           // title
            ['Yes','No']     // buttonLabels
        );
    },


    /**
     * ObjectQuestionsSetup()
     */
    ObjectQuestionsSetup: function(buttonIndex) {
        if (buttonIndex !== 1) return;

        // concat and shuffle presented and distractor objects
        OQ.objects = OQ.objectsPresented.concat(OQ.objectsDistractors);
        OQ.objects = app.ArrayShuffle(OQ.objects);

        OQ.AskQuestion();
        app.Goto('rt-objects-questions-instructions');
    },


    /**
     * AskQuestion()
     */
    AskQuestion: function() {

        if (OQ.currentQuestion > 17) return OQ.End();
        var img = document.querySelectorAll('#rt-objects-questions img')[0];
        var object = OQ.objects[OQ.currentQuestion];
        img.setAttribute('src', 'img/objects/' + object + '.jpg');
    },


    /**
     * AnswerYes()
     */
    AnswerYes: function() {
        OQ.Answer(true);
    },


    /**
     * AnswerNo()
     */
    AnswerNo: function() {
        OQ.Answer(false);
    },


    /**
     * Answer()
     */
    Answer: function(answer) {
        var object = OQ.objects[OQ.currentQuestion];
        var isCorrect = OQ.CheckAnswer(answer, OQ.IsObjectInUserPath(object)); // Change HERE
        OQ.userAnswers.answers.push({
            'object': object,
            'answer': answer,
            'inUserPath': OQ.IsObjectInUserPath(object),
            'isPresented': OQ.IsObjectPresented(object),
            'isCorrect': isCorrect
        });

        if (isCorrect) OQ.userAnswers.correct++;
        else OQ.userAnswers.wrong++;

        OQ.currentQuestion++;
        OQ.AskQuestion();
    },


    /**
     * IsObjectInUserPath()
     */
    IsObjectInUserPath: function(object) {
        if (object === null) return false;

        var answer = false;
        var userMonsters = MapRoute.userPaths[MapRoute.userPathIndex].monsters;
        for (i=0; i < userMonsters.length; i++) {
            if (object == OQ.monstersObjects[userMonsters[i]]) {
                answer = true;
                break;
            }
        }

        return answer;
    },


     /**
     * IsMonsterInUserPath()
     */
    IsMonsterInUserPath: function(monster) {
        if (monster === null) return false;

        var answer = false;
        var userMonsters = MapRoute.userPaths[MapRoute.userPathIndex].monsters;
        for (i=0; i < userMonsters.length; i++) {
            if (monster == userMonsters[i]) {
                answer = true;
                break;
            }
        }

        return answer;
    },


    /**
     * IsObjectPresented()
     */
    IsObjectPresented: function(object) {
        if (object === null) return false;

        var answer = false;
        
        for (i=0; i < OQ.objectsPresented.length; i++) {
            if (object == OQ.objectsPresented[i]) {
                answer = true;
                break;
            }
        }

        return answer;
    },


    /**
     * CheckAnswer()
     */
    CheckAnswer: function(answer, realAnswer) {
        return answer === realAnswer;
    },


    /**
     * PreloadImages()
     */
    PreloadImages: function() {
        for (var i=0; i < OQ.objectsPresented; i++) {
            app.ImagesPreload('img/objects/' + OQ.objectsPresented[i] + '.jpg'); 
        }

        for (var i=0; i < OQ.objectsDistractors; i++) {
            app.ImagesPreload('img/objects/' + OQ.objectsDistractors[i] + '.jpg');
        }
    },


     /**
     * End()
     */
    End: function() {

        if (app.data.orderFirst == "oq") { // OQ was first, so start PathMemory
            PathMemory.Start();
        }
        else { // OQ was second, so start MQ
            MQ.Start();
        }
        
    }



};

OQ.initialize();