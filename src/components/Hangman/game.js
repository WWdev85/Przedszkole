import Quote from './quote';

class Game{



    constructor({ 
        letters,
        category,
        word,
        output,
        images,
        }) {
            this.letters = letters;
            this.category = category;
            this.word = word;
            this.output = output;
            this.images =images;

            this.dataBase = [
                {   text: "polska",
                    cat: "Państwo",
                },
                {   text: "czechy",
                    cat: "Państwo",
                },
                {   text: "norwegia",
                    cat: "Państwo",
                },
                {   text: "stany zjednoczone",
                    cat: "Państwo",
                },
                {   text: "mołdawia",
                    cat: "Państwo",
                },
                {   text: "luksemburg",
                    cat: "Państwo",
                },
                {   text: "czarnogóra",
                    cat: "Państwo",
                },
            ];

            this.currentStep = 0;
            this.lastStep = 7;

            const {text , cat} = this.dataBase[Math.floor(Math.random() * this.dataBase.length)];
            this.category.innerHTML = cat;
            this.quote = new Quote(text);

         
    };

    guess(letter, event){
     
        if(this.quote.guess(letter)){
            this.drawQuote();
        }else{
            this.currentStep++;
            this.images[this.currentStep].classList.add("hangman__image--active"); 
        }
        event.target.disabled = true;
        if(this.currentStep == this.lastStep){
            this.loosing();
        }
    }


    drawLetters(){
        const letters = [..."aąbcćdeęfghijklłmnńoóprsśtuwxyzźż"];
        
        for(let letter of letters){
            const button = document.createElement('button');
            button.className="hangman__keyboard-letter";
            button.innerHTML = letter;
            button.addEventListener('click', (event) => this.guess(letter, event))
            this.letters.appendChild(button);
        }
    }

    drawQuote(){
        const content = this.quote.getContent();
        this.word.textContent = content;
        if(!content.includes('_')){
            this.winning();
        }
    }


    start() {
       this.images[this.currentStep].classList.add("hangman__image--active"); 
       this.drawLetters();
       this.drawQuote();

    }

    winning(){
        this.word.innerHTML = 'GRATULACJE! WYGRYWASZ',
        this.letters.innerHTML = '';
    }

    loosing() {
        this.word.innerHTML = 'PRZEGRYWSZ! KONIEC GRY',
        this.letters.innerHTML = '';
    }

    newGame() {
        this.currentStep = 0;
        
        for(let i = 0; i < this.lastStep + 1; i++){
            this.images[i].classList.remove("hangman__image--active");
        }
        this.letters.innerHTML = '';
        const {text , cat} = this.dataBase[Math.floor(Math.random() * this.dataBase.length)];
            this.category.innerHTML = cat;
            this.quote = new Quote(text);
        this.start();
    }

};

export default Game;