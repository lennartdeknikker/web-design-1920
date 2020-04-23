
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
  convertXlsToJsonAndThen(event.target.files[0], handleData)  
}