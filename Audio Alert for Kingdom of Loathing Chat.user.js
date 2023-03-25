// ==UserScript==
// @name         Audio Alert for Kingdom of Loathing Chat
// @author       Bryn 23011
// @match        http://*kingdomofloathing.com/lchat.php
// @match        http://*kingdomofloathing.com/account.php*
// @match        *kingdomofloathing.com*
// @match        http://127.0.0.1*
// @match        http://127.0.0.1:60080/mchat.php*
// @match        http://127.0.0.1:60080/game.php*
// @match        http://127.0.0.1:60080/account.php*
// @version        1.0
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

// Modify the phrases and URL as needed
const phrases = ["hello", "test", "bryn"];
const audioUrl = "http://rpg.hamsterrepublic.com/wiki-images/0/04/TextboxBloop8-Bit.ogg";

// Create the audio element
const audioElement = new Audio(audioUrl);

// Listen for new chat messages
const chatObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        if (node.className === "ChatLine") {
          const chatText = node.querySelector(".ChatLineText").textContent.toLowerCase();
          if (phrases.some(phrase => chatText.includes(phrase))) {
            audioElement.play();
          }
        }
      });
    }
  });
});

// Start observing chat messages
const chatContainer = document.querySelector(".ChatLog");
chatObserver.observe(chatContainer, { childList: true });
