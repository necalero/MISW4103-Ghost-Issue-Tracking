const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require('fs');
const { options } = config;

const KrakenRootPath = '../../KRAKEN/reports/VRT';

async function executeVRT(rootPath) {
  console.log("[START] Executing VRT Report!!");
  let stylesFile = createStylesFile();
  fs.writeFileSync(`${rootPath}/vrtReport.css`, stylesFile);

  let scenariosPath = `${rootPath}/Results`;

  let itemsInFolder = countItemsInFolder(scenariosPath);
  console.log("[INFO] Number of scenarios: "+itemsInFolder);

  let directoryPath = scenariosPath;

  let scenarioNames = [];

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('[ERROR] Error reading directory:', err);
      return;
    }

    // Filter out only directories
    scenarioNames = files.filter(file => {
      return fs.statSync(`${directoryPath}/${file}`).isDirectory();
    });

    console.log('[INFO] Scenarios found:', scenarioNames);

    // Cycle through scenarios
    for (let i = 0; i < scenarioNames.length; i++) {
      let currentScenarioStepsPath = `${rootPath}/Results/${scenarioNames[i]}/Steps/`;
      fs.readdir(currentScenarioStepsPath, async (err, files) => {
        if (err) {
          console.error('[ERROR] Error reading directory:', err);
          return;
        }

        // Filter out only directories
        let steps = files.filter(file => {
          return fs.statSync(`${currentScenarioStepsPath}/${file}`).isDirectory();
        });

        console.log('[INFO] Step directories:', steps);

        // Cycle through steps
        for (let j = 0; j < steps.length; j++) {
          let currentStepRoute = `${rootPath}/Results/${scenarioNames[i]}/Steps/${steps[j]}`;

          itemCount = countItemsInFolder(currentStepRoute);
          if (itemCount >= 2) {
            try {
              let beforeImageRoute = `${currentStepRoute}/before.png`;
              let afterImageRoute = `${currentStepRoute}/after.png`;
              const data = await compareImages(
                fs.readFileSync(beforeImageRoute),
                fs.readFileSync(afterImageRoute),
                options
              );
              let resultInfo = {}
              resultInfo[0] = {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
              }

              let comparedImage = data.getBuffer();
              fs.writeFileSync(`${rootPath}/Results/${scenarioNames[i]}/Steps/${steps[j]}/compared.png`, comparedImage);

              let stepReport = createStepReport(scenarioNames[i], steps[j], resultInfo[0]);
              fs.writeFileSync(`${rootPath}/Results/${scenarioNames[i]}/Steps/${steps[j]}/report.html`, stepReport);


            } catch (error) {
              console.log("[ERROR] The following error ocurred while trying to compare the images: "+error);
            }

          } else {
            console.log(`[SKIPPING] Missing one or more images for this step of the scenario <${scenarioNames[i]}>, wont run VRT until tests for both versions have been executed.`) 
          }

        }
        let incomplete = true;
        firstStepCount = countItemsInFolder(`${rootPath}/Results/${scenarioNames[i]}/Steps/001`);
          if (firstStepCount >= 2) 
            {
              incomplete = false;
            }

        let scenarioReport = createScenarioReport(scenarioNames[i], steps, incomplete);
        fs.writeFileSync(`${rootPath}/Results/${scenarioNames[i]}/report.html`, scenarioReport);
      });

    }

    let vrtReport = createVrtReport(scenarioNames);
    fs.writeFileSync(`${rootPath}/vrtReport.html`, vrtReport);
  });




}


function countItemsInFolder(folderPath) {
  try {
    // Read the contents of the folder synchronously
    const items = fs.readdirSync(folderPath);
    // Count the number of items
    const itemCount = items.length;
    return itemCount;
  } catch (error) {
    console.error('[ERROR] Error:', error);
    return -1; // Return -1 to indicate an error
  }
}


function createVrtReport(scenarios) {
  console.log(`[INFO] Generating list items for: ${scenarios}`);

  // Generate list items dynamically based on scenarios array
  const listItems = scenarios.map(scenario => `
  <li class="link-list-item">
    <a href="./Results/${scenario}/report.html">${scenario}</a>
  </li>
`).join('');

  return `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>VRT Report</title>
      <link rel="stylesheet" href="vrtReport.css" />
    </head>
    <body>
      <header>
        <h1>VRT Report</h1>
      </header>
      <main>
        <div id="visualizer">
          <h2>Please select the scenario you would like to inspect:</h2>
          <div class="item-list-container" id="scenario-list">
            <ul>
            ${listItems}
              
            </ul>
          </div>
        </div>
      </main>
    </body>
    </html>
    
    `
}

