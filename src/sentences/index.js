import corpus from './corpus.json';
import * as wanakana from 'wanakana';

/**
 * Return a random sample from the corpus containing the specified kanji. Will tokenize
 * the value and prepare it for rendering.
 *  
 * @param string containing 
 * @returns 
 */
export function random(containing) {
    let filtered = corpus.filter(x => {
        return !x.japanese ? false : x.japanese.includes(containing);      
    })

    let idx = Math.floor(Math.random() * filtered.length);
    let random = filtered[idx];

    // tokenize sentence
    random.tokenized = wanakana.tokenize(random.japanese);

    // stream into renderable blocks
    random.streamed = [];
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
        }
    });

    // debug what we just built...
    console.log(random);

    return random;
}