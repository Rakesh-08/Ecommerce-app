
let promiseFun = () => {
    return new Promise((res, rej) => {
        rej("I was rejected")
    })
}

describe('Async programming test', () => {

    test('promise test', () => {

        promiseFun().then((data) =>
            expect(data).toBe('its a resolved promise'))
            .catch((err) =>
                expect(err).toBe("I was rejected"))
    })

    test('async/await test', async () => {
        try {
            let output = await promiseFun();
            expect(output).toBe('its a resolved promise')
        } catch (err) {
            expect(err).toBe('I was rejected')
        }

    })

})




