let checkSystemWorking = (n, sendEmail) => {

    let isSystemWorking = false;

    let delivery = sendEmail();
    isSystemWorking = delivery.passed > delivery.failed

    return isSystemWorking;
}

describe("Mock functions", () => {

    let delivery = {
        passed: 4,
        failed: 8
    }
    let sendEmail = jest.fn().mockReturnValue(delivery);
    test('first mock example', () => {
        expect(checkSystemWorking(5, sendEmail)).toBe(true)
    })
})




