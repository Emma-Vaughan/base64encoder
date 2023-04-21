// Initialize button with user's preferred color
let loadExtension = document.getElementById("loadExtension");

// When the button is clicked, inject consoleLogWhenOnVaultPage into current page
loadExtension.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: loadedExtension,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function loadedExtension() {
  console.log("you're on the vault page!");

  const copySecrets = document.getElementsByClassName(
    "copy-btn ember-view copy-button button is-compact"
  );

  const firstSecret = copySecrets[0];

  console.log("copy secret", firstSecret);

  firstSecret.addEventListener("click", () => {
    navigator.clipboard.readText().then((text) => {
      navigator.clipboard.writeText(btoa(text)).then((copiedText) => {
        console.log("Copied base64 encoded secret to clipboard!");
      });
    });
  });
}

// window.getSelection
