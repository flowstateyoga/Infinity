# Infinity

A lightweight Chrome extension that enables infinite looping for YouTube videos. Toggle looping on any video with a single click, and the extension will continue working even when you switch tabs or applications.

## Features

- **One-click toggle**: Enable or disable looping instantly from the extension popup
- **Persistent state**: Your loop setting is remembered across browser sessions
- **Works across tabs**: Loop setting applies to all YouTube videos automatically
- **Background operation**: Videos continue looping even when the tab is not active
- **Modern UI**: Clean, visually appealing interface with real-time status indicators
- **Zero configuration**: No setup required - just install and use

## Installation

### From Source (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the extension folder
6. The extension icon will appear in your Chrome toolbar

### From Chrome Web Store

Coming soon!

## Usage

1. Navigate to any YouTube video
2. Click the extension icon in your Chrome toolbar
3. Click "Enable Loop" to start looping the video
4. The video will automatically restart when it ends
5. Click "Disable Loop" to turn off looping


## Technical Details

### Built With

- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extension Manifest V3

### Key Technologies

- **Chrome Storage API**: Persists loop state across sessions
- **Content Scripts**: Interacts with YouTube's video player
- **MutationObserver**: Monitors DOM changes for dynamic content
- **Event Listeners**: Handles tab visibility and focus changes

## How It Works

1. **Content Script Injection**: The extension injects a content script into all YouTube pages
2. **Video Detection**: Uses MutationObserver to detect when videos load (YouTube is a single-page application)
3. **Loop Enforcement**: Sets the HTML5 video `loop` attribute and monitors it with setInterval
4. **State Management**: Uses Chrome Storage API to persist the loop state across tabs and sessions
5. **Fallback Mechanism**: If the video ends despite the loop attribute, manually restarts it using the 'ended' event

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Brave
- Opera
- Other Chromium-based browsers

## Privacy

This extension does not collect, store, or transmit any personal data. All settings are stored locally on your device using Chrome's storage API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or personal use.

## Troubleshooting

**Issue**: Extension doesn't work after installation
- Solution: Refresh the YouTube page after installing the extension

**Issue**: Loop stops working when switching tabs
- Solution: Make sure you've reloaded the extension after any updates

**Issue**: Extension icon not showing
- Solution: Check that the icon file is in the correct location and reload the extension

## Future Enhancements

- Custom loop ranges (loop between specific timestamps)
- Loop counter
- Keyboard shortcuts
- Options page for advanced settings

## Author

Created as a learning project to understand Chrome extension development.

## Acknowledgments

Built with guidance on Chrome Extension APIs and modern web development practices.
