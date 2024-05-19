const { Given, When, Then, Before, AfterStep, AfterAll, setWorldConstructor } = require('@cucumber/cucumber');
const assert = require('assert');
const compareImages = require("resemblejs/compareImages")
const config = require("../../../config.json");
const resembleVrt = require("../../../../VRT-REPORTERS/ResembleVRT/vrtReporter.js");
const fs = require('fs');
const {options } = config;
var step = 1

// Set up custom World constructor to store scenario name
function CustomWorld({ attach, parameters, ...other }) {
    this.attach = attach;
    this.parameters = parameters;
    this.driver = other.driver;
    this.scenarioName = '';
}

Before(async function (scenario) {
    this.scenarioName = scenario.pickle.name;
    let trimmedScenarioName = this.scenarioName.split("...")[0];
    await createDirectory(`./reports/VRT/`);
    await createDirectory(`./reports/VRT/Results/`);
    await createDirectory(`./reports/VRT/Results/${trimmedScenarioName}/`);
    await createDirectory(`./reports/VRT/Results/${trimmedScenarioName}/Steps/`);

});

/* AfterAll(async function(){
    resembleVrt.executeVRT('./reports/VRT');
}); */

setWorldConstructor(CustomWorld);

AfterStep(async function () {

    let trimmedScenarioName = this.scenarioName.split("...")[0];

    // Convert the integer to a string
    let stepString = step.toString();

    // Pad the string with leading zeros if necessary
    while (stepString.length < 3) {
        stepString = '0' + stepString;
    }

    await createDirectory(`./reports/VRT/Results/${trimmedScenarioName}/Steps/${stepString}/`);  

    let stepPhase = this.scenarioName.includes("v3") ? "before" : "after";

    let screenshot = await this.driver.saveScreenshot(
        `./reports/VRT/Results/${trimmedScenarioName}/Steps/${stepString}/${stepPhase}.png`
    );
    step ++
    this.attach(screenshot, 'image/png')
});




async function createDirectory(path){
    if (!fs.existsSync(path)) {
        await fs.promises.mkdir(path, { recursive: true }, (error) => {
            if (error) {
                console.error('Error creating directory:', error);
            } else {
                console.log('Directory successfully created: '+path);
            }
        }); 
    }       
}

// Function to generate pseudo-random hexadecimal color codes
function generateRandomColor() {
    return '' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// Function to generate a n-character string
function generateStringByLength(n) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < n; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


When('I enter my email {kraken-string}', async function (value) {
    let element = await this.driver.$('#login.gh-signin > div > span.gh-input-icon.gh-icon-mail > input');
    return await element.setValue(value);
});

When('I enter my password {kraken-string}', async function (value) {
    let element = await this.driver.$('#login.gh-signin > div > span.gh-input-icon.gh-icon-lock.forgotten-wrap > input');
    return await element.setValue(value);
});

When('I click on sign in', async function () {
    let element = await this.driver.$('#login.gh-signin > button');
    return await element.click();
});

When('I click on published', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li.gh-nav-list-new.relative > div > div > ul.gh-nav-view-list > li > a');
    return await element.click();
});

When('I click on authors dropdown', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > div.gh-contentfilter.view-actions-bottom-row > div.gh-contentfilter-menu.gh-contentfilter-author > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on order dropdown', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > div.gh-contentfilter.view-actions-bottom-row > div.gh-contentfilter-menu.gh-contentfilter-sort > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on visibility dropdown', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > div.gh-contentfilter.view-actions-bottom-row > div.gh-contentfilter-menu.gh-contentfilter-visibility > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on post type dropdown', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > div.gh-contentfilter.view-actions-bottom-row > div.gh-contentfilter-menu.gh-contentfilter-type > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on tags dropdown', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > div.gh-contentfilter.view-actions-bottom-row > div.gh-contentfilter-menu.gh-contentfilter-tag > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on tags', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(3)');
    return await element.click();
});

