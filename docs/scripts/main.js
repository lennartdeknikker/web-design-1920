const synth = window.speechSynthesis

const uploadButton = document.getElementById('button-upload')
const reopenButton = document.getElementById('button-reopen')
const uploadInput = document.getElementById('input-upload')
const introHeader = document.getElementById('intro-header')
const goBackButton = document.getElementById('button-go-back')
const tableSection = document.getElementById('section-show-table')
const body = document.querySelector('body')

uploadInput.addEventListener('change', onFileChange, false)
uploadButton.addEventListener('click', triggerFileBrowser)
reopenButton.addEventListener('click', handleData)
tableSection.addEventListener('keypress', makeRowBigger)
tableSection.addEventListener('keyup', makeRowSmaller)
body.addEventListener('keydown', onKeyPress)


function triggerFileBrowser() {
  uploadInput.click()
  animate()
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

function animate() {
  const body = document.querySelector('body')
  if (body.classList.contains('darken')) body.classList.remove('darken')
  void body.offsetWidth
  body.classList.add('darken')
}

function handleData() {
  goBackButton.classList.remove('hidden')
  animate()
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
  buttonsContainer.innerHTML = ''
  for (let table in parsedData) {
    const newButton = document.createElement('button')
    newButton.classList.add('button-file')
    newButton.innerText = parsedData[table].name.toUpperCase()
    newButton.addEventListener('click', () => {
      animate()
      showTableFor(parsedData[table], 'section-show-table')
    })
    buttonsContainer.appendChild(newButton)
  }
}

// Function to process excel data, so it can be used.

function processNewData(file) {
  const fileReader = new FileReader()
  fileReader.result = []

  fileReader.onload = function(event) {
    const data = event.target.result
    // eslint-disable-next-line no-undef
    const workbook = XLSX.read(data, {
      type: 'binary'
    })
    let tables = []
    workbook.SheetNames.forEach(sheet => {
      let table = {
        name: sheet
      }
      // eslint-disable-next-line no-undef
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


// functions to create a table

function showTableFor(tableObject, target) {
  tts('druk op i voor informatie')
  changeVisibleSectionTo('section-show-table')
  const targetElement = document.getElementById(target)
  
  const newTable = document.createElement('table')
  const tableCaption = createCaption(tableObject.name)
  const tableHead = createHead(tableObject.data[0])
  const tableBody = createBody(tableObject.data)

  newTable.appendChild(tableCaption)
  newTable.appendChild(tableHead)
  newTable.appendChild(tableBody)
  targetElement.appendChild(newTable)
}

function createCaption(name) {
  const newTableCaption = document.createElement('caption')
  newTableCaption.innerText = name
  return newTableCaption
}

function createHead(data) {
  const newTableHead = document.createElement('thead')
  const newTableHeadRow = document.createElement('tr')  

  for (let element in data){
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
    newRow.tabIndex = 0
    for (let property in data[item]) {
      let text = data[item][property]
      if (typeof text === 'number') {
        text = Math.round(text * 100) / 100
      }
      const newCell = document.createElement('td')
      newCell.innerText = text
      newRow.appendChild(newCell)
    }
    newTableBody.appendChild(newRow)
  }
  return newTableBody
}



// key actions

function makeRowSmaller(event) {
  if (event.code === 'Equal' || event.code === 'NumpadAdd') {
    event.preventDefault()
    document.activeElement.classList.remove('bigger')
  }
  if (event.code === 'Tab') document.activeElement.scrollIntoView({block: 'center', behavior: 'smooth'})
}

function makeRowBigger(event) {
  event.preventDefault()
  if (event.code === 'Equal' || event.code === 'NumpadAdd') {
    document.activeElement.classList.add('bigger')
  }
  if (event.code === 'Space') {    
    ttsForRow(document.activeElement)
  }
}

function onKeyPress() {
  console.log(event.code)

  if (event.code === 'KeyS') {
    const allTds = document.querySelectorAll('td')

    for (let td of allTds) {
      td.classList.add('unchiseled')
      td.addEventListener('click', sculpt)
    }
  }

  function sculpt() {
    this.classList.remove('unchiseled')
    this.classList.add('chiseled')
  }

  if (event.code === 'KeyI') {
    tts(`Navigeer met tab door de tabel.<p>
    Houd de plus-toets ingedrukt om een geselecteerde rij te vergroten.<p>
    Druk op spatie om een rij voor te lezen.<p>
    Druk op escape om een ander bestand te openen.`)
  }
  if (event.code === 'Enter') {
    goBackButton.classList.remove('hidden')
    animate()
    // eslint-disable-next-line no-undef
    const parsedData = sampleData
  
    if (parsedData.length > 1) {
      changeVisibleSectionTo('section-pick-sheet')
      addButtonsForEachSheet(parsedData)
    } else {
      showTableFor(parsedData[0], 'section-show-table')
    }
  } else if (event.code === 'Escape') {
    event.preventDefault()
    goBackButton.click()
  }
}

// TTS functions

function ttsForRow(rowElement) {
  const headers = document.querySelectorAll('th')
  const dataElements = rowElement.querySelectorAll('td')  
  let totalText = ''

  for (let i = 0; i < dataElements.length; i++) {
    const string = headers[i].innerText + ' is ' + dataElements[i].innerText + '<p>'
    totalText += string
  }

  tts(totalText)
}

function tts(text) {
  const splitUpText = text.split('<p>')
  synth.cancel()

  for (let textItem of splitUpText) {
    const utterance = new SpeechSynthesisUtterance(textItem)
    synth.speak(utterance)
  }

}

// first check if there's already data in storage and ask the user if he wants to see the same data again or open another file.
if (localStorage.getItem('table-data')) {
  reopenButton.classList.remove('hidden')
}
