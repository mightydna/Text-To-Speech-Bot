/* Variables */

let textField = document.querySelector("#textfield");
let sendButton = document.querySelector("#text_to_speech");
let languageSelect = document.querySelector("#lang_select");
let actorSelect = document.querySelector("#actor_select");
let button05 = document.querySelector("#\\30 _5_spd");
let button075 = document.querySelector("#\\30 _75_spd");
let button1 = document.querySelector("#\\31_spd");
let button15 = document.querySelector("#\\31 _5_spd");
let button10 = document.querySelector("#\\31 0_spd");

let languageList = [];
let languageListAll = [];
let voices = speechSynthesis.getVoices();
let textSpeed = 1;

/* Listener */

sendButton.addEventListener("click", textToSpeak);
languageSelect.addEventListener("change", languageSelector);
button05.addEventListener("click", speedSelect);
button075.addEventListener("click", speedSelect);
button1.addEventListener("click", speedSelect);
button15.addEventListener("click", speedSelect);
button10.addEventListener("click", speedSelect);

/* Functions */

//Loading of all available Browser voices
function loadVoices() {
    
    if (voices.length === 0) {
        speechSynthesis.onvoiceschanged = function() {
            voices = speechSynthesis.getVoices();
            voices.forEach(voice => {
                languageListAll.push(voice.lang + " " + voice.name); //Generate an array with all available entries
                if (!languageList.includes(voice.lang)) { //Filtering for duplicates
                    languageList.push(voice.lang); //Generate an array without language duplicates
                }
            });
            generateLanguageDropdown(); //Generate the available language list based on the array without duplicates
            generateActorDropdown(); //Generate the available voices list based on the selected language; starting with entry 1
        };
    } 
}
loadVoices();

//Generate the html language dropdown
function generateLanguageDropdown() {
    for (i = 0; i < languageList.length; i++) {
        languageSelect.innerHTML += `
                <option value="${languageList[i]}">${languageList[i]}</option>
                `;
    }
}

//Generate the html voice dropwdown
function generateActorDropdown() {
    actorSelect.innerHTML = ``; //Empty the list after every new language selection
    for (i = 0; i < languageListAll.length; i++) {
        if (languageListAll[i].includes(document.querySelector("#lang_select").value)) { //Check the array with all entries for all entries containing the selected language
            actorSelect.innerHTML += ` 
                <option value="${languageListAll[i].substring(6)}">${languageListAll[i].substring(6)}</option>
                `;
        } 
    }
}

//Creates a new list of voice actors when called
function languageSelector() {
    let selectedLanguage = languageSelect.value;
    generateActorDropdown();
}

//This selects the reading speed for the text
function speedSelect() {
    
    toggleActiveState(); //Clear all button css classes and sets them to inactive
    
    if (this.id == "0_5_spd") {
        textSpeed = 0.5; //Sets text speed to 0.5
        button05.classList.remove("selector_inactive"); //Removes inactive css class
        button05.classList.add("selector_active"); //Adds active css class
    } else if (this.id == "0_75_spd") {
        textSpeed = 0.75;
        button075.classList.remove("selector_inactive");
        button075.classList.add("selector_active");
    } else if (this.id == "1_spd") {
        textSpeed = 1;
        button1.classList.remove("selector_inactive");
        button1.classList.add("selector_active");
    } else if (this.id == "1_5_spd") {
        textSpeed = 1.5;
        button15.classList.remove("selector_inactive");
        button15.classList.add("selector_active");
    } else if (this.id == "10_spd") {
        textSpeed = 5;
        button10.classList.remove("selector_inactive");
        button10.classList.add("selector_active");
    }
}

function textToSpeak() {
    let speakText = new SpeechSynthesisUtterance(textField.value); //Generates new speech object
    speakText.lang = document.querySelector("#lang_select").value; //Sets the language of the spoken text
    speakText.rate = textSpeed; //Sets the speed of the spoken text
    let selectedVoiceName = document.querySelector("#actor_select").value; //Gets the voice of the spoken text from the current selected actor
    let selectedVoice = voices.find(voice => voice.name === selectedVoiceName); //Checks the available voices for the selected voice actor
    speakText.voice = selectedVoice; //Sets the voice actor for the spoken text
    speechSynthesis.speak(speakText); //Speaks the text with all above settings
}

function toggleActiveState() {
    button05.classList.remove("selector_active");
    button075.classList.remove("selector_active");
    button1.classList.remove("selector_active");
    button15.classList.remove("selector_active");
    button10.classList.remove("selector_active");

    button05.classList.add("selector_inactive");
    button075.classList.add("selector_inactive");
    button1.classList.add("selector_inactive");
    button15.classList.add("selector_inactive");
    button10.classList.add("selector_inactive");
}