// /lib/upload.ts
export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Upload failed")
  return data.secure_url
}

export const uploadImages = async (files: File[]) => {
  const urls = await Promise.all(files.map(f => uploadImage(f)))
  return urls
}