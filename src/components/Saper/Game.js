import Cell from './Cell';
import UI from './UI';
import Counter from './Counter';
import Timer from './Timer';
import Reset from './ResetButton';
import Modal from './Modal';

class Game extends UI{

    config = {
        easy: {
            rows:8,
            cols:8,
            mines:10,
        },
        medium: {
            rows:16,
            cols:16,
            mines:40,
        },
        expert: {
            rows:16,
            cols:30,
            mines:99,
        },
    }

    counter = new Counter();
    timer = new Timer();
    modal = new Modal();

    numberOfRows = null;
    numberOfCols = null;
    numberOfMines = null;
    isGameFinished = false;

    cells = [];
    cellsElements = null;
    cellsToReveal = 0;
    revealedCells = 0;

    board = null;
    game = null;

    buttons = {
        modal: null,
        easy: null,
        medium: null,
        expert: null,
        reset: new Reset(),
    }

   
    initializeGame(){
        this.handleElements();
        this.counter.init();
        this.timer.init();
        this.addButtonsEventListeners();
        this.newGame();
    }

    generateCells(){
        this.cells.length = 0;
        for( let row = 0; row < this.numberOfRows; row++){
            this.cells[row] = [];
            for(let col = 0; col < this.numberOfCols; col++){
                this.cells[row].push(new Cell(col,row));
            }

        }
    }

    renderBoard(){
        
        while(this.board.firstChild){
            this.board.removeChild(this.board.lastChild);
        }
        this.cells.flat().forEach(cell => {
            this.board.insertAdjacentHTML('beforeend', cell.createElement());
            cell.element = cell.getElement(cell.selector);
        
        })
    }

    placeMinesInCells(){
        let minesToPlace = this.numberOfMines;

        while(minesToPlace){
            const rowIndex = this.getRandomInteger(0, this.numberOfRows - 1); 
            const colIndex = this.getRandomInteger(0, this.numberOfCols -1); 

            const cell = this.cells[rowIndex][colIndex];
         
            const hasCellMine = cell.isMine;
            if(!hasCellMine){
                cell.addMine();
                minesToPlace--;
            }
         }


    }

    getRandomInteger(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleCellClick = (e) =>{
        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y'), 10);
        const colIndex = parseInt(target.getAttribute('data-x'), 10);
        const cell =  this.cells[rowIndex][colIndex];
        this.clickCell(cell);
    }

    clickCell(cell){
        if(this.isGameFinished || cell.isFlagged ){
            return;
        }
        if(cell.isMine) {
            this.endGame(false);
        }
        this.setCellValue(cell);
    

        if(this.revealedCells == this.cellsToReveal && !this.isGameFinished){
            this.endGame(true);
        }
    }

    setCellValue(cell){
        let minesCount = 0;
        for (let rowIndex = Math.max(cell.y -1 ,0); rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1); rowIndex++){
           for(let colIndex = Math.max(cell.x -1, 0); colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1); colIndex++){
               if(this.cells[rowIndex][colIndex].isMine){
                   minesCount++;
               }
           } 
        }
        cell.value = minesCount;
        cell.revealCell();
        this.revealedCells ++;
        if(!cell.value){
            for (let rowIndex = Math.max(cell.y -1 ,0); rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1); rowIndex++){
                for(let colIndex = Math.max(cell.x -1, 0); colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1); colIndex++){
                    if(!this.cells[rowIndex][colIndex].isReveal){
                       this.clickCell(this.cells[rowIndex][colIndex]);
                    }
                } 
             }
        }
    }

    handleCellContextMenu = (e) => {
        e.preventDefault();
        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y'), 10);
        const colIndex = parseInt(target.getAttribute('data-x'), 10);
        const cell = this.cells[rowIndex][colIndex];

        if(cell.isReveal || this.isGameFinished) return;

        if(cell.isFlagged){
            this.counter.increment();  
            cell.toggleFlag();
            return;
        }

        if(!!this.counter.value){
            this.counter.decrement();
            cell.toggleFlag();
        }

        
    }

    newGame(rows = this.config.easy.rows, cols = this.config.easy.cols, mines = this.config.easy.mines){
        this.numberOfRows = rows;
        this.numberOfCols = cols;
        this.numberOfMines = mines;

        this.counter.setValue(this.numberOfMines);
        this.timer.resetTimer();

        this.cellsToReveal = this.numberOfCols * this.numberOfRows - this.numberOfMines;
  
        this.generateCells();
        this.renderBoard();
        this.placeMinesInCells();

        this.cellsElements = this.getElements(this.UiSelectors.cell);

        this.buttons.reset.changeEmotion('neutral');
        this.isGameFinished = false;
        this.revealedCells = 0;
        this.addCellsEventListeners();
    }

    endGame(isWin){
        this.isGameFinished = true;
        this.timer.stopTimer();
        this.modal.buttonText = "Zamknij";
        if(!isWin){
            this.revealMines();
            this.modal.infoText = "Przegrywasz! Spróbuj jeszcze raz.";
            this.buttons.reset.changeEmotion('negative');
            this.modal.setText();
            this.modal.toggleModal();
            return;
        }
        console.log(isWin);
        this.modal.infoText = this.timer.numberOfSeconds < this.timer.maxNumberOfSeconds ? `Wygrywasz! Twój czas to ${this.timer.numberOfSeconds} sekund , gratulacje.` :  " Wygrwasz! Gratulacje!";
        this.buttons.reset.changeEmotion('positive');
        this.modal.setText();
        this.modal.toggleModal();
    }    
    
    revealMines(){
        this.cells.flat().filter((cell) => cell.isMine).forEach((cell) => cell.revealCell());
    }

    handleElements(){
        this.board = this.getElement(this.UiSelectors.board);
        this.game  = this.getElement(this.UiSelectors.game);
        this.buttons.modal = this.getElement(this.UiSelectors.modalButton);
        this.buttons.easy = this.getElement(this.UiSelectors.easyButton);
        this.buttons.medium = this.getElement(this.UiSelectors.mediumButton);
        this.buttons.expert = this.getElement(this.UiSelectors.expertButton);
    }
    
    
    

    addCellsEventListeners(){
        this.cellsElements.forEach((element) => {
            element.addEventListener('click', this.handleCellClick);
            element.addEventListener('contextmenu', this.handleCellContextMenu);
        })
    }

    removeCellsEventListeners(){
        this.cellsElements.forEach((element) => {
            element.removeEventListener('click', this.handleCellClick);
            element.removeEventListener('contextmenu', this.handleCellContextMenu);
        })
    }

    addButtonsEventListeners(){
        this.modal.button.addEventListener('click',  this.modal.toggleModal);
        this.buttons.easy.addEventListener('click', () => this.handleNewGameClick(this.config.easy.rows, this.config.easy.cols, this.config.easy.mines, "easy"));
        this.buttons.medium.addEventListener('click', () => this.handleNewGameClick(this.config.medium.rows, this.config.medium.cols, this.config.medium.mines, "medium"));
        this.buttons.expert.addEventListener('click', () => this.handleNewGameClick(this.config.expert.rows, this.config.expert.cols, this.config.expert.mines, "expert"));
        this.buttons.reset.element.addEventListener('click', ()=> this.handleNewGameClick());
    }

    handleNewGameClick(rows = this.numberOfRows, cols = this.numberOfCols, mines = this.numberOfMines, difficulty){
        
        if(difficulty){
            this.game.classList = `saper saper--${difficulty}`;
        }
        this.removeCellsEventListeners()
        this.newGame(rows, cols, mines);
    }
}

export default Game;