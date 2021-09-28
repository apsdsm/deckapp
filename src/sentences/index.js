import corpus from './corpus.json';
import * as wanakana from 'wanakana';
const axios = require('axios').default;


/**
 * Return a random sample from the corpus containing the specified kanji. Will tokenize
 * the value and prepare it for rendering.
 *  
 * @param string containing 
 * @returns 
 */
export async function random(containing) {
    let corpusRand = getRandomFromCorpus(containing);

    // setup skeleton object tha will get populated throughout this function
    let random = {
        japanese: corpusRand.japanese,
        english: corpusRand.english,
    }

    // let WanaKana tokenenzize the sentence (gives us a nice starting point to process)
    let wkTokenized = wanakana.tokenize(random.japanese);

    // stream into renderable blocks
    random.tokenized = [];
    let words = [];
    let inText = false;

    // go through the tokens and look for kanji/text, sort them into a stream of
    // objects that can be easily rendered. If there are multiple text elements 
    // (i.e., not kanji) in a row, they should be concatinated into a single text
    // element. Kanji (as identified by wanakana, which is actually closer to a
    // word) should always be in their own element.
    wkTokenized.forEach(element => {
        if (!wanakana.isKanji(element)) {

            // no elements in array yet, or the last thing we added was a kanji? 
            // set up a new element for concatinating text fragments.
            if (random.tokenized.length == 0 || !inText) {
                random.tokenized.push({
                    type: 'text',
                    content: '',
                });
                inText = true;
            }

            // add the text fragment to the current element
            random.tokenized[random.tokenized.length - 1].content += element;

        } else {
            inText = false;
            random.tokenized.push({
                type: 'kanji',
                content: element,
            });

            // check to see if it's in the list of words
            if (!words.includes(element)) {
                words.push(element);
            }
        }
    });

    // for each word in our list, fetch a list of dictionary entries from wwwjdic
    let searchPromises = [];

    words.forEach(word => {
        searchPromises.push(fetchWwwjdicRes(word));
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
    console.log("---DONE---")
    console.log(random);

    return random;
}


/**
 * Return a random sentence from the corpus.
 * 
 * @returns 
 */
function getRandomFromCorpus(containing) {
    let filtered = corpus.filter(x => {
        return !x.japanese ? false : x.japanese.includes(containing);
    })

    let idx = Math.floor(Math.random() * filtered.length);
    return filtered[idx];
}

/**
 * Fetch a word from wwwjdic, then parse and return results.
 * 
 * @param {*} word 
 * @returns 
 */
async function fetchWwwjdicRes(word) {
    let res = await axios.get("http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP" + word)
    return parseWwwjdicRes(res.data);
}

/**
 * Return an array of parsed word meanings:
 * 
 * ```
 * [
 *   {
 *     "word": "人",
 *     "common": true,
 *     "reading": "じん",
 *     "meanings": [
 *       "(suf) (1) (indicates nationality, race, origin, etc.) -ian (e.g. Italian)/-ite (e.g. Tokyoite)",
 *       "(suf) (2) (indicates expertise (in a certain field)) -er (e.g. performer, etc.)/person working with ...",
 *       "(suf) (3) (usu. in compound words) man/person/people",
 *     ]
 *   },
 * ]
 * ```
 * 
 * @param {*} data 
 * @param {*} want 
 * @returns 
 */
function parseWwwjdicRes(data, want = null) {

    const rawSplitRegexp = /(.*)\[(.*)](.*)$/;
    const meaningSplitRegexp = /(\/\(.+?\)\s\(\d+?\))/g;
    const commonWordRegexp = /\/\(P\)\//;

    let split = data.split('\n');
    let entries = [];

    split.forEach(raw => {
        if (raw.charAt(0) == '<' || raw == '') {
            return;
        }

        let parts = raw.match(rawSplitRegexp);

        // if there aren't enough parts to parse the word, return null
        if (!parts || parts.length < 4) {
            return null;
        }

        // initial values
        let word = parts[1].trim();
        let reading = parts[2].trim();
        let meaningsRaw = parts[3].trim();
        let common = false;
        let meanings = [];

        // if only a specific word is wanted, return if not exact match
        if (want != null && want != word) {
            return;
        }

        // split the raw meanings string into an array of (unprocessed) meanings
        let meaningsParsed = meaningsRaw.replace(meaningSplitRegexp, "%%NEWDEF%%$1");
        let meaningsSplit = meaningsParsed.split("%%NEWDEF%%");

        // go through each of the meanings that we split out, and do some processing before
        // adding to the meanings array. Do not add empty strings.
        meaningsSplit.forEach(x => {
            x = x.trim();

            if (x == '') {
                return;
            }

            // check to see if common word (if so remove the (P))
            if (x.match(commonWordRegexp)) {
                common = true;
                x = x.replace(commonWordRegexp, '')
            }

            // trim the leading '\' from the entry
            x = x.slice(1);

            // append to the array of parsed meanings
            meanings.push(x);
        })

        // add a processed entry to the lis
        entries.push({
            word: word,
            common: common,
            reading: reading,
            meanings: meanings, 
        })
    });

    return entries;
}