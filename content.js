let loopEnabled = false;
let videoCheckInterval = null;

// Load saved state when script runs and apply to video
function initializeLoop() {
  chrome.storage.local.get(['loopEnabled'], (result) => {
    loopEnabled = result.loopEnabled || false;
    if (loopEnabled) {
      startLoopMonitoring();
    } else {
      stopLoopMonitoring();
    }
  });
}

// Apply loop setting to current video
function applyLoopToVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.loop = loopEnabled;
    
    // Also add an 'ended' event listener as backup
    if (loopEnabled) {
      video.addEventListener('ended', () => {
        if (loopEnabled) {
          video.currentTime = 0;
          video.play();
        }
      });
    }
  }
}

// Continuously monitor and enforce loop
function startLoopMonitoring() {
  stopLoopMonitoring(); // Clear any existing interval
  
  // Check every second to ensure loop is still enabled
  videoCheckInterval = setInterval(() => {
    const video = document.querySelector('video');
    if (video && loopEnabled) {
      // Force loop attribute to stay true
      if (!video.loop) {
        video.loop = true;
      }
      
      // If video ended, restart it manually
      if (video.ended) {
        video.currentTime = 0;
        video.play();
      }
    }
  }, 1000); // Check every second
}

function stopLoopMonitoring() {
  if (videoCheckInterval) {
    clearInterval(videoCheckInterval);
    videoCheckInterval = null;
  }
}

// Initialize on page load
initializeLoop();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleLoop") {
    loopEnabled = request.enabled;
    
    if (loopEnabled) {
      startLoopMonitoring();
    } else {
      stopLoopMonitoring();
      const video = document.querySelector('video');
      if (video) {
        video.loop = false;
      }
    }
    
    // Save state
    chrome.storage.local.set({ loopEnabled: loopEnabled });
    sendResponse({ success: true });
  }
  
  if (request.action === "getLoopState") {
    sendResponse({ enabled: loopEnabled });
  }
});

// Watch for video elements (YouTube loads videos dynamically)
const observer = new MutationObserver(() => {
  if (loopEnabled) {
    applyLoopToVideo();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Also listen for URL changes (when navigating between YouTube videos)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // URL changed, reapply loop setting
    if (loopEnabled) {
      setTimeout(() => {
        applyLoopToVideo();
        startLoopMonitoring();
      }, 500);
    }
  }
}).observe(document, { subtree: true, childList: true });