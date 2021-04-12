const synth = window.speechSynthesis;

const textToSpeech = (string) => {
  var voices = speechSynthesis.getVoices();
  var voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "en-US";
  voice.volume = 1;
  voice.rate = 1;
  voice.voice = voices[3];
  synth.speak(voice);
};
