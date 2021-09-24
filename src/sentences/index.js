import corpus from './corpus.json';
import * as wanakana from 'wanakana';
const Dictionary = require('japaneasy');

export async function slowRandom(containing) {

    console.log('start slow random');
    console.log(containing);

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(containing);
            console.log('resolving slow random');
            resolve(random(containing));
        }, 1000)
    })
}

/**
 * Return a random sample from the corpus containing the specified kanji. Will tokenize
 * the value and prepare it for rendering.
 *  
 * @param string containing 
 * @returns 
 */
export async function random(containing) {

    let filtered = corpus.filter(x => {
        return !x.japanese ? false : x.japanese.includes(containing);
    })

    let idx = Math.floor(Math.random() * filtered.length);
    let random = filtered[idx];

    // tokenize sentence
    random.tokenized = wanakana.tokenize(random.japanese);

    // stream into renderable blocks
    random.streamed = [];
    let words = [];
    let inText = false;

    // go through the tokens and look for kanji/text, sort them into a stream of
    // objects that can be easily rendered. If there are multiple text elements 
    // (i.e., not kanji) in a row, they should be concatinated into a single text
    // element. Kanji (as identified by wanakana, which is actually closer to a
    // word) should always be in their own element.
    random.tokenized.forEach(element => {
        if (!wanakana.isKanji(element)) {

            // no elements in array yet, or the last thing we added was a kanji? 
            // set up a new element for concatinating text fragments.
            if (random.streamed.length == 0 || !inText) {
                random.streamed.push({
                    type: 'text',
                    content: '',
                });
                inText = true;
            }

            // add the text fragment to the current element
            random.streamed[random.streamed.length - 1].content += element;

        } else {
            inText = false;
            random.streamed.push({
                type: 'kanji',
                content: element,
            });

            // check to see if it's in the list of words
            if (!words.includes(element)) {
                words.push(element);
            }
        }
    });

    // lets get all the word readings

    let searchPromises = [];

    let dict = new Dictionary();

    words.forEach(word => {
        searchPromises.push(dict(word));
    })


    let promiseRes = await Promise.all(searchPromises);

    random.words = [];

    for (let i = 0; i < promiseRes.length; i++) {
        let word = words[i];
        let res = promiseRes[i];
        let entries = [];

        // get exact matches for our word
        res.forEach(dictEntry => {
            if (dictEntry.japanese == word) {
                entries.push(dictEntry);
            }
        })

        // if no exact matches just take the top most match
        if (entries.length == 0 && res.length > 0) {
            entries.push(res[0]);
        }

        // add the word to the dictionary included in the result
        random.words.push({
            word: word,
            entries: entries,
        });
    }

        
    random.promiseRes = promiseRes;
    random.ready = true;

    // debug what we just built...
    console.log(random);

    return random;
}