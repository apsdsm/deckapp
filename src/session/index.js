import fs from 'fs'
import path from 'path'

// import pathModule from 'path'

import { app } from '@electron/remote'


function configPath() {
  let appDataPath = app.getAppPath('appData');
  return path.join(appDataPath, 'app-deck-config.json')
}

export function loadConfig() {
  const appConfigPath = configPath();

  console.log("CONFIG PATH: " + appConfigPath)

  try {
    return JSON.parse(fs.readFileSync(appConfigPath));
  } catch (error) {

    // note - this is basically generating a new config with preloaded data from wwjdic
    return {
      words: [
        {
          "word": "人",
          "entries": [
            {
              "japanese": "人",
              "pos": "suf",
              "pronunciation": "じん",
              "english": [
                "(indicates nationality, race, origin, etc.) -ian (e.g. Italian)/-ite (e.g. Tokyoite)/(suf)",
                "(indicates expertise (in a certain field)) -er (e.g. performer, etc.)/person working with .../(suf)",
                "(usu. in compound words) man/person/people"
              ]
            },
            {
              "japanese": "人",
              "pos": "ctr",
              "pronunciation": "にん",
              "english": [
                "counter for people"
              ]
            },
            {
              "japanese": "人",
              "pos": "n",
              "pronunciation": "ひと(P);ヒト",
              "english": [
                "person/someone/somebody/(n)",
                "human beings/mankind/man/people/humans/(n)",
                "(uk) (usu. ヒト) human (Homo sapiens)/(n)",
                "(other) people/others/(n)",
                "character/personality/nature/(n)",
                "capable person/competent person/suitable person/right person/(n)",
                "adult/grown-up/(n)",
                "(used when rebuking or criticizing someone) I/me/one"
              ]
            }
          ]
        },

      ]
    }
  }
}


export function saveConfig(config) {
  const appConfigPath = configPath();

  try {
    fs.writeFileSync(appConfigPath, JSON.stringify(config));
    return true;
  } catch (error) {
    return false;
  }
}
