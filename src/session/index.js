import fs from 'fs'
import path from 'path'
import { app } from '@electron/remote'

function configPath() {
  let appDataPath = app.getPath('userData');
  return path.join(appDataPath, 'app-deck-config.json')
}

export function loadConfig() {
  const appConfigPath = configPath();

  console.log("CONFIG PATH: " + appConfigPath)

  // try read and return config, or return a default empty config
  try {
    return JSON.parse(fs.readFileSync(appConfigPath));
  } catch (error) {
    return {
      words: []
    };

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