When('I click on new tag', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport main.gh-main > section.gh-canvas > div.gh-canvas-header > header.gh-canvas-header-content > section.view-actions > a');
    return await element.click();
});

When('I enter the new tag name {kraken-string}', async function (value) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(value);
});

When('I click on save tag', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app div.gh-viewport > main.gh-main section.gh-canvas > form.mb15 > div.gh-canvas-header > header.gh-canvas-header-content > section.view-actions > button');
    return await element.click();
});

When('I click on pages', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(2)');
    return await element.click();
});

When('I click on new page', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas.gh-canvas-sticky > div.gh-canvas-header.break.tablet.post-header > header.gh-canvas-header-content > section.view-actions > a');
    return await element.click();
});

When('I enter my page name {kraken-string}', async function (value) {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen > div.gh-app > div.gh-viewport main.gh-main.editor-new.gh-main-white > div.flex.flex-row > section > div.gh-koenig-editor.relative.w-100.vh-100.overflow-x-hidden.overflow-y-auto.z-0 > div.gh-koenig-editor-pane.flex.flex-column.mih-100 > textarea');
    return await element.setValue(value);
});

When('I enter my page content {kraken-string}', async function (value) {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen > div.gh-app > div.gh-viewport > main.gh-main.gh-main-white > div.flex.flex-row > section > div.gh-koenig-editor.relative.w-100.vh-100.overflow-x-hidden.overflow-y-auto.z-0 > div.gh-koenig-editor-pane.flex.flex-column.mih-100 > article > div.koenig-editor__editor-wrapper > div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
    await element.click();
    return await element.setValue(value);
});

When('I click on publish page', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen div.gh-app > div.gh-viewport > main.gh-main.gh-main-white > div.flex.flex-row > section > header.gh-editor-header.br2.pe-none section.flex.items-center.pe-auto.h-100 > button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger');
    return await element.click();
});

When('I click on continue', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen.epm-scrolling-disabled > div.epm-modal-container > div > div.flex.flex-column.h-100.items-center.overflow-auto > div.gh-publish-settings-container.fade-in > div.gh-publish-cta > button.gh-btn.gh-btn-black.gh-btn-large');
    return await element.click();
});

When('I click on publish page right now', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen.epm-scrolling-disabled > div.epm-modal-container > div > div.flex.flex-column.h-100.items-center.overflow-auto > div.gh-publish-settings-container.fade-in div.gh-publish-cta > button');
    return await element.click();
});

When('I click on preview page', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen > div.gh-app > div.gh-viewport > main.gh-main.gh-main-white > div.flex.flex-row > section > header.gh-editor-header.br2.pe-none > section.flex.items-center.pe-auto.h-100 > button.gh-btn.gh-btn-editor.gh-editor-preview-trigger > span');
    return await element.click();
});

When('I click on members', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(4)');
    return await element.click();
});

When('I click on new member', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main.gh-main-fullwidth > section.gh-canvas > div.gh-canvas-header.break.tablet.members-header > header.gh-canvas-header-content > section.view-actions > div.view-actions-top-row > a');
    return await element.click();
});

When('I enter the new member name {kraken-string}', async function (value) {
    let element = await this.driver.$('#member-name');
    return await element.setValue(value);
});

When('I enter the new member email {kraken-string}', async function (value) {
    let element = await this.driver.$('#member-email');
    return await element.setValue(value);
});

When('I click on save member', async function () {
    // let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas > div.gh-canvas-header.sticky.gh-member-header > header.gh-canvas-header-content > section.view-actions > button');
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas > div.gh-canvas-header > header.gh-canvas-header-content > section.view-actions > button');
    return await element.click();
});

When('I click on search', async function(){
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > header.gh-nav-menu > div.gh-nav-menu-search > button.gh-nav-btn-search')
    return await element.click();
});

When('I click on Drafts', async function(){
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(1) > div.liquid-container.ember-view > div.liquid-child.ember-view > ul.gh-nav-view-list > li:nth-child(1)');
    return await element.click();
});

