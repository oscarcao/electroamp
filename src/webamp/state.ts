import fs from 'fs'
import path from 'path'

const defaultState = {
  initialTracks: [
    {
      // NOTE: Your audio file must be served from the same domain as your HTML
      // file, or served with permissive CORS HTTP headers:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
      url: './sampler/llama-2.91.mp3'
    }
  ],
  availableSkins: [
    { url: './skins/Green-Dimension-V2.wsz', name: 'Green Dimension V2' },
    { url: './skins/MacOSXAqua1-5.wsz', name: 'Mac OSX v1.5 (Aqua)' },
    { url: './skins/Skinner_Atlas.wsz', name: 'Skinner Atlas' },
    { url: './skins/TopazAmp1-2.wsz', name: 'TopazAmp v1.2' },
    { url: './skins/Vizor1-01.wsz', name: 'Vizor v1.01' },
    { url: './skins/XMMS-Turquoise.wsz', name: 'XMMS Turquoise' },
    { url: './skins/ZaxonRemake1-0.wsz', name: 'Zaxon Remake v1.0' }
  ],
  enableHotkeys: true
}

export const getDefaultState = () => defaultState

export const getStateFromFile = () => {
  try {
    const stateJSON = fs.readFileSync(path.join(__dirname, 'webampState.json'), 'utf8')
    const state = JSON.parse(stateJSON)
    return {
        ...defaultState,
        ...state
    }
  } catch (e) {
    console.error(`Failed to load webamp state: ${e}`)
    return defaultState
  }
}

export const saveStateToFile = (state: ReturnType<typeof getDefaultState>) => {
  const cleanedState = { ...state }
  // Get rid of all functions
  Object.keys(cleanedState).forEach((key: keyof typeof defaultState) => {
    if (typeof cleanedState[key] === 'function') delete cleanedState[key]
  })

  const stateJSON = JSON.stringify(cleanedState)
  fs.writeFile(path.join(__dirname, 'webampState.json'), stateJSON, (err) => {
    if(err)
        console.error(`Failed to save webamp state: ${err}`)
  })
}
