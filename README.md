# abbreviate

abbreviate strings in style of
[R: Abbreviate](http://stat.ethz.ch/R-manual/R-patched/library/base/html/abbreviate.html)

## Install

```sh
npm install --save abbreviate
```

## Usage

```js
abbreviate = require('abbreviate')

// abbreviate(string, opts)
// opts:
// length (default 3)
// keepSeparators (default false) - keeps all separators between words
// strict (default true) - if false, overwrites length to include all words
abbr = abbreviate('Some Important String', {length: 8})
// abbr: 'SmImpStr'
// which chars will be included for varying length?
// [S,o ,m,e ,  ,I,m,p,o ,r,t ,a ,n ,t ,  ,S,t,r,i ,n ,g ]
// [1,16,6,17,20,2,7,8,18,9,10,19,11,12,21,3,4,5,13,14,15]
```
## What it does
In this order:
 - trims the string
 - removes word separators (`/\s\-_,/`) (unless keepSeparators is true)
 - removes lowercase vocals
 - removes lowercase consonants
 - removes uppercase vocals
 - removes uppercase consonants and numbers
 - removes word beginnings (looks for digraphs, trigraphs and blends)

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
