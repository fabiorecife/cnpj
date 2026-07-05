const assert = require('node:assert/strict')
const test = require('node:test')

const cnpj = require('./')

test('cnpj is valid', () => {
    assert.equal(cnpj.isValid('75875106000138'), true)
    assert.equal(cnpj.isValid([7, 5, 8, 7, 5, 1, 0, 6, 0, 0, 0, 1, 3, 8]), true)
    assert.equal(cnpj.isValid('04200746000108'), true)
    assert.equal(cnpj.isValid('21.426.012/0001-52'), true)
    assert.equal(cnpj.isValid('97.455.259/0001-69'), true)
    assert.equal(cnpj.isValid('12ABC34501DE35'), true)
    assert.equal(cnpj.isValid('12abc34501de35'), true)
    assert.equal(cnpj.isValid('12.ABC.345/01DE-35'), true)
})

test('cnpj is invalid', () => {
    assert.equal(cnpj.isValid('33300746000108'), false)
    assert.equal(cnpj.isValid('00000000000000'), false)
    assert.equal(cnpj.isValid('11111111111111'), false)
    assert.equal(cnpj.isValid('97.455.259/0001-ab'), false)
    assert.equal(cnpj.isValid('12ABC34501DE34'), false)
    assert.equal(cnpj.isValid('12ABC34501D#35'), false)
    assert.equal(cnpj.isValid('12ABC34501DEAB'), false)
})

test('checkDigit', () => {
    assert.equal(cnpj.checkDigit('042007460001'), 8)
    assert.equal(cnpj.checkDigit('758751060001'), 38)
    assert.equal(cnpj.checkDigit('812980480001'), 20)
    assert.equal(cnpj.checkDigit('934363140001'), 12)
    assert.equal(cnpj.checkDigit('12ABC34501DE'), 35)
})

test('verificationDigits', () => {
    assert.equal(cnpj.verificationDigits('042007460001'), '08')
    assert.equal(cnpj.verificationDigits('812980480001'), '20')
    assert.equal(cnpj.verificationDigits('12ABC34501DE'), '35')
})

test('cnpj generator', () => {
    const cnpjNumber = cnpj.generate()

    assert.equal(cnpj.isValid(cnpjNumber), true)
    assert.equal(cnpjNumber.slice(8, 12), '0001')
})

test('cnpj generator with filial', () => {
    const cnpjNumber = cnpj.generate(false, '0003')

    assert.equal(cnpj.isValid(cnpjNumber), true)
    assert.equal(cnpjNumber.slice(8, 12), '0003')
})

test('cnpj generator with prefix', () => {
    const cnpjNumber = cnpj.generate('123456')

    assert.equal(cnpj.isValid(cnpjNumber), true)
    assert.equal(cnpjNumber.slice(0, 6), '123456')
})

test('cnpj generator with alphanumeric prefix', () => {
    const cnpjNumber = cnpj.generate('12ABC3')

    assert.equal(cnpj.isValid(cnpjNumber), true)
    assert.equal(cnpjNumber.slice(0, 6), '12ABC3')
})

test('cnpj generator with alphanumeric filial', () => {
    const cnpjNumber = cnpj.generate(false, '01DE')

    assert.equal(cnpj.isValid(cnpjNumber), true)
    assert.equal(cnpjNumber.slice(8, 12), '01DE')
})

test('cnpj generatorFullRandom', () => {
    const cnpjNumber = cnpj.generateFullRandom()

    assert.equal(cnpj.isValid(cnpjNumber), true)
})

test('format cnpj', () => {
    const cnpjNumber = cnpj.generate()
    const formatedCnpj = cnpj.format(cnpjNumber)

    assert.match(formatedCnpj, /^[A-Z\d]{2}\.[A-Z\d]{3}\.[A-Z\d]{3}\/[A-Z\d]{4}-\d{2}$/)
    assert.equal(cnpj.format('12ABC34501DE35'), '12.ABC.345/01DE-35')
})
