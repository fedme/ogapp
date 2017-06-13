/**
 *  PMQ: Picked Monsters Questions
 */
var PMQ = {

    /**
     * Properties
     */

    monsters: [],
    currentQuestion: 0,
    buttons: [],
    userAnswers: {
        correct: 0,
        wrong: 0,
        answers: []
    },

    monstersPresented : [
        '5y_re_mustache', '1y_ro_wig', '11r_re_beard', '9r_ro_horns', '8r_ro_antenna', '2y_ro_horn', '4y_re_elvis', '6y_re_wings', '10r_re_viking', '3y_ro_hair', '7r_ro_crown', '12r_re_pipe'
    ],

    monstersDistractors : [
       '1triangle_y_wig', '2triangle_y_horn', '3triangle_r_viking', '4blue_ro_hair', '5blue_re_beard', '6blue_re_pipe', '7y_re_crown', '8r_ro_elvis', '9y_re_antenna', '10r_ro_wingsyellow', '11r_ro_hairbrown', '12y_re_horns2'
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
                PMQ.Setup();
                PMQ.SetHandlers();
                break;
        }

      
    },


    /**
     * Setup()
     */
    Setup: function() {
        PMQ.PreloadImages();
    },


    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        PMQ.buttons[0] = document.getElementById('btn-monsters-question-yes');
        PMQ.buttons[0].addEventListener('click', PMQ.AnswerYes);

        PMQ.buttons[1] = document.getElementById('btn-monsters-question-no');
        PMQ.buttons[1].addEventListener('click', PMQ.AnswerNo);

        PMQ.buttons[2] = document.getElementById('btn-monsters-questions-start');
        PMQ.buttons[2].addEventListener('click', function() { app.Goto('rt-monsters-questions') });

    },


    /**
     * Start()
     */
    Start: function() {
        console.log('PMQ start');

        app.Goto('rt-monsters-questions-instructions');

        // concat and shuffle presented and distractor objects
        PMQ.monsters = PMQ.monstersPresented.concat(PMQ.monstersDistractors);
        PMQ.monsters = app.ArrayShuffle(PMQ.monsters);

        PMQ.AskQuestion();

    },

    /**
     * AskQuestion()
     */
    AskQuestion: function() {

        if (PMQ.currentQuestion > 23) return PMQ.End();
        var img = document.querySelectorAll('#rt-monsters-questions img')[0];
        var monster = PMQ.monsters[PMQ.currentQuestion];
        img.setAttribute('src', 'img/monsters/' + monster + '.png');
    },


    /**
     * AnswerYes()
     */
    AnswerYes: function() {
        PMQ.Answer(true);
    },


    /**
     * AnswerNo()
     */
    AnswerNo: function() {
        PMQ.Answer(false);
    },


    /**
     * Answer()
     */
    Answer: function(answer) {
        var monster = PMQ.monsters[PMQ.currentQuestion];
        var isCorrect = PMQ.CheckAnswer(answer, PMQ.IsMonsterPresented(monster));
        PMQ.userAnswers.answers.push({
            'object': monster,
            'answer': answer,
            'isPresented': PMQ.IsMonsterPresented(monster),
            'isCorrect': isCorrect
        });

        if (isCorrect) PMQ.userAnswers.correct++;
        else PMQ.userAnswers.wrong++;

        PMQ.currentQuestion++;
        PMQ.AskQuestion();
    },


    /**
     * IsMonsterPresented()
     */
    IsMonsterPresented: function(monster) {
        if (monster === null) return false;

        var answer = false;
        
        for (i=0; i < PMQ.monstersPresented.length; i++) {
            if (monster == PMQ.monstersPresented[i]) {
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
        for (var i=0; i < PMQ.monstersPresented; i++) {
            app.ImagesPreload('img/monsters/' + PMQ.monstersPresented[i] + '.png'); 
        }

        for (var i=0; i < PMQ.monstersDistractors; i++) {
            app.ImagesPreload('img/monsters/' + PMQ.monstersDistractors[i] + '.png');
        }
    },


     /**
     * End()
     */
    End: function() {
        PathMemory.Start();
    }


};

PMQ.initialize();