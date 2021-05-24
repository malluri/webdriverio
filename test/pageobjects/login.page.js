const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#divUsername input');}
    get inputPassword () { return $('#divPassword input'); }
    get btnSubmit () { return $('#divLoginButton input'); }
    get logoutPanel() {return $('#welcome.panelTrigger');}
    get logoutButton() { return $('[href*=logout]');}

    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

    logout() {
        this.logoutPanel.moveTo();
        this.logoutPanel.waitForClickable();
        this.logoutPanel.click();
        this.logoutButton.waitForClickable();
        this.logoutButton.click();
    }

    open () {
        return super.open('auth/login');
    }
}

module.exports = new LoginPage();
