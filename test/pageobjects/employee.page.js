const Page = require('./page');
const adminPage = require('../pageobjects/admin.page');
const loginPage = require('../pageobjects/login.page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EmployeePage extends Page {

    get employeeFirstName() { return $('#frmAddEmp #firstName');}
    get employeeMiddleName() { return $('#frmAddEmp #middleName');}
    get employeeLastName() { return $('#frmAddEmp #lastName');}
    get addEmployeeButton() { return $('#menu_pim_addEmployee');}
    get pimButton() { return $('#menu_pim_viewPimModule');}
    get saveEmployeeInfo() {return $('#frmAddEmp #btnSave');}
    get validationError() { return $('#frmAddEmp input+.validation-error ');}
    get employeeListButton() {return $('#menu_pim_viewEmployeeList');}

    addEmployee(fname,mname,lname) {
        this.addEmployeeButton.waitForClickable();
        this.addEmployeeButton.click();
        this.employeeFirstName.setValue(fname);
        this.employeeMiddleName.setValue(mname);
        this.employeeLastName.setValue(lname);
        this.saveEmployeeInfo.click();
    }

    open () {
        return super.open('/pim/viewEmployeeList');
    }

    login(userName,Password) {
        this.open();
        loginPage.login(userName,Password);

    }

    deleteEmployee(employeeName){
        this.employeeListButton.waitForClickable();
        this.employeeListButton.click();
        adminPage.employeeNameInEmpInfo.waitForClickable();
        adminPage.employeeNameInEmpInfo.moveTo();
        adminPage.employeeNameInEmpInfo.click();
        adminPage.employeeNameInEmpInfo.setValue(employeeName);
        browser.keys('Enter');
        adminPage.searchButton.click();
        adminPage.bulkCheckBox.waitForClickable();
        adminPage.bulkCheckBox.click();
        adminPage.deleteButton.waitForClickable();
        adminPage.deleteButton.click();
        adminPage.deleteModal.waitForDisplayed();
        adminPage.okButton.click();
    }
}

module.exports = new EmployeePage();