When('I enter post name {kraken-string}', async function (value) {
    let element = await this.driver.$('body.ember-application.epm-scrolling-disabled > div.epm-modal-container > div.epm-modal.fullscreen-modal-action.fullscreen-modal-wide > div.modal-content > div.gh-nav-search-modal > div.gh-nav-search-input > div.ember-basic-dropdown.ember-power-select-search > div.ember-view.ember-basic-dropdown-trigger.ember-basic-dropdown-trigger--in-place.ember-power-select-trigger > input');
    //return await element.click();
    return await element.setValue(value);
});

When('I write post title {kraken-string}', async function (value) {
    let element = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    //return await element.click();
    await element.setValue(value);
    element = await this.driver.$('div.koenig-editor__editor-wrapper');
    return await element.click();
});
When('I write post body {kraken-string}', async function (value) {
    let element = await this.driver.$('div.koenig-editor__editor-wrapper');
    await element.click();
    return await element.setValue(value);
});

When('I click on SortBy', async function(){
    let element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-sort');
    return await element.click();
});

When('I click on NewPost', async function(){
    let element = await this.driver.$('a.ember-view.gh-secondary-action.gh-nav-new-post');
    return await element.click();
});


When('I click on Access', async function(){
    let element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-visibility');
    return await element.click();
});

When('I click on State', async function(){
    let element = await this.driver.$('div.gh-contentfilter-menu.gh-contentfilter-type');
    return await element.click();
});

When('I enter an invalid password {kraken-string}', async function (value) {
    let element = await this.driver.$('#login.gh-signin > div > span.gh-input-icon.gh-icon-lock.forgotten-wrap > input');
    return await element.setValue(value);
});

When('I enter an invalid email {kraken-string}', async function (value) {
    let element = await this.driver.$('#login.gh-signin > div > span.gh-input-icon.gh-icon-mail > input');
    return await element.setValue(value);
});

When('I enter the tag slug {kraken-string}', async function (value) {
    let element = await this.driver.$('#tag-slug');
    return await element.setValue(value);
});

When('I enter a pseudo-random tag color', async function(){
    let element = await this.driver.$('div > main > section > form > div:nth-child(2) > section > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > input');
    let randomColor = generateRandomColor();
    return await element.setValue(randomColor);
});

When('I enter the description {kraken-string}', async function (value) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(value);
});

When('I enter a random tag color {kraken-string}', async function (value) {
    let element = await this.driver.$('div > main > section > form > div:nth-child(2) > section > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > input');
    return await element.setValue(value);
});

When('I enter a 499 character description', async function(){
    let element = await this.driver.$('#tag-description');
    let validDescription = generateStringByLength(499);
    return await element.setValue(validDescription);
});

When('I enter a 500 character description', async function(){
    let element = await this.driver.$('#tag-description');
    let validDescription = generateStringByLength(500);
    return await element.setValue(validDescription);
});

When('I enter a 501 character description', async function(){
    let element = await this.driver.$('#tag-description');
    let validDescription = generateStringByLength(501);
    return await element.setValue(validDescription);
});

When('I enter a 190 character tag name', async function(){
    let element = await this.driver.$('#tag-name');
    let name = generateStringByLength(190);
    return await element.setValue(name);
});

When('I enter a 191 character tag name', async function(){
    let element = await this.driver.$('#tag-name');
    let name = generateStringByLength(191);
    return await element.setValue(name);
});

When('I enter a 192 character tag name', async function(){
    let element = await this.driver.$('#tag-name');
    let name = generateStringByLength(192);
    return await element.setValue(name);
});

When('I enter a 190 character tag slug', async function(){
    let element = await this.driver.$('#tag-slug');
    let name = generateStringByLength(190);
    return await element.setValue(name);
});

