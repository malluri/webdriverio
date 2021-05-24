const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EmployeePage extends Page {

    get userManagementDropDown() { return $('#menu_admin_UserManagement'); }
    get userButton() { return $('#menu_admin_viewSystemUsers');}
    get addButton() { return $('#customerList #btnAdd');}
    get userRoleDropDown(){ return $('#systemUser_userType');}
    get userOptions() { return $$('#systemUser_userType option')}
    get employeeName() { return $('#frmSystemUser #systemUser_employeeName_empName');}
    get userName() { return $('#frmSystemUser #systemUser_userName');}
    get statusDropDown() { return $('#frmSystemUser #systemUser_status');}
    get statusOptions() { return $$('#frmSystemUser #systemUser_status option')}
    get userPassword() { return $('#frmSystemUser #systemUser_password');}
    get confirmPassword() { return $('#frmSystemUser #systemUser_confirmPassword');}
    get addUserSaveButton() { return $('#frmSystemUser #btnSave');}
    get employeeNameInSystemUsers() { return $('#systemUser-information #searchSystemUser_employeeName_empId'); }
    get usernameInSystemUsers() { return $('#systemUser-information #searchSystemUser_userName');}
    get searchButton() { return $('#searchBtn')}
    get customerListInTable() { return $$('#customerList tbody tr');}
    get employeeNameInEmpInfo() { return $('#employee-information #empsearch_employee_name_empName');}
    get bulkCheckBox() { return $('#resultTable [name="chkSelectAll"]');}
    get deleteButton() { return $('#btnDelete');}
    get deleteModal() { return $('#deleteConfModal');}
    get okButton() { return $('#deleteConfModal #dialogDeleteBtn');}

    open () {
        return super.open('/admin/viewSystemUsers');
    }

    selectUserRole(role) {
        this.userRoleDropDown.waitForClickable();
        this.userRoleDropDown.click();
        const roles=this.filterElementsWithText(this.userOptions,role);
        roles[0].click();
    }
    selectStatus(option) {
        this.statusDropDown.waitForClickable();
        this.statusDropDown.click();
        const status=this.filterElementsWithText(this.statusOptions,option);
        status[0].click();

    }
}

module.exports = new EmployeePage();
