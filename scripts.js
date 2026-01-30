let text = document.querySelector("#inputText");
let translateButton = document.querySelector(".translateButton");
let mictranslateButton = document.querySelector(".mictranslateButton");
let outputText = document.querySelector("#outputText");
let originlanguageSelect = document.querySelector("#originlanguageSelect");
let destlanguageSelect = document.querySelector("#destlanguageSelect");
let speachTraslate = document.querySelector(".mictranslatespeachButton");
let swapButton = document.querySelector(".arrow");

swapButton.addEventListener("click", () => {
    let tempLang = originlanguageSelect.value;
    originlanguageSelect.value = destlanguageSelect.value;
    destlanguageSelect.value = tempLang;
});

async function translate(text, destlanguageSelect, originlanguageSelect) {
    let response = await fetch("https://api.mymemory.translated.net/get?q=" + text.value + "&langpair=" + originlanguageSelect.value + "|" + destlanguageSelect.value);
    let data = await response.json();

    return data.responseData.translatedText;
}
async function speachOutput(outputText) {
    let utterance = new SpeechSynthesisUtterance(outputText);
    utterance.lang = destlanguageSelect.value;
    speechSynthesis.speak(utterance);
}

async function translateText() {
    let data = await translate(text, destlanguageSelect, originlanguageSelect);
    outputText.innerHTML = data;
    //speachOutput(data);
}

async function translateSpeech() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "pt-BR";
    recognition.start();
    recognition.onresult = async function(event) {
        let spokenText = event.results[0][0].transcript;
        text.value = spokenText;
        let data = await translate(spokenText, destlanguageSelect, originlanguageSelect);
        outputText.innerHTML = data;
        //speachOutput(data);
    };
}

translateButton.addEventListener("click",translateText);
mictranslateButton.addEventListener("click", translateSpeech);
speachTraslate.addEventListener("click", () => {
    speachOutput(outputText.innerHTML);
});