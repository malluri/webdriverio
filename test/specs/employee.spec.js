const chai = require('chai');

const loginPage = require('../pageobjects/login.page');
const infoPage = require('../pageobjects/info.page');
const employeePage = require('../pageobjects/employee.page');

const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

describe('add new employee suite', () => {
    const firstName='john'+Math.round(Math.random() * 10000000);
    const middleName='kumar'+Math.round(Math.random() * 10000000);
    const lastName='gara'+Math.round(Math.random() * 10000000);
    beforeEach(() => {
        employeePage.login(browser.config.username, browser.config.password);
    });
    afterEach(() => {
        employeePage.open();
        loginPage.logout();
    });

    afterAll(() => {
        employeePage.login(browser.config.username, browser.config.password);
        employeePage.deleteEmployee(firstName);
        employeePage.open();
        loginPage.logout();
    });

    it('should able to add new employee', () => {
        employeePage.addEmployee(firstName,middleName,lastName);
        infoPage.personalDetailHeader.waitForDisplayed();

        chai.expect(infoPage.fullName.getValue(), 'full name not updated').to.equal(firstName);

    });

    it('should not able to add new employee when all fields not provided', () => {
        employeePage.addEmployee(firstName,middleName);

        chai.expect(employeePage.validationError.getText(),
            'validation error not displayed when field not provided').to.equal('Required');

    });
});
