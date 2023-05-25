// fetch five letters from datamuse API
async function fetchFiveLetterWords() {
    try {
        const response = await fetch (`https://api.datamuse.com/words?sp=?????&max=1000`);

        const data = await response.json ();

        // extract the words from JSON and return

        const fiveLetterWords = data.map((word) => word.word);
        return fiveLetterWords;
    } catch (error) {
        console.log (`Error fetching words: $(error)`);
    }
}

async function startGame () {

    const words = await fetchFiveLetterWords();
    // console.log(words);
    const wordSet = new Set (words);
    const keyboard = document.getElementById(`keyboard`);
    let guess = '';
    let activeRowNumber = 1;

    function getRandomWord() {
        const index = Math.floor(Math.random() * words.length);
        return words[index];
    }

    const secretWord = getRandomWord();
    console.log('secretWord:', secretWord);

    window.addEventListener('keyup', handleKeyEvent);
    keyboard.addEventListener('click', handleKeyEvent);

    function handleKeyEvent(event) {
        const { letter, backspace } = getKeys(event);


        if (letter || backspace){
            if (!backspace) {
                if (letter === 'enter') {

                } else {
                    handleGuessLetter(letter)
                }
            } else {

            }
        }

    }

    function getKeys(event) {
        const eventType = event.type;
        const keys = { letter: null, backspace: false };

        if (eventType === 'keyup') {
           if (event.code.toLowerCase().includes('key')) {
            keys.letter = event.key;
           } 
           
           else {
            keys.letter = event.code.toLowerCase() === 'enter' ? 'enter' : null;
           }

           keys.backspace = event.key.toLowerCase() === 'backspace';
        }
        
        else {
            keys.letter = event.target.classList.contains('keyboard-letter') ? event.target.textContent : null;
            keys.backspace = event.target.classList.contains('fa-delete-left') || event.target.innerHTML.includes('fa-delete-left');
        }

        return keys;
    }

    function handleGuessLetter(letter) {
        if (guess.length < 5) {
            guess += letter;
            showGuessOnBoard(letter)
        } else {
            alert(`You have already entered 5 letters for this guess!`)
        }
    }

    function showGuessOnBoard(letter) {
        const activeRow = document.querySelector(`.board-row--${activeRowNumber}`);

        for (let rowBoardLetter of activeRow.children) {
            const rowBoardLetterSpan = rowBoardLetter.querySelector('span');
            if (rowBoardLetterSpan.textContent) {
                rowBoardLetterSpan.classList.add('letter-enter');
                rowBoardLetterSpan.textContent = letter;
                return;
            }
            
        }
    }

}

startGame();
