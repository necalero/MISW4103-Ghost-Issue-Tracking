const { Given, When, Then } = require('@cucumber/cucumber');

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

When('I click on Schedule', async function(){
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(1) > div.liquid-container.ember-view > div.liquid-child.ember-view > ul.gh-nav-view-list > li:nth-child(2)');
    return await element.click();
});

When('I click on Published', async function(){
    let element = await this.driver.$('body.ember-application > div.gh-app > div.gh-viewport > nav.gh-nav > div.flex.flex-column.h-100 > section.gh-nav-body > div.gh-nav-top > ul:nth-child(2) > li:nth-child(1) > div.liquid-container.ember-view > div.liquid-child.ember-view > ul.gh-nav-view-list > li:nth-child(3)');
    return await element.click();
});

When('I enter post name {kraken-string}', async function (value) {
    let element = await this.driver.$('body.ember-application.epm-scrolling-disabled > div.epm-modal-container > div.epm-modal.fullscreen-modal-action.fullscreen-modal-wide > div.modal-content > div.gh-nav-search-modal > div.gh-nav-search-input > div.ember-basic-dropdown.ember-power-select-search > div.ember-view.ember-basic-dropdown-trigger.ember-basic-dropdown-trigger--in-place.ember-power-select-trigger > input');
    //return await element.click();
    return await element.setValue(value);
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



