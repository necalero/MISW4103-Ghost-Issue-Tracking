const { Given, When, Then, Before, AfterStep, After, setWorldConstructor } = require('@cucumber/cucumber');
const compareImages = require("resemblejs/compareImages")
const config = require("../../../config.json");
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
    await createDirectory(`./reports/VRT/`)
});

setWorldConstructor(CustomWorld);

AfterStep(async function () {
    if (step === 1) {
        const rutaCarpeta = `./reports/VRT/${this.scenarioName}/`;
        await fs.promises.mkdir(rutaCarpeta, { recursive: true }, (error) => {
            if (error) {
                console.error('Error al crear la carpeta:', error);
            } else {
                console.log('Carpeta creada exitosamente');
            }
        });        
    }

    let screenshot = await this.driver.saveScreenshot(
        `./reports/VRT/${this.scenarioName}/${step}.png`
    );
    step ++
    this.attach(screenshot, 'image/png')
});

After(async function () {
    // Check if the version being tested is v5.14.1
    const trimmedScenarioName = this.scenarioName.split('...')[0];
    if (this.scenarioName.includes('v5')) {
        // Check if the folder for version 3.42 exists
        const folderPath = `./reports/VRT/${trimmedScenarioName}...v3.42/`;
        if (fs.existsSync(folderPath)) {
            // Run visual regression tests
            console.log("SUCCESS!! VRT executed for v5.14.1")
            let itemsInFolder = countItemsInFolder(folderPath);
            console.log(itemsInFolder);
            for(let i = 1; i <= itemsInFolder; i ++ )
            {
                await executeVRT(trimmedScenarioName, i);
            }

        } else {
            console.log('Folder for version 3.42 does not exist. Wont run VRT until screenshots are recollected for other version.');
        }
    } else if (this.scenarioName.includes('v3')) {
        // Check if the folder for version 5.14.1 exists
        const folderPath = `./reports/VRT/${trimmedScenarioName}...v5.14.1/`;
        if (fs.existsSync(folderPath)) {
            // Run visual regression tests
            console.log("SUCCESS!! VRT executed for v3.42")
            let itemsInFolder = countItemsInFolder(folderPath);
            console.log(itemsInFolder);
            for(let i = 1; i <= itemsInFolder; i ++ )
            {
                await executeVRT(trimmedScenarioName, i);
            }
        } else {
            console.log('Folder for version 5.14.1 does not exist. Wont run VRT until screenshots are recollected for other version.');
        }
    } else {
        console.log('Scenario does not belong to either version v5.14.1 or v3.42');
    }
});

