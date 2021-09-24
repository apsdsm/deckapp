/**
 * return true if the word exists in the player's deck.
 * 
 * @param {*} config 
 * @param {*} word 
 * @returns 
 */
export function inDeck(config, word) {
    if (config.words == []) {
        return false;
    }

    let found = config.words.find(x => x.word == word.word);

    if (found === undefined) {
        return false;
    }

    return true;
}

/**
 * Add a new word to the user's deck.
 * @param {*} config 
 * @param {*} word 
 */
export function addToDeck(config, word) {
    config.words.push(word);
}

/**
 * Return a random word from the user's deck.
 * @param {*} config 
 * @returns 
 */
export function randomWord(config) {
    let idx = Math.floor(Math.random() * config.words.length);
    let random = config.words[idx];

    return random;
}


