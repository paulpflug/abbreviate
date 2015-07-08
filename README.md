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
abbr = abbreviate('Some Important String', 8)
// abbr: 'SmImpStr'
// which chars will be included for varying length?
// [S,o ,m,e ,  ,I,m,p,o ,r,t ,a ,n ,t ,  ,S,t,r,i ,n ,g ]
// [1,16,6,17,20,2,7,8,18,9,10,19,11,12,21,3,4,5,13,14,15]
```
## What it does
In this order:
 - trims the string
 - removes word separators (`/\s\-_,/`)
 - removes lowercase vocals
 - removes lowercase consonants
 - removes uppercase vocals
 - removes uppercase consonants and numbers
 - removes word beginnings (looks for digraphs, trigraphs and blends)


## Release History
 - *v0.0.1*: First release

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
