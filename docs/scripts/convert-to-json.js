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
      rowObject.name = sheet
      callback(rowObject)
    })
  }
  fileReader.readAsBinaryString(file)
}
