/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path='') {
        const rootUrl=browser.config.baseUrl;
        return browser.url(`${rootUrl}${path}`)
    }

    filterElementsWithText(elements, queryText) {
        return elements.filter.call(elements, ele => ele.getText() === queryText);
    }
}
