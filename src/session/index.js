import fs from 'fs'
import path from 'path'

// import pathModule from 'path'

import { app } from '@electron/remote'

export function loadConfig() {
    const appDataPath = app.getAppPath('appData');
    const appConfigPath = path.join(appDataPath, 'app-deck-config.json')

    console.log(appConfigPath)

    try {
      return JSON.parse(fs.readFileSync(appConfigPath));
    } catch(error) {
      return []
    }
}


// function saveConfig() {
//     const appDataPath = ref(app.getAppPath('appData'));
//     const appConfigPath = path.join(appDataPath.value, 'app-deck-config.json')

//     try {
//       return JSON.parse(fs.readFileSync(appConfigPath));
//     } catch(error) {
//       return []
//     }
// }
