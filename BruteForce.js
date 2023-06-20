var sentence = 'hudinahavertearsakacheudinaruudinnadudinacheadearsibaudinachewahavehtaachenearsaacheh';
var replacements = ["udin", "have", "ache", "ears"];
var currentStep = -1;
var steps = [];

function remove_words(sentence, replacements) {
  var result = sentence;
  var i = 0;
  var step = 0;

  while (i < result.length) {
    var foundMatch = false;
    for (var j = 0; j < replacements.length; j++) {
      var replacement = replacements[j];

      if (result.substring(i, i + replacement.length) === replacement) {
        step++;
        steps.push({
          index: i,
          word: replacement
        });

        i += replacement.length;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      step++;
      steps.push({
        index: i,
        word: result[i]
      });
      i++;
    }
  }

  return result;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateSentence();
    updateStepInfo();
    updateCurrentWord();
    updateResultingWords();
  }
}

function previousStep() {
  if (currentStep > 0) {
    currentStep--;
    updateSentence();
    updateStepInfo();
    updateCurrentWord();
    updateResultingWords();
  }
}

function updateSentence() {
  var modifiedSentence = '';

  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    var isReplacementStep = (step.word.length > 1);

    if (i < currentStep) {
      modifiedSentence += isReplacementStep ? '<span class="biru">' + step.word + '</span>' : step.word;
    } else if (i === currentStep) {
      modifiedSentence += '<span class="stay">' + step.word + '</span>';
    } else {
      modifiedSentence += step.word;
    }
  }

  document.getElementById('modifiedSentence').innerHTML = 'Teks: ' + modifiedSentence;
}

function updateCurrentWord() {
  if (currentStep >= 0 && currentStep < steps.length) {
    var step = steps[currentStep];
    var currentWord = step.word.length > 1 ? step.word : sentence.substring(step.index, step.index + 4);
    document.getElementById('currentWord').innerHTML = 'Kata yang sedang diuji: ' + currentWord;
  } else {
    document.getElementById('currentWord').innerHTML = '';
  }
}

function updateStepInfo() {
  if (currentStep >= 0 && currentStep < steps.length) {
    var step = steps[currentStep];
    var stepInfo = 'Step ke-' + (currentStep + 1) + '<br>';
    stepInfo += 'Indeks ke-' + (step.index + 1) + ' huruf: ' + sentence[step.index] + '<br>';

    document.getElementById('stepInfo').innerHTML = stepInfo;
  } else {
    document.getElementById('stepInfo').innerHTML = '';
  }
}

function updateResultingWords() {
  var resultingWords = '';

  for (var i = 0; i <= currentStep; i++) {
    var step = steps[i];
    var isReplacementStep = (step.word.length > 1);

    if (!isReplacementStep && !step.word.includes('<span class="biru">')) {
      resultingWords += step.word;
    }
  }

  document.getElementById('resultingWords').innerHTML = resultingWords;
}

remove_words(sentence, replacements);
nextStep();

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
