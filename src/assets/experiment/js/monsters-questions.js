/**
 *  MQ: Monsters Questions
 */
var MQ = {

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
                MQ.Setup();
                MQ.SetHandlers();
                break;
        }

      
    },


    /**
     * Setup()
     */
    Setup: function() {
        MQ.PreloadImages();
    },


    /**
     * SetHandlers()
     */
    SetHandlers: function() {

        MQ.buttons[0] = document.getElementById('btn-monsters-question-yes');
        MQ.buttons[0].addEventListener('click', MQ.AnswerYes);

        MQ.buttons[1] = document.getElementById('btn-monsters-question-no');
        MQ.buttons[1].addEventListener('click', MQ.AnswerNo);

        MQ.buttons[2] = document.getElementById('btn-monsters-questions-start');
        MQ.buttons[2].addEventListener('click', function() { app.Goto('rt-monsters-questions') });

    },


    /**
     * Start()
     */
    Start: function() {
        console.log('MQ start');

        app.Goto('rt-monsters-questions-instructions');

        // concat and shuffle presented and distractor objects
        MQ.monsters = MQ.monstersPresented.concat(MQ.monstersDistractors);
        MQ.monsters = app.ArrayShuffle(MQ.monsters);

        MQ.AskQuestion();

    },

    /**
     * AskQuestion()
     */
    AskQuestion: function() {

        if (MQ.currentQuestion > 23) return MQ.End();
        var img = document.querySelectorAll('#rt-monsters-questions img')[0];
        var monster = MQ.monsters[MQ.currentQuestion];
        img.setAttribute('src', 'img/monsters/' + monster + '.png');
    },


    /**
     * AnswerYes()
     */
    AnswerYes: function() {
        MQ.Answer(true);
    },


    /**
     * AnswerNo()
     */
    AnswerNo: function() {
        MQ.Answer(false);
    },


    /**
     * Answer()
     */
    Answer: function(answer) {
        var monster = MQ.monsters[MQ.currentQuestion];
        var isCorrect = MQ.CheckAnswer(answer, MQ.IsMonsterPresented(monster));
        MQ.userAnswers.answers.push({
            'object': monster,
            'answer': answer,
            'isPresented': MQ.IsMonsterPresented(monster),
            'isCorrect': isCorrect
        });

        if (isCorrect) MQ.userAnswers.correct++;
        else MQ.userAnswers.wrong++;

        MQ.currentQuestion++;
        MQ.AskQuestion();
    },


    /**
     * IsMonsterPresented()
     */
    IsMonsterPresented: function(monster) {
        if (monster === null) return false;

        var answer = false;
        
        for (i=0; i < MQ.monstersPresented.length; i++) {
            if (monster == MQ.monstersPresented[i]) {
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
        for (var i=0; i < MQ.monstersPresented; i++) {
            app.ImagesPreload('img/monsters/' + MQ.monstersPresented[i] + '.png'); 
        }

        for (var i=0; i < MQ.monstersDistractors; i++) {
            app.ImagesPreload('img/monsters/' + MQ.monstersDistractors[i] + '.png');
        }
    },


     /**
     * End()
     */
    End: function() {
        app.End();
    }


};

MQ.initialize();