const path = require('path');
const chai = require('chai');
const loginPage = require('../pageobjects/login.page');
const infoPage = require('../pageobjects/info.page');
const employeePage = require('../pageobjects/employee.page');
const adminPage = require('../pageobjects/admin.page');

const chaiWebdriver = require('chai-webdriverio').default;

chai.use(chaiWebdriver(browser));

describe('employee suite', () => {
    const firstName='john'+Math.round(Math.random() * 10000000);
    const middleName='kumar'+Math.round(Math.random() * 10000000);
    const lastName='gara'+Math.round(Math.random() * 10000000);
    beforeEach(() => {
        employeePage.open();
        loginPage.login(browser.config.username, browser.config.password);
    });
    afterEach(() => {
        loginPage.logout();
    });

    afterAll(() => {
        employeePage.open();
        loginPage.login(browser.config.username, browser.config.password);
        employeePage.deleteEmployee(firstName);
        loginPage.logout();
    });

    it('should able to add new employee', () => {
        const filePath = path.join(__dirname, './camel.jpeg');
        const name='curran'+Math.round(Math.random() * 10000000);
        employeePage.addEmployee(firstName,middleName,lastName);
        infoPage.personalDetailHeader.waitForDisplayed();

        chai.expect(infoPage.fullName.getValue(), 'full name not updated').to.equal(firstName);

    });

    it('should not able to add new employee when all fileds not provided', () => {
        const filePath = path.join(__dirname, './camel.jpeg');
        const name='curran'+Math.round(Math.random() * 10000000);
        employeePage.addEmployee(firstName,middleName);

        chai.expect(employeePage.validationError.getText(),
            'validation error not displayed when field not provided').to.equal('Required');

    });
});
