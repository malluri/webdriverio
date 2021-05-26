const chai = require('chai');

const loginPage = require('../pageobjects/login.page');
const employeePage = require('../pageobjects/employee.page');
const adminPage = require('../pageobjects/admin.page');

const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

describe('add new system user suite', () => {
    const firstName='john'+Math.round(Math.random() * 10000000);
    const middleName='kumar'+Math.round(Math.random() * 10000000);
    const lastName='gara'+Math.round(Math.random() * 10000000);
    const userName='curran'+Math.round(Math.random() * 10000000);

    beforeAll(() => {
        employeePage.login(browser.config.username, browser.config.password);
        employeePage.addEmployee(firstName,middleName,lastName);
    });

    afterAll(() => {
        employeePage.open();
        loginPage.logout();
    });

    /** search operation */
    it('should able add new system user', () => {
        adminPage.open();
        adminPage.userManagementDropDown.waitForClickable();
        adminPage.userManagementDropDown.moveTo();
        adminPage.userButton.waitForClickable();
        adminPage.userButton.click();
        adminPage.addButton.click();
        adminPage.selectUserRole('Admin');
        adminPage.employeeName.setValue(firstName+' '+middleName+' '+lastName);
        adminPage.userName.setValue(userName);
        browser.keys('Enter');
        adminPage.selectStatus('Enabled');
        adminPage.userPassword.setValue('Admin@9807');
        adminPage.confirmPassword.setValue('Admin@9807');
        browser.keys('Enter');
        adminPage.addUserSaveButton.moveTo();
        adminPage.addUserSaveButton.waitForClickable();
        adminPage.addUserSaveButton.doubleClick();

        adminPage.usernameInSystemUsers.waitForDisplayed();
        adminPage.usernameInSystemUsers.setValue(userName);
        browser.keys('Enter');
        adminPage.searchButton.click();

        browser.waitUntil(() => adminPage.customerListInTable.length === 1, 20000,
            'customer list table did not load');
        chai.expect(adminPage.customerListInTable.length >= 1,
            'added system user not displayed in customer list table').to.be.true;
    });
});
