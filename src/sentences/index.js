import corpus from './corpus.json';


export function loadSentences() {
    
    return corpus.slice(1,3);
}

export function random(containing) {

    console.log(corpus.slice(1,3));

    let filtered = corpus.filter(x => {
        // // console.log(x.japanese);

        // let str = x.japanese;

        // if (!str) {
        //     return false;
        // }

        return !x.japanese ? false : x.japanese.includes(containing)        
    })


    // console.log(Math.floor(Math.random()) * filtered.length);

    let idx = Math.floor(Math.random() * filtered.length);

    console.log(idx)

    let random = filtered[idx]

    console.log(random)

    // console.log(filtered)

    return random
}