function createScenarioReport(scenarioName, steps, incomplete) {

  if(incomplete){
    console.log(`[INFO] Generating page for incomplete scenario.`);
    return `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VRT Report</title>
    <link rel="stylesheet" href="../../vrtReport.css" />
  </head>
  <body>
    <header>
      <h1>${scenarioName} Report</h1>
    </header>
    <main>
      <div id="visualizer">
        <h2>The selected scenario doesn't have samples from both versions. <br/><br/> Please run the tests on both versions to collect enough screenshots to execute VRT.</h2>
        
      </div>
    </main>
  </body>
</html>

    
    `
  }

  console.log(`[INFO] Generating list items for: ${steps}`);

  // Generate list items dynamically based on scenarios array
  const listItems = steps.map(step => `
    <div class="gallery-item">
    <a href="./Steps/${step}/report.html">
      <img src="./Steps/${step}/compared.png" alt="Step ${step}" />
      <h3>Step ${step}</h3>
    </a>
  </div>
`).join('');



  return `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VRT Report</title>
    <link rel="stylesheet" href="../../vrtReport.css" />
  </head>
  <body>
    <header>
      <h1>${scenarioName} Report</h1>
    </header>
    <main>
      <div id="visualizer">
        <h2>Please select the step you would like to inspect:</h2>
        <div class="gallery-container" id="scenario-gallery">
          
          ${listItems}
        </div>
      </div>
    </main>
  </body>
</html>

    
    `
}

function createStepReport(scenarioName, step, comparisonInfo) {
  return `
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VRT Report</title>
        <link rel="stylesheet" href="../../../../vrtReport.css" />
    </head>
    <body>
        <header>
        <h1>${scenarioName} - Step ${step} Report</h1>
        </header>
        <main>
        <div class="main-layout">
            <div class="comparison-info">
            <h2>Comparison Information</h2>
            <ul>
                <li>Same Dimensions: ${comparisonInfo.isSameDimensions} <span id="sameDimensions"></span></li>
                <li>MisMatch Percentage: ${comparisonInfo.misMatchPercentage} <span id="misMatchPercentage"></span></li>
                <li>Analysis Time: ${comparisonInfo.analysisTime} <span id="analysisTime"></span> ms</li>
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
    </body>
    </html>
`
}

function createStylesFile() {
  return `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px 0;
  }
  
  h1 {
    margin: 0;
  }
  
  main {
    padding: 20px;
  }
  
  .image-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .image {
    text-align: center;
  }
  
  .image img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .final-image-container {
    text-align: center;
  }
  
  .final-image-container h2 {
    margin-bottom: 10px;
  }
  
  .final-image-container img {
    max-width: 85%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .image h2 {
    margin-top: 0;
  }
  
  .report-visualizer {
    width: 50%;
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  #visualizer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .link-list-item {
    margin: 2%;
  }
  
  .left-container {
    width: 30%;
  }
  
  .comparison-info {
    margin-top: 40px;
  }
  
  .comparison-info h2 {
    margin-bottom: 15%;
  }
  
  .comparison-info ul {
    list-style-type: none;
    padding: 0;
  }
  
  .comparison-info li {
    margin-bottom: 10%;
    font-size: 21px;
  }
  
  .comparison-info li span {
    font-weight: bold;
  }
  
  .main-layout {
    display: flex;
    justify-content: space-around;
  }
  
  .item-list-container {
    width: 50%;
  }
  
  .item-list-container ul {
    width: 100%;
  }
  
  .gallery-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .gallery-item {
    margin: 10px;
    width: 25vh;
    height: 25vh;
    border: 1px solid #ccc;
    border-radius: 25px;
    overflow: hidden;
  }
  
  .gallery-item a {
    width: 100%;
    height: 100%;
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  .gallery-item img {
    width: 100%;
    height: 80%;
    border-bottom: 1px solid #ccc;
  }
  
  .gallery-item h3 {
    margin-left: 10%;
    margin: 10px 0;
    font-size: 16px;
    text-align: center;
  }
  
  /* Hover effect */
  .gallery-item:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  
  `;
}

module.exports = { executeVRT };