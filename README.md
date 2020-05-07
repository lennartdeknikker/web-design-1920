# Web Design @cmda-minor-web 19/20

This repository contains the documentation and code for the prototype of an application to open and view excel-files in your browser. This application is exclusively designed for our test subject who suffers from Macula Degeneration(MD).
By building this application, I'm hoping to make it easier for him to view data from excel files. 

![screenshot](wiki-assets/screenshots/home.png)

More information on `exclusive design`, our test subject, my research and the process of building this application can be found in the [wiki](https://github.com/lennartdeknikker/web-design-1920/wiki) for this repository.

## Contents
1. [Installation](#installation)

## Installation
To work on this project:
1. navigate to your projects folder using your terminal:
   ```
   cd <desired projects folder>
   ```
2. Clone the repository: 
   ```
   git clone https://github.com/lennartdeknikker/web-design-1920.git
   ```
3. navigate into the docs folder:
   ```
   cd web-design-1920/docs
   ```
4. Install the necessary packages:
   ```
   npm install
   ```
5. Run the application:
   ```
   npm run dev
   ```
6. Open the application in your browser: [localhost:3000](http://localhost:3000/)

## Features
### Current features
* [x] Load excel files into the browser.
* [x] Open last viewed file
* [x] Explicitely show page loads
* [x] Show multiple sheets
* [x] Tabbing through shown tables
* [x] enlarge rows by pressing plus-key
* [x] Read out instructions by pressing the I-key
* [x] Read out rows by pressing the spacebar
* [x] Go back to opening a new file by pressing the escape-key.
* [x] sticky table headers
* [x] auto-scroll to keep the selected row at the same spot when tabbing through tables

### Future features
* [ ] Recognize dates
* [ ] Recognize financial data
* [ ] Recognize trends in data and show simple graphs

## Dependencies
- [XLSX](https://www.npmjs.com/package/xlsx) - to transform `.xls` and `.xlsx` files to `.json`.
- [http-server](https://www.npmjs.com/package/http-server) - to serve the application in the browser during development

