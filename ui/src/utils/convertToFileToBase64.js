export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function createImageFromBase64(base64String) {
  console.log(base64String)
  return 'data:image/png;base64,' + base64String
}
