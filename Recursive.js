var sentence = 'hudinahavertearsakacheudinarunadudinacheadearsibaudinachewahavehtanearsahache';
var replacements = ["udin", "have", "ache", "ears"];
var currentStep = 0;
var steps = [];

function remove_words_recursive(sentence, replacements) {
    if (!replacements.length) {
        return sentence;
    } else {
        var word = replacements[0];
        steps.push(sentence.replace(new RegExp(word, 'g'), '<span class="removed-word">' + word + '</span>'));
        return remove_words_recursive(remove_word(sentence, word), replacements.slice(1));
    }
}

function remove_word(sentence, word) {
    if (!sentence || !word) {
        return sentence;
    }

    var result = "";
    var i = 0;
    while (i < sentence.length) {
        if (sentence.substring(i, i + word.length) == word) {
            i += word.length;
        } else {
            result += sentence[i];
            i += 1;
        }
    }
    return result;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        var modifiedSentence = '';
        currentStep++;
        document.getElementById('sentence').innerHTML = steps[currentStep];
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        document.getElementById('sentence').innerHTML = steps[currentStep];
    }
}

function changeTab(tab) {
    var tabContents = document.getElementsByClassName('tab-content');
    var tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
    }

    document.getElementById(tab).classList.add('active');
    event.target.classList.add('active');
}

var result = remove_words_recursive(sentence, replacements);
steps.push(result);
document.getElementById('sentence').innerHTML = steps[currentStep];