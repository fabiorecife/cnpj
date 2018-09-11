## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i @fabioalmeida/cnpj
```

## Usage

```js
var cnpj = require('@fabioalmeida/cnpj')
console.log(cnpj.isValid('75875106000138'))

var cnpjNum = cnpj.generate()
console.log(cnpj.isValid(cnpjNum)) // result true
console.log(cnpj.format(('75875106000138'))) // 021.116.060-14

```
