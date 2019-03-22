const Base64ToBlob = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}



const Resize = (file = [], fileName = '') => {
  const reader = new FileReader()
  let img = new Image()
  let base64, image
  console.log(file);
  reader.readAsDataURL(file)
  reader.onload = () => {
    img.src = reader.result
    img.onload = () => {
      let canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.height = 700
      canvas.width = 650
      ctx.webkitImageSmoothingEnabled = false
      ctx.mozImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      base64 = canvas.toDataURL()
      let imageUrl = base64.split(';')
      let imageType = imageUrl[0].split(':')[1]
      image = Base64ToBlob(base64, fileName !== '' ? fileName : file.name)
      console.log(image);
      return image
    }
  }
}
