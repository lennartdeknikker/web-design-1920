
const button = document.querySelector("#upload-button")
const uploadButton = document.querySelector(".file-upload")
const text = document.querySelector("h1")

button.addEventListener("click", triggerUpload)

function triggerUpload() {
  uploadButton.click()
}

uploadButton.addEventListener("change", onFileChange, false)

function onFileChange() {
  if (!uploadButton.files[0].name.slice(-5).includes(".xls")) {
    text.innerText = "Sorry, dat is geen excel-bestand."
    text.classList.add("red")
    button.innerText = "PROBEER OPNIEUW"
    button.classList.remove("hidden")
  } else {
    button.classList.add("hidden")
    text.classList.remove("red")
    text.innerText = "Gelukt!"
  }
  text.classList.remove("hidden")
  console.log(uploadButton.files[0].name)
}