async function executeVRT(scenarioName, i){
    console.log("Entered execute VRT function: ");

    try {
        const imagePathV3 = `./reports/VRT/${scenarioName}...v3.42/${i}.png`;
        const imagePathV5 = `./reports/VRT/${scenarioName}...v5.14.1/${i}.png`;
    
        if (fs.existsSync(imagePathV3) && fs.existsSync(imagePathV5)) {
            const data = await compareImages(
                fs.readFileSync(imagePathV3),
                fs.readFileSync(imagePathV5),
                options
            );
            console.log("Data obtained: "+data.misMatchPercentage);
            let resultInfo = {}
            resultInfo[0] = {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
            }
            console.log("Result info is: " + JSON.stringify(resultInfo));

            await createDirectory(`./reports/VRT/Results/`);
            await createDirectory(`./reports/VRT/Results/${scenarioName}`);
            await createDirectory(`./reports/VRT/Results/${scenarioName}/Steps`);
            await createDirectory(`./reports/VRT/Results/${scenarioName}/Steps/${i}`);
            
            // let comparisonImage = data.getBuffer();
            let stepReportHtml =  createStepReport(scenarioName, i, resultInfo[0]);

            let steps = {}
            
            let stepCount = await countItemsInFolder(`./reports/VRT/${scenarioName}...v3.42/`);

            for(let i = 1; i < stepCount; i++)
            {
                steps[i] = i;
            }



            let scenarioReportHtml =  createScenarioReport(scenarioName, steps);

            fs.writeFileSync(`./reports/VRT/Results/${scenarioName}/Steps/${i}/compared.png`, data.getBuffer());
            fs.copyFileSync(imagePathV3, `./reports/VRT/Results/${scenarioName}/Steps/${i}/before.png`);
            fs.copyFileSync(imagePathV5, `./reports/VRT/Results/${scenarioName}/Steps/${i}/after.png`);
            if (!fs.existsSync(`./reports/VRT/Results/vrtReport.css`)) {
                fs.copyFileSync('./vrtReport.css', `./reports/VRT/Results/vrtReport.css`);
            }
            fs.writeFileSync(`./reports/VRT/Results/${scenarioName}/Steps/${i}/report.html`, stepReportHtml);
            fs.writeFileSync(`./reports/VRT/Results/${scenarioName}/report.html`, scenarioReportHtml);
        } else {
            console.log('One or both of the images does not exist.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
}

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

function createScenarioReport(scenarioName, steps)
{
    return `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VRT Report</title>
    <link rel="stylesheet" href="../vrtReport.css" />
  </head>
  <body>
    <header>
      <h1>Scenario ${scenarioName} Report</h1>
    </header>
    <main>
      <div id="visualizer">
        <h2>Please select the step you would like to inspect:</h2>
        <div class="gallery-container" id="scenario-gallery">   
          ${Object.keys(steps).map(step => createStepCard(step))}
        </div>
      </div>
    </main>

    <script src="script.js"></script>
  </body>
</html>
    
    `
}

function createStepCard(step) {
    return `
      <div class="gallery-item">
        <a href="./Steps/${step}/report.html">
          <img src="./Steps/${step}/compared.png" alt="Step ${step}" />
          <h3>Step ${step}</h3>
        </a>
      </div>
    `;
  }

function createStepReport(scenarioName, i, resInfo){
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VRT Report</title>
        <link rel="stylesheet" href="../../../vrtReport.css" />
    </head>
    <body>
        <header>
        <h1>${scenarioName} - Step ${i} Report</h1>
        </header>
        <main>
        <div class="main-layout">
            <div class="comparison-info">
            <h2>Comparison Information</h2>
            <ul>
                <li>Same Dimensions: ${resInfo.isSameDimensions} <span id="sameDimensions"></span></li>
                <li>MisMatch Percentage: ${resInfo.misMatchPercentage} <span id="misMatchPercentage"></span></li>
                <li>Analysis Time: ${resInfo.analysisTime} <span id="analysisTime"></span> ms</li>
            </ul>
            </div>

            <div class="report-visualizer">
            <div class="image-container">
                <div class="image">
                <img src="./before.png" alt="Before" />
                <h2>v3.42</h2>
                </div>
                <div class="image">
                <img src="./after.png" alt="After" />
                <h2>v5.14.1</h2>
                </div>
            </div>
            <div class="final-image-container">
                <img src="./compared.png" alt="Final" />
                <h2>Overlap</h2>
            </div>
            </div>
        </div>
        </main>

        <script src="script.js"></script>
    </body>
    </html>
`
}

function countItemsInFolder(folderPath) {
    try {
        // Read the contents of the folder synchronously
        const items = fs.readdirSync(folderPath);
        // Count the number of items
        const itemCount = items.length;
        return itemCount;
    } catch (error) {
        console.error('Error:', error);
        return -1; // Return -1 to indicate an error
    }
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

When('I click on NewPost old', async function(){
    let element = await this.driver.$('a.gh-secondary-action.gh-nav-new-post.ember-view');
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

Then('I publish post old', async function () {
    let element = await this.driver.$('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger');
    return await element.click();
});

Then('I click PublishPost', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
    return await element.click();
});

Then('I click Publish old', async function () {
    let element = await this.driver.$('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon ember-view');
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

Then('I should see the created tag on the old version', async function () {
    let element = await this.driver.$('body > div.gh-app.ember-view > div.gh-viewport > nav > section.gh-nav-body > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li:nth-child(4) > a');
    return await element.click();
});


