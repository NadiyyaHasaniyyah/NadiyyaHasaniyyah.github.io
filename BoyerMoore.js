var sentence = 'hudinahavertearsakacheudinaruudinnadudinacheadearsibaudinachewahavehtaachenearsaacheh';
var replacements = ["udin", "have", "ache", "ears"];
var patternList = replacements.slice();
var badCharacterTable = {};
var table = {};
var result = "";
var i = 0;
var currentStep = 0;
var steps = [];

function buildBadCharacterTable(pattern) {
    var table = {};
    for (var i = pattern.length - 1; i >= 0; i--) {
        if (!(pattern[i] in table)) {
            table[pattern[i]] = pattern.length - i - 1;
        }
    }
    return table;
}

function initializeTables() {
    for (var j = 0; j < patternList.length; j++) {
        var pattern = patternList[j];
        table[pattern] = buildBadCharacterTable(pattern);
        for (var key in table[pattern]) {
            if (!(key in badCharacterTable)) {
                badCharacterTable[key] = table[pattern][key];
            } else {
                badCharacterTable[key] = Math.min(badCharacterTable[key], table[pattern][key]);
            }
        }
    }
}

function updateOutput() {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    var stepInfo = document.createElement("p");
    stepInfo.innerHTML = "Step = " + (currentStep + 1);
    outputDiv.appendChild(stepInfo);

    var testedWord = steps[currentStep].currentWord;
    var lastWord = testedWord.substr(-1);

    var testedWordInfo = document.createElement("p");
    testedWordInfo.innerHTML = "Kata yang diuji: " + testedWord;
    outputDiv.appendChild(testedWordInfo);

    var lastWordInfo = document.createElement("p");
    lastWordInfo.innerHTML = "Last Word: " + lastWord;
    outputDiv.appendChild(lastWordInfo);

    var shift = steps[currentStep].shift;
    var shiftInfo = document.createElement("p");
    shiftInfo.innerHTML = "Shift: " + shift;
    outputDiv.appendChild(shiftInfo);

    var indexInfo = document.createElement("p");
    indexInfo.innerHTML = "Indeks Ke: " + steps[currentStep].index;
    outputDiv.appendChild(indexInfo);

    var startIndex = steps[currentStep].index - testedWord.length;
    var matchedText = sentence.substr(startIndex, testedWord.length);

    var remainingText = sentence.substr(steps[currentStep].index);
    var remainingSpan = document.createElement("span");
    remainingSpan.innerHTML = remainingText;
    remainingSpan.style.fontSize = "1.6em";
    outputDiv.appendChild(remainingSpan);

    if (patternList.includes(matchedText)) {
        var matchedSpan = document.createElement("span");
        matchedSpan.innerHTML = matchedText;
        matchedSpan.style.fontSize = "1.6em";
        matchedSpan.classList.add("blue");
        outputDiv.insertBefore(matchedSpan, remainingSpan);

        var prevText = sentence.substr(0, startIndex);
        var prevSpan = document.createElement("span");
        prevSpan.innerHTML = prevText;
        prevSpan.style.fontSize = "1.6em";
        outputDiv.insertBefore(prevSpan, matchedSpan);
    } else {
        var prevText = sentence.substr(0, steps[currentStep].index);
        var prevSpan = document.createElement("span");
        prevSpan.innerHTML = prevText;
        prevSpan.style.fontSize = "1.6em";
        outputDiv.insertBefore(prevSpan, remainingSpan);
    }

    var resultInfo = document.createElement("p");
    resultInfo.innerHTML = steps[currentStep].result;
    resultInfo.style.textAlign = "center";
    resultInfo.style.fontSize = "2.8em";
    resultInfo.style.fontFamily = "Montserrat";
    resultInfo.style.color = "white";
    resultInfo.style.textShadow = "2px 2px 5px #FFFFFF";
    outputDiv.appendChild(resultInfo);


}

function updateCurrentWord() {
    result = steps[currentStep].result;
    i = steps[currentStep].index;
}

function updateStepInfo() {
    var stepInfo = document.getElementsByTagName("p")[0];
    stepInfo.innerHTML = "Step = " + (currentStep + 1);
}

function updateResultingWords() {
    var resultInfo = document.getElementsByTagName("p")[4];
    resultInfo.innerHTML = "Hasil: " + steps[currentStep].result;
    resultInfo.className = "result-text";
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateCurrentWord();
        updateStepInfo();
        updateResultingWords();
        updateOutput();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        updateCurrentWord();
        updateStepInfo();
        updateResultingWords();
        updateOutput();
    }
}


function performBoyerMoore() {
    var matchedIndexes = []; // Array untuk melacak indeks kata yang cocok

    while (i < sentence.length) {
        var currentWord = sentence.substr(i, 4);
        var shift = 4;

        if (!patternList.includes(currentWord)) {
            shift = badCharacterTable[currentWord.substr(-1)] || 0;

            if (shift === 0) {
                result += currentWord;
                i += 4;
            } else {
                result += currentWord.substr(0, shift);
                i += shift;
            }
        } else {
            i += 4;
        }

        // Menyimpan indeks kata yang cocok
        if (patternList.includes(currentWord)) {
            matchedIndexes.push(i - 4);
        }

        steps.push({
            currentWord: currentWord,
            shift: shift,
            index: i,
            result: result,
            matchedIndexes: matchedIndexes, // Menyimpan indeks kata yang cocok
        });
    }
}

initializeTables();
performBoyerMoore();
updateOutput();

function changeTab(tab) {
    var tabContents = document.getElementsByClassName('tab-content');
    var tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    document.getElementById(tab).classList.add('active');
    event.target.classList.add('active');
}