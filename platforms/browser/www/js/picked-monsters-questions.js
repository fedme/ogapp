/**
 *  PMQ: Picked Monsters Questions
 */
var PMQ = {

    /**
     * Properties
     */

    monsters: [], // it gets them from MQ component
    chosenMonsters: [],
    currentQuestion: 0,
    buttons: [],
    userAnswers: {
        correct: 0,
        wrong: 0,
        answers: []
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

        PMQ.buttons[0] = document.getElementById('btn-picked-monsters-question-yes');
        PMQ.buttons[0].addEventListener('click', PMQ.AnswerYes);

        PMQ.buttons[1] = document.getElementById('btn-picked-monsters-question-no');
        PMQ.buttons[1].addEventListener('click', PMQ.AnswerNo);

        PMQ.buttons[2] = document.getElementById('btn-picked-monsters-questions-start');
        PMQ.buttons[2].addEventListener('click', function() { app.Goto('rt-picked-monsters-questions') });

    },


    /**
     * Start()
     */
    Start: function() {
        console.log('PMQ start');

        app.Goto('rt-picked-monsters-questions-instructions');

        PMQ.monsters = app.ArrayShuffle(PMQ.monsters);

        PMQ.AskQuestion();

    },


    /**
     * GetChosenMonsters()
     */
    GetChosenMonsters: function() {
        return PMQ.chosenMonsters;
    },


    /**
     * AskQuestion()
     */
    AskQuestion: function() {

        if (PMQ.currentQuestion > 11) return PMQ.End();
        var img = document.querySelectorAll('#rt-picked-monsters-questions img')[0];
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

        if (answer) {
            PMQ.chosenMonsters.push(monster);
        }

        var isCorrect = PMQ.CheckAnswer(answer, PMQ.IsMonsterPicked(monster));
        PMQ.userAnswers.answers.push({
            'object': monster,
            'answer': answer,
            'isPicked': PMQ.IsMonsterPicked(monster),
            'isCorrect': isCorrect
        });

        if (isCorrect) PMQ.userAnswers.correct++;
        else PMQ.userAnswers.wrong++;

        PMQ.currentQuestion++;
        PMQ.AskQuestion();
    },


    /**
     * IsMonsterPicked()
     */
    IsMonsterPicked: function(monster) {
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
     * CheckAnswer()
     */
    CheckAnswer: function(answer, realAnswer) {
        return answer === realAnswer;
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