When('I enter a 191 character tag slug', async function(){
    let element = await this.driver.$('#tag-slug');
    let name = generateStringByLength(191);
    return await element.setValue(name);
});

When('I enter a 192 character tag slug', async function(){
    let element = await this.driver.$('#tag-slug');
    let name = generateStringByLength(192);
    return await element.setValue(name);
});

When('I enter a 69 character email for the member', async function(){
    let element = await this.driver.$('#member-email');
    let longString = generateStringByLength(63);
    let email = longString+'@a.com';
    return await element.setValue(email);
});

When('I enter a 70 character email for the member', async function(){
    let element = await this.driver.$('#member-email');
    let longString = generateStringByLength(64);
    let email = longString+'@a.com';
    return await element.setValue(email);
});

When('I enter a 71 character email for the member', async function(){
    let element = await this.driver.$('#member-email');
    let longString = generateStringByLength(65);
    let email = longString+'@a.com';
    return await element.setValue(email);
});

When('I enter the new member valid email {kraken-string}', async function (value) {
    let element = await this.driver.$('#member-email');
    let memberEmail = value + '@gmail.com';
    return await element.setValue(memberEmail);
});

When('I enter a 499 character note', async function(){
    let element = await this.driver.$('#member-note');
    let note = generateStringByLength(499);
    return await element.setValue(note);
});

When('I enter a 500 character note', async function(){
    let element = await this.driver.$('#member-note');
    let note = generateStringByLength(500);
    return await element.setValue(note);
});

When('I enter a 501 character note', async function(){
    let element = await this.driver.$('#member-note');
    let note = generateStringByLength(501);
    return await element.setValue(note);
});

When('I enter a 190 character member name', async function(){
    let element = await this.driver.$('#member-name');
    let name = generateStringByLength(190);
    return await element.setValue(name);
});

When('I enter a 191 character member name', async function(){
    let element = await this.driver.$('#member-name');
    let name = generateStringByLength(191);
    return await element.setValue(name);
});

When('I enter a 192 character member name', async function(){
    let element = await this.driver.$('#member-name');
    let name = generateStringByLength(192);
    return await element.setValue(name);
});


// ----------------------------------------------- THEN -------------------------------------------------------

Then('I select Right Now', async function () {
    let element = await this.driver.$('div.gh-publish-setting.last > button');
    await element.click();
    element = await this.driver.$('div.gh-radio')
    return await element.click();
});

Then('I confirm delete the post', async function () {
    let element = await this.driver.$('button.gh-revert-to-draft');
    return await element.click();
});

Then('I delete the post', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-unpublish-trigger');
    return await element.click();
});

Then('I select first post', async function () {
    let element = await this.driver.$('a.ember-view.permalink.gh-list-data.gh-post-list-title');
    return await element.click();
});

Then('I select Published Pages', async function () {
    let element = await this.driver.$('ul.ember-power-select-options > li:nth-child(3) ');
    return await element.click();
});

Then('I select public', async function () {
    let element = await this.driver.$('ul.ember-power-select-options > li:nth-child(2) ');
    return await element.click();
});
Then('I SortBy Recently updated', async function () {
    let element = await this.driver.$('ul.ember-power-select-options > li:nth-child(3) ');
    return await element.click();
});
Then('I publish post', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger');
    return await element.click();
});


Then('I click PublishPost', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
    return await element.click();
});

Then('I click continue', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-black.gh-btn-large');
    return await element.click();
});

Then('I should see the post coming soon', async function () {
    let element = await this.driver.$('ul.ember-power-select-options > li.ember-power-select-group > ul.ember-power-select-options > li.ember-power-select-option');
    return await element.click();
});

Then('I should see the all authors option', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(1)');
    return await element;
});

Then('I should be able to filter by all authors', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(1)');
    return await element.click();
});


Then('I should see the option with my name', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element;
});

Then('I should be able to filter by my publications', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element.click();
});

Then('I should see the option to sort by recent', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(3)');
    return await element;
});

