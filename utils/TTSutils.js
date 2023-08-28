
export const speech = (who, amount, msg, voiceInd) => {
  let utterance = new SpeechSynthesisUtterance(
    `${who} 丟了 ${amount} 說: ${msg}`
  );

  if (voiceInd != -1 || voiceInd != undefined) {
    utterance.voice = speechSynthesis.getVoices()[voiceInd];
  }
  speechSynthesis.speak(utterance);
};
