# deck-app

Toy project using Vue3, Electron. Basic Japanese vocab building tool. Will start you off with
one word (人) and show you an example sentence. You click the words you don't know, and they'll
get added to your deck. After you dismiss the sentence you'll get a new random word from your
deck with a new random sentence.

Uses a corpus of example sentences from tatoeba.

Uses wanakana (from wanikani) for tokenizing example sentences.

Uses wwwjdic to pull in word meanings.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