Then('I should be able to sort by recent', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(3)');
    return await element.click();
});

Then('I should see the option to filter by public posts', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element;
});

Then('I should be able to filter by public posts', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element.click();
});

Then('I should see the option to filter by all types of posts', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(1)');
    return await element;
});

Then('I should be able to filter by all types of posts', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(1)');
    return await element.click();
});

Then('I should see the option to filter by posts with News tag', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element;
});

Then('I should be able to filter by posts with News tag', async function () {
    let element = await this.driver.$('#ember-basic-dropdown-wormhole > div > ul > li:nth-child(2)');
    return await element.click();
});

Then('I should see the created tag', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(3)');
    return await element.click();
});

Then('I should see the option to open the new page', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen.epm-scrolling-disabled > div.epm-modal-container > div > div.flex.flex-column.h-100.items-center.overflow-auto > div.gh-publish-settings-container.fade-in > a.gh-post-bookmark-wrapper');
    return await element.click();
});

Then('I should see the option to view the page preview', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen > div.gh-app > div.gh-viewport > main.gh-main.gh-main-white > div.flex.flex-row > section > header.gh-editor-header.br2.pe-none > section.flex.items-center.pe-auto.h-100 > button.gh-btn.gh-btn-editor.gh-editor-preview-trigger');
    return await element;
});

Then('I should be able to preview the page', async function () {
    let element = await this.driver.$('body.ember-application.gh-body-fullscreen > div.gh-app > div.gh-viewport > main.gh-main.gh-main-white > div.flex.flex-row > section > header.gh-editor-header.br2.pe-none > section.flex.items-center.pe-auto.h-100 > button.gh-btn.gh-btn-editor.gh-editor-preview-trigger');
    return await element.click();
});

Then('I should get an error message that specifies that the member already exists', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > main.gh-main > section.gh-canvas > div > form.member-basic-info-form > div.gh-member-settings > section.gh-main-section.columns-3 > div.gh-main-section-block.span-2 > div.gh-main-section-content.grey > div > div.gh-cp-member-email-name > div.form-group.max-width.error > p.response');
    return await element.click();
});

Then('I should see an incorrect password message', async function () {
    let element = await this.driver.$('body.ember-application.unauthenticated-route > div.gh-app > div.gh-viewport > main.gh-main > div.gh-flow > div.gh-flow-content-wrap > section.gh-flow-content > p.main-error');
    let errorMessage = await element.getText();
    let expectedError = "Your password is incorrect.";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see a message to fill out the form', async function () {
    let element = await this.driver.$('body.ember-application.unauthenticated-route > div.gh-app > div.gh-viewport > main.gh-main > div.gh-flow > div.gh-flow-content-wrap > section.gh-flow-content > p.main-error');
    let errorMessage = await element.getText();
    let expectedError = "Please fill out the form to sign in.";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see an error message of no user', async function () {
    let element = await this.driver.$('body.ember-application.unauthenticated-route > div.gh-app > div.gh-viewport > main.gh-main > div.gh-flow > div.gh-flow-content-wrap > section.gh-flow-content > p.main-error');
    let errorMessage = await element.getText();
    let expectedError = "There is no user with that email address";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see that I should specify a name for the tag', async function () {
    let element = await this.driver.$('div > main > section > form > div:nth-child(2) > section > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span > p:nth-child(1)');
    let errorMessage = await element.getText();
    let expectedError = "You must specify a name for the tag.";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see that the color should be an hex value', async function () {
    let element = await this.driver.$('div > main > section > form > div:nth-child(2) > section > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span > p:nth-child(2)');
    let errorMessage = await element.getText();
    let expectedError = "The colour should be in valid hex format";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the description too long error message', async function () {
    let element = await this.driver.$('div > main > section > form > div:nth-child(2) > section > div > div:nth-child(1) > div:nth-child(3) > p:nth-of-type(1)');
    let errorMessage = await element.getText();
    let expectedError = "Description cannot be longer than 500 characters";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the tag name too long error message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > form > div:nth-of-type(2) > section > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > span > p:nth-of-type(1)');
    let errorMessage = await element.getText();
    let expectedError = "Tag names cannot be longer than 191 characters";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the tag slug too long error message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > form > div:nth-of-type(2) > section > div > div:nth-of-type(1) > div:nth-of-type(2) > p:nth-of-type(2)');
    let errorMessage = await element.getText();
    let expectedError = "URL cannot be longer than 191 characters";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should get a message asking me to enter an email', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > div:nth-of-type(2) > form > div > section > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2) > p');
    let errorMessage = await element.getText();
    let expectedError = "Please enter an email";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the new member', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(4)');
    return await element.click();
});

