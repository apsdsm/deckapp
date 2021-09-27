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
 * Remove word from the user's deck.
 * 
 * @param {*} config 
 * @param {*} word 
 */
export function removeFromDeck(config, word) {
    for (let i = config.words.length - 1; i >= 0; i--) {
        if (config.words[i].word == word.word) {
            config.words.splice(i, 1);
        }
    }
}

/**
 * Return a random word from the user's deck.
 * @param {*} config 
 * @returns 
 */
export function randomWord(config) {

    if (config.words.length == 0) {
        return {
            word: "人"
        }
    }

    let idx = Math.floor(Math.random() * config.words.length);
    let random = config.words[idx];

    return random;
}

/**
 * Return all the words in the user's config.
 * 
 * @param {*} config 
 * @returns 
 */
export function allWords(config) {
    console.log(config.words);
    return config.words;
}

