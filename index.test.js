const cnpj = require('./')


test('cnpj is valid', () => {
    expect(cnpj.isValid('75875106000138')).toBe(true)
    expect(cnpj.isValid([7,5,8,7,5,1,0,6,0,0,0,1,3,8])).toBe(true)
    expect(cnpj.isValid('04200746000108')).toBe(true)
    expect(cnpj.isValid('21.426.012/0001-52')).toBe(true)
    expect(cnpj.isValid('97.455.259/0001-69')).toBe(true)

})

test('cnpj is invalid', () => {
    expect(cnpj.isValid('33300746000108')).toBe(false)
    expect(cnpj.isValid('00000000000000')).toBe(false)
    expect(cnpj.isValid('11111111111111')).toBe(false)
    expect(cnpj.isValid('97.455.259/0001-ab')).toBe(false)
})

test('checkDigit', () => {
    expect(cnpj.checkDigit('042007460001')).toBe(8)
    expect(cnpj.checkDigit('758751060001')).toBe(38)
    expect(cnpj.checkDigit('812980480001')).toBe(20)
    expect(cnpj.checkDigit('934363140001')).toBe(12)

})

test('verificationDigits', () => {
    expect(cnpj.verificationDigits('042007460001')).toBe('08')
    expect(cnpj.verificationDigits('812980480001')).toBe('20')
})

test('cnpj generator', () => {
    let cnpjNumber = cnpj.generate()
    expect(cnpj.isValid(cnpjNumber)).toBe(true)
    expect(cnpjNumber.slice(8,12)).toMatch('0001')
})

test('cnpj generator with filial', () => {
    let cnpjNumber = cnpj.generate(false, '0003')
    expect(cnpj.isValid(cnpjNumber)).toBe(true)
    expect(cnpjNumber.slice(8,12)).toMatch('0003')
})

test('cnpj generator with prefix', () => {
    let cnpjNumber = cnpj.generate('123456')
    expect(cnpj.isValid(cnpjNumber)).toBe(true)
    expect(cnpjNumber.slice(0,6)).toMatch('123456')
})

test('cnpj generatorFullRandom', () => {
    let cnpjNumber = cnpj.generateFullRandom()
    expect(cnpj.isValid(cnpjNumber)).toBe(true)
})


test('format cnpj', () => {
    let cnpjNumber = cnpj.generate()
    formatedCnpj = cnpj.format(cnpjNumber)
    console.log(formatedCnpj)
    expect(formatedCnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
})
