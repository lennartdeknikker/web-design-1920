
const uploadButton = document.getElementById('button-upload')
const reopenButton = document.getElementById('button-reopen')
const uploadInput = document.getElementById('input-upload')
const introHeader = document.getElementById('intro-header')

uploadInput.addEventListener('change', onFileChange, false)
uploadButton.addEventListener('click', triggerFileBrowser)
reopenButton.addEventListener('click', handleData)
// reopenButton.addEventListener('click', showTableFor)

function triggerFileBrowser() {
  uploadInput.click()
}

async function onFileChange() {
  uploadButton.classList.add('hidden')
  introHeader.classList.remove('red')
  introHeader.innerText = 'Gelukt!'
  processNewData(event.target.files[0])
}

function changeVisibleSectionTo(id) {
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    if (!section.classList.contains('hidden')) {
      section.classList.add('hidden')
    }
    if (section.id === id) section.classList.remove('hidden')    
  })
}

function handleData() {
  const storageData = localStorage.getItem('table-data')  
  const parsedData = JSON.parse(storageData)

  if (parsedData.length > 1) {
    changeVisibleSectionTo('section-pick-sheet')
    addButtonsForEachSheet(parsedData)
  } else {
    showTableFor(parsedData[0], 'section-show-table')
  }
}

function addButtonsForEachSheet(parsedData) {
  const buttonsContainer = document.getElementById('sheet-buttons-container')
  for (let table in parsedData) {
    const newButton = document.createElement('button')
    newButton.innerText = parsedData[table].name
    newButton.addEventListener('click', () => showTableFor(parsedData[table], 'section-show-table'))
    buttonsContainer.appendChild(newButton)
  }
}

function showTableFor(tableObject, target) {
  changeVisibleSectionTo('section-show-table')
  const targetElement = document.getElementById(target)
  console.log(tableObject.data)
  
  const newTable = document.createElement('table')
  const tableHead = createHead(tableObject.data)
  const tableBody = createBody(tableObject.data)

  newTable.appendChild(tableHead)
  newTable.appendChild(tableBody)
  targetElement.appendChild(newTable)
}

function createHead(data) {
  const newTableHead = document.createElement('thead')
  const newTableHeadRow = document.createElement('tr')  

  for (let element in data[0]){
    const newTableHeader = document.createElement('th')
    newTableHeader.innerText = element
    newTableHeadRow.appendChild(newTableHeader)
  }
  
  newTableHead.appendChild(newTableHeadRow)
  return newTableHead
}

function createBody(data) {
  const newTableBody = document.createElement('tbody')
  for (let item in data) {
    const newRow = document.createElement('tr')
    for (let property in data[item]) {
      const newCell = document.createElement('td')
      newCell.innerText = data[item][property]
      newRow.appendChild(newCell)
    }
    newTableBody.appendChild(newRow)
  }
  return newTableBody
}

function processNewData(file) {
  const fileReader = new FileReader()
  fileReader.result = []

  fileReader.onload = function(event) {
    const data = event.target.result
    const workbook = XLSX.read(data, {
      type: 'binary'
    })
    let tables = []
    workbook.SheetNames.forEach(sheet => {
      let table = {
        name: sheet
      }
      let rowObject = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheet]
      )      

      table.data = rowObject
      tables.push(table)
    })    
    localStorage.setItem('table-data', JSON.stringify(tables))
    handleData()
  }
  fileReader.readAsBinaryString(file)
}

// first check if there's already data in storage and ask the user if he wants to see the same data again or open another file.
if (localStorage.getItem('table-data')) {
  console.log('data is already in storage')
  introHeader.innerText = 'Wil je het bestand van laatst opnieuw bekijken of een nieuw bestand openen?'
  reopenButton.classList.remove('hidden')
}