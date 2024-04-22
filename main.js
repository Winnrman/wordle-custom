let initialWord = "HELLO";

//define a string for the alphabet
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//define a list of words to use which are 5 letters long
const words = [
    'ZEBRA', 'XYLOL', 'WRATH', 'VROOM', 'ULTRA', 'TWAIN', 'SWOON', 'RIVEN', 'QUART', 'PRISM',
    'OPINE', 'NYMPH', 'MYTH', 'LYCEE', 'LYMPH', 'KNOLL', 'JUNTA', 'IMPEL', 'HUNCH', 'GYPSY',
    'FROND', 'EPHOD', 'DINGO', 'COMET', 'BLIMP', 'AMITY', 'AGLOW', 'YAHOO', 'ZALMO', 'XEBEC',
    'WRACK', 'VROOM', 'UMIAK', 'TWANG', 'SWART', 'RHINO', 'QUEAN', 'PROMO', 'OVERT', 'NYLGH',
    'MZUNB', 'LYART', 'LYPSK', 'KEEST', 'JINNI', 'IODIC', 'HUNKY', 'GULCH', 'FRUMP', 'ENAMI',
    'DEMIT', 'CAPON', 'BAWDY', 'APORT', 'AIDAS', 'YODEL', 'YAWLS', 'ZAMAN', 'XYSTL', 'WREST',
    'VOZHD', 'UNZIP', 'TWILL', 'SWISH', 'RIVEN', 'QUERY', 'PYRIC', 'OVOID', 'NYMIL', 'MOITY',
    'LYNXO', 'KVASS', 'JOCKO', 'IMBUE', 'HOVER', 'GUYOT', 'FRITH', 'ENOKI', 'DENIM', 'COVEN',
    'BUXOM', 'ABACA', 'ADORE', 'YAMEN', 'YAWNS', 'ZAMAN', 'XENON', 'WRICK', 'VOZHD', 'UNWIN',
    'TWINK', 'SWINE', 'RIVEN', 'QUIRT', 'PYLON', 'OVOID', 'NYJAH', 'MOITY', 'LYNXO', 'KVASS',
    'JOCKO', 'IMBUE', 'HOVER', 'GUYOT', 'FRITH', 'ENOKI', 'DENIM', 'COVEN', 'BUXOM', 'ABACA',
    'ADORE', 'YAMEN', 'YAWNS', 'ZAMAN', 'XENON', 'WRICK', 'VOZHD', 'UNWIN', 'TWINK', 'SWINE',
    'RIVEN', 'QUIRT', 'PYLON', 'OVOID', 'NYJAH', 'MOITY', 'LYNXO', 'KVASS', 'JOCKO', 'IMBUE',
    'HOVER', 'GUYOT', 'FRITH', 'ENOKI', 'DENIM', 'COVEN', 'BUXOM', 'ABACA', 'ADORE', 'YAMEN',

  ];

let finalWord = words[Math.floor(Math.random() * words.length)];

let guesses = 0;

let maxGuesses = 5;

let wordLength = 5;

//define the colors for the boxes based on the length from the initial word
let colors = [
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900",
]

//get the distance between each letter of the initial word and the final word
let distances = [];
for (let i = 0; i < initialWord.length; i++) {
    let initialLetter = initialWord[i];
    let finalLetter = finalWord[i];

    let initialIndex = alphabet.indexOf(initialLetter);
    let finalIndex = alphabet.indexOf(finalLetter);

    let distance = finalIndex - initialIndex;
    distances.push(distance);
}

console.log(distances);

//split the word into its letters
let letters = initialWord.split("");

//make the letters uppercase
letters = letters.map((letter) => letter.toUpperCase());

let givenDiv = document.createElement("div");
givenDiv.className = "flex flex-row gap-2";

//create a div for each letter which is a box
// letters.forEach((letter) => {
//     let box = document.createElement("div");
//     box.className = "box bg-slate-300 w-12 h-12 text-center font-semibold text-2xl p-2 ring-1 ring-slate-300";
//     box.innerHTML = letter;
//     givenDiv.appendChild(box);
// });

function updateGuessBoard(){

    guesses = 0;

    //clear the guesses
    document.getElementById("guesses").innerHTML = "";

    for (let i = 0; i < maxGuesses; i++) {
        let row = document.createElement("div");
        row.id = `row-${i}`;
        row.className = "flex flex-row gap-2 my-2";
        for (let j = 0; j < wordLength; j++) {
            let box = document.createElement("div");
            box.className = "box w-12 h-12 text-center font-semibold text-2xl p-2 bg-slate-300";
            row.appendChild(box);
        }
        document.getElementById("guesses").appendChild(row);
    }
}

updateGuessBoard();

function updateLength(){
    //clear the word
    console.log("updateLength")
}
    
function createRow(word){
    //clear the distances
    distances = [];

    let row = document.createElement("div");
    row.className = "flex flex-row gap-2 mt-2";
    // based on the input, create a box for each letter
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        //calculate the distance between the letter and the final word
        let letterDistance = alphabet.indexOf(letter) - alphabet.indexOf(finalWord[i]);
        distances.push(letterDistance); 

        let box = document.createElement("div");
        //set the color based on the distance
        
        //since there are only 10 colors, we need to make sure the distance is within the range
        let colorIndex = Math.min(Math.abs(letterDistance), colors.length - 1);
        console.log(colorIndex)
        let color = colors[colorIndex];

        if (letter == finalWord[i]) {
            console.log('match')
            color = "bg-green-200";
        }

        box.className = `box w-12 h-12 text-center font-semibold text-2xl p-2 ${color}`;
        if (color.includes("bg-slate-")) {
            box.classList.add("text-white");
        }
        box.innerHTML = letter;
        row.appendChild(box);
        document.getElementById("in").value = "";
    }
    console.log(distances)

    guesses++;
    // document.getElementById("guesses").appendChild(row);

    //replace the boxes in the (guesses) row with the new row
    document.getElementById(`row-${guesses - 1}`).replaceWith(row);

//win condition
if (word == finalWord) {
    alert("Correct!");
}

if (guesses == maxGuesses && word != finalWord){
    document.getElementById("in").visible = false;
    alert("You lost. The word was " + finalWord + ".");
}
else{
    document.getElementById("in").focus
}
}

document.getElementById("givenWord").appendChild(givenDiv);
//add the initial word to the page
// document.getElementById("givenWord").innerHTML = initialWord;

// event listener for enter
document.getElementById("in").addEventListener("keyup", function (event) {

    let word = document.getElementById("in").value.toUpperCase();

    if(event.key == 'Enter'){
        createRow(word)
    }
});

function updateGuessCalled(){
    //this function is called when the user changes the length of the word
    maxGuesses = document.getElementById("guessesInput").value;
    updateGuessBoard();
}

function updateLengthCalled(){
    wordLength = document.getElementById("lengthInput").value;
    console.log(wordLength)
    updateGuessBoard()
}