function handleData(data) {
  createTable(data, 'table-container')
}

function createTable(data, target) {
  
  const targetElement = document.getElementById(target)
  
  const newTable = document.createElement('table')
  const tableHead = createHead(data)
  const tableBody = createBody(data)

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