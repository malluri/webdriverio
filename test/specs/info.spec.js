const path = require('path');
const chai = require('chai');

const loginPage = require('../pageobjects/login.page');
const infoPage = require('../pageobjects/info.page');

const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

describe('Update My Info in application', () => {
    beforeEach(() => {
        infoPage.login(browser.config.username, browser.config.password);
    });
    afterEach(() => {
        infoPage.open();
        loginPage.logout();
    });

    it('should able to update full name and gender in personal details', () => {
        const filePath = path.join(__dirname, './camel.jpeg');
        const name='curran'+Math.round(Math.random() * 10000000);

        infoPage.personalDetailHeader.waitForDisplayed();
        chai.expect(infoPage.personalDetailHeader.getText()).to.equal('Personal Details');
        infoPage.EditInfoButton.scrollIntoView();
        infoPage.EditInfoButton.waitForClickable();
        infoPage.EditInfoButton.click();
        infoPage.fullName.setValue(name);
        infoPage.maleGenderRadiobutton.click();
        infoPage.saveButton.scrollIntoView();
        infoPage.saveButton.click();
        infoPage.fullName.scrollIntoView();

        chai.expect(infoPage.fullName.getValue(), 'full name not updated').to.equal(name);

    });

    /** file upload*/
    it('should able to attach file in my info', () => {
        const filePath = path.join(__dirname, '../data/camel.jpeg');

        infoPage.personalDetailHeader.waitForDisplayed();
        chai.expect(infoPage.personalDetailHeader.getText(),'personal detail page not displayed').to.equal('Personal Details');
        infoPage.attachmentButton.click();
        browser.uploadFile(filePath);
        infoPage.fileUpload.setValue(filePath);
        infoPage.uploadButton.click();
        console.log(infoPage.attachmentTable.length);
        browser.waitUntil(() => infoPage.attachmentTable.length >= 1, 20000,
            'attachment table did not load');
        const filesList = infoPage.fileLinksInTable.map(ele => ele.getText());

        chai.expect(filesList, 'uploaded file not included in table').include('camel.jpeg');
    });
});
