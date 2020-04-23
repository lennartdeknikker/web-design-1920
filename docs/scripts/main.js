
const button = document.querySelector('#upload-button')
const uploadButton = document.querySelector('.file-upload')
const text = document.querySelector('h1')

button.addEventListener('click', triggerUpload)

function triggerUpload() {
  uploadButton.click()
}

uploadButton.addEventListener('change', onFileChange, false)



function onFileChange() {
  button.classList.add('hidden')
  text.classList.remove('red', 'hidden')
  text.innerText = 'Gelukt!'

  convertXlsToJsonAndThen(event.target.files[0], handleJson)  
}

function convertXlsToJsonAndThen(file, callback) {
  const fileReader = new FileReader()
  fileReader.result = []

  fileReader.onload = function(event) {
    const data = event.target.result
    const workbook = XLSX.read(data, {
      type: 'binary'
    })

    workbook.SheetNames.forEach(sheet => {
      let rowObject = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheet]
      )
      callback(JSON.stringify(rowObject))
    })
  }
  fileReader.readAsBinaryString(file)
}

function handleJson(jsonData) {
  console.log(jsonData)    
}