# ElectroAmp

[Webamp](https://github.com/captbaritone/webamp) in an [Electron](https://www.electronjs.org) window.

This is an unofficial app and was created as a proof of concept. It has only been tested on a Apple Silicon-based MacBook Pro and is provided AS-IS.

This project would not have been possible without [Webamp](https://github.com/captbaritone/webamp) - "A reimplementation of Winamp 2.9 in HTML5 and JavaScript." by [@captbaritone](https://github.com/captbaritone). So huge shout-out to him.

Also to [@durasj](https://github.com/durasj) for his [Webamp for Desktop](https://github.com/durasj/webamp-desktop) project that showed me that it was possible to put Webamp inside an Electron container.

## Development

This project is bootstrapped using [Electron Forge](https://www.electronforge.io/).

### Prerequisites

- [nodejs](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

### Getting Started

Clone this repository:

```
    git clone https://github.com/oscarcao/electroamp.git
```

Install dependencies:

```
    yarn
```

Run app:

```
    yarn start
```

Package app:

```
    yarn package
```

### Folder Structure
The repo is fairly small and compact. All source files resides within the `src` directory.

## Known Issues
- App needs to be the active app before you can interact with it.
- Only works on primary display.
- Errors such as failing to load files are currently not handled.
- Loading and saving of player state does not work. Requires upstream changes in Webamp to expose this information. Ideally have methods to export and import the Redux store state.
- Loading and saving of playlists does not work. Requires upstream changes in Webamp to expose this information.
- App currently loads in all files. Even files that it cannot play such as images.

## Prebuilt App

You can download the latest prebuilt versions of this app from the releases tab.

macOS users need to remove the extended attributes before app can run. To remove the extended attributes, run the following command in Terminal:

```
    xattr -cr path/to/electroamp.app
```

## Disclaimer

This project is not affiliated with [Winamp](http://www.winamp.com/) or its owners. All product names, logos, and other IP are the property of their respective owners.
