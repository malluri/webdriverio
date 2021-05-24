const Page = require('./page');
const LoginPage = require('../pageobjects/login.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InfoPage extends Page {
    get personalDetailHeader () { return $('.personalDetails h1');}
    get EditInfoButton() { return $('#frmEmpPersonalDetails [value="Edit"]');}
    get fullName() { return $('#frmEmpPersonalDetails #personal_txtEmpFirstName');}
    get maleGenderRadiobutton() {return $('[name="personal[optGender]"][value="1"]');}
    get saveButton() { return $('#frmEmpPersonalDetails #btnSave');}
    get attachmentButton() {return $('#attachmentActions #btnAddAttachment');}
    get fileUpload() {return $('.fieldHelpContainer input[type="file"]');}
    get uploadButton() {return $('#frmEmpAttachment #btnSaveAttachment ');}
    get attachmentTable() {return $$('#tblAttachments tbody tr');}
    get fileLinksInTable() {return $$('#tblAttachments tbody tr .fileLink');}

    open () {
        return super.open('pim/viewMyDetails');
    }

    login(){
        this.open();
        LoginPage.login();
    }
}

module.exports = new InfoPage();
