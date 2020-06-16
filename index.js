var Modulo11 = require('@fabioalmeida/modulo11')
var modulo11 = new Modulo11(2,9)
let CNPJ = {
    allNumberSame: function (numero) {
        return /^(.)\1+$/.test(numero)
    },
    removePunctuation: function (numero) {
        return numero.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    },
    isNumber: function (numero) {
      return /^\d+$/.test(numero)
    },
    checkDigit: function(cpfWihoutCheckDigits) {
        var digit1, digit2, calc13
        digit1 = modulo11.checkDigit(cpfWihoutCheckDigits)
        calc13 = cpfWihoutCheckDigits + digit1
        digit2 = modulo11.checkDigit(calc13)
        return ((digit1*10)+digit2)
    },
    verificationDigits: function (cpfWihoutCheckDigits) {
      var digit = this.checkDigit(cpfWihoutCheckDigits)
      digit = digit.toString()
      if (digit.length < 2) {
          digit = '0' + digit
      }
      return digit
    },
    randomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max))
    },
    generate: function(_prefix, _filial) {
        var digits = []
        if (_prefix) {
            if ((typeof _prefix) === 'string') {
                for(var i = 0; i <  _prefix.length; i++) {
                    digits.push(parseInt(_prefix[i]))
                }
            }
        }
        while (digits.length < 12) {
          digits.push(this.randomInt(9))
        }
        if (_filial && _filial.length === 4) {
            if ((typeof _filial) === 'string') {
                digits[8] = parseInt(_filial[0])
                digits[9] = parseInt(_filial[1])
                digits[10] = parseInt(_filial[2])
                digits[11] = parseInt(_filial[3])
            }
        } else {
            digits[8] = 0
            digits[9] = 0
            digits[10] = 0
            digits[11] = 1
        }
        digits = digits.join('')
        return digits+this.verificationDigits(digits)
    },
    generateFullRandom: function() {
        var digits = []
        while (digits.length < 12) {
            digits.push(this.randomInt(9))
        }
        digits = digits.join('')
        return digits+this.verificationDigits(digits)
    },
    format: function(_cnpj) {
        var cnpj = this.removePunctuation(_cnpj)
        return cnpj.slice(0,2) + '.' + cnpj.slice(2,5) + '.' + cnpj.slice(5,8) + '/' + cnpj.slice(8,12) + '-' +
             cnpj.slice(12,14)
    },
    isValid: function (cnpj) {
        var first12, last2, cnpjString, digits
        if ((typeof cnpj) !== 'string') {
            cnpjString = cnpj.join('')
        } else {
            cnpjString = cnpj
        }
        cnpjString = this.removePunctuation(cnpjString)
        if (cnpjString.length !== 14) return false
        if (!this.isNumber(cnpjString)) return false
        if (this.allNumberSame(cnpjString)) return false

        first12 = cnpjString.slice(0,12)
        last2 = parseInt(cnpjString.slice(12,14))
        digits = this.checkDigit(first12)

        return last2 === digits
    }
}

module.exports = CNPJ
