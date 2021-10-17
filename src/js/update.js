const uaup = require('uaup-js');

const defaultStages = {
    Checking: "Checking For Updates!", // When Checking For Updates.
    Found: "Update Found!",  // If an Update is Found.
    NotFound: "No Update Found.", // If an Update is Not Found.
    Downloading: "Downloading...", // When Downloading Update.
    Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Launching..." // When Launching the Application.
};

const updateOptions = {

    gitRepo: "Conforpra", // [Required] Your Repo Name
    gitUsername: "Tecnodiaz",  // [Required] Your GitHub Username.
    isGitRepoPrivate: true,  // {Default is false} [Optional] If the Repo is Private or Public  (Currently not Supported).
    gitRepoToken: "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",  // {Default is null} [Optional] The Token from GitHub to Access a Private Repo.  Only for Private Repos.

    appName: "conforpra", //[Required] The Name of the app archive and the app folder.
    appExecutableName: "conforpra Setup 1.1.1.exe", //[Required] The Executable of the Application to be Run after updating.

    progressBar: document.getElementById("download"), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
    label: document.getElementById("download-label"), // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
};

uaup.Update(updateOptions);