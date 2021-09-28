# Phrase Deck

Toy project using Vue3, Electron. Basic Japanese vocab building tool. Will start you off with
one word (人) and show you an example sentence. You click the words you don't know, and they'll
get added to your deck. After you dismiss the sentence you'll get a new random word from your
deck with a new random sentence.

Uses a corpus of example sentences from tatoeba.

Uses wanakana (from wanikani) for tokenizing example sentences.

Uses wwwjdic to pull in word meanings.

Tested on macOS, but not Windows yet.

## Compiling, running

First off, use `npm install` to download dependencies.

To run a dev build, use `npm run electron:serve`.

To build a distributable, use `npm run electron:build`.