Then('I should see the saved message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > div:nth-of-type(1) > header > section > button > span');
    let responseMessage = await element.getText();
    let expectedResponse = "Saved";
    assert.ok(responseMessage.includes(expectedResponse), `Response message "${responseMessage}" does not contain ${expectedResponse}`);
});

Then('I should see the invalid email error message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > div:nth-of-type(2) > form > div > section > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div:nth-of-type(2) > p');
    let errorMessage = await element.getText();
    let expectedError = "Invalid Email";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the note too long error message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > div:nth-of-type(2) > form > div > section > div > div:nth-of-type(1) > div > div:nth-of-type(3) > p:nth-of-type(1)');
    let errorMessage = await element.getText();
    let expectedError = "Note is too long.";
    assert.ok(errorMessage.includes(expectedError), `Error message "${errorMessage}" does not contain ${expectedError}`);
});

Then('I should see the invalid name message', async function () {
    let element = await this.driver.$('div:nth-of-type(2) > div > main > section > div:nth-of-type(1) > header > section > button > span');
    let responseMessage = await element.getText();
    let expectedResponse = "Retry";
    assert.ok(responseMessage.includes(expectedResponse), `Response message "${responseMessage}" does not contain ${expectedResponse}`);
});

// ---------------------------------- STEPS FOR GHOST V3.42 VERSION -------------------------------------------------------


When('I click on tags on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > nav > section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4) > a');
    return await element.click();
});

When('I click on new tag on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > main.gh-main > section.gh-canvas.tags-view > header.gh-canvas-header.tags-header > section.view-actions > a');
    return await element.click();
});

When('I click on save tag on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > main.gh-main > section.gh-canvas > form.mb15 > header.gh-canvas-header > section.view-actions > button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view');
    return await element.click();
});

When('I click on members on the old version', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(4)');
    return await element.click();
});

When('I click on published on the old version', async function () {
    let element = await this.driver.$('body.ember-application > div.gh-app.ember-view > div.gh-viewport > nav > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(2) > div > div > ul.gh-nav-view-list > li:nth-child(3) > a.ember-view');
    return await element.click();
});

When('I click on order dropdown on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > main.gh-main > section.gh-canvas > header.gh-canvas-header.post-header > section.view-actions > div.gh-contentfilter > div.gh-contentfilter-menu.gh-contentfilter-sort > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger');
    return await element.click();
});

When('I click on NewPost old', async function(){
    let element = await this.driver.$('a.gh-secondary-action.gh-nav-new-post.ember-view');
    return await element.click();
});

When('I click on Published old', async function () {
    let element = await this.driver.$('section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li.gh-nav-list-new.relative > div > div > ul.gh-nav-view-list > li > a');
    return await element.click();
});

When('I click on Drafts old', async function(){
    let element = await this.driver.$('section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li.gh-nav-list-new.relative > div > div > ul.gh-nav-view-list > li:nth-child(1)');
    return await element.click();
});

Then('I should see the created tag on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > nav > section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4) > a');
    return await element.click();
});

Then('I publish post old', async function () {
    let element = await this.driver.$('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger');
    return await element.click();
});

Then('I click Publish old', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view');
    return await element.click();
});
