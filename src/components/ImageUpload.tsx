import { ChangeEvent, useState } from "react"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
 const storage = getStorage()

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null)
  const [url, setUrl] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    console.log(image)
    if(image){
      const storageRef = ref(storage, `HallOfFameList/${image.name}`)
      uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
        .then((downloadUrl) => {
          setUrl(downloadUrl)
        })
      })
    }
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <img src={url} alt="Uploaded" height="300" width="400" />}
    </div>
  )
}

export default ImageUpload