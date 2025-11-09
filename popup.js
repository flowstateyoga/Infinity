const button = document.getElementById('toggleLoop');
const statusText = document.getElementById('statusText');
const indicator = document.getElementById('indicator');
let isEnabled = false;

// Load saved state when popup opens
chrome.storage.local.get(['loopEnabled'], (result) => {
  isEnabled = result.loopEnabled || false;
  updateUI();
});

function updateUI() {
  // Update button
  button.textContent = isEnabled ? 'Disable Loop' : 'Enable Loop';
  button.className = isEnabled ? 'enabled' : 'disabled';
  
  // Update status
  statusText.textContent = isEnabled ? 'Loop Active' : 'Loop Disabled';
  indicator.className = isEnabled ? 'status-dot active' : 'status-dot inactive';
}

button.addEventListener('click', () => {
  isEnabled = !isEnabled;
  
  // Update UI
  updateUI();
  
  // Save state
  chrome.storage.local.set({ loopEnabled: isEnabled });
  
  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { 
      action: 'toggleLoop', 
      enabled: isEnabled 
    });
  });
});