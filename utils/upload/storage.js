const { format } = require("util")

const { admin } = require("../../config/firebase-config")

const bucket = admin.storage().bucket()
const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/`

exports.uploadFiletoStorage = (file, folderName) => {
	return new Promise(async (resolve, reject) => {
		let newFilename = `${Date.now()}_${file.originalname}`
		let blob = bucket.file(`${folderName}/${newFilename}`)

		const blobStream = blob.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		})

		blobStream.on("error", err => {
			reject(`Unable to upload image, something went wrong`)
		})
		blobStream.on("finish", () => {
			const pubilcUrl = format(`${baseUrl}${folderName}%2F${newFilename}?alt=media`)
			resolve(pubilcUrl)
		})
		blobStream.end(file.buffer)
	})
}

exports.deleteFile = path => {
	return new Promise((resolve, reject) => {
		if (!path) reject("No path image")

		const pathFile = getPathFile(path)
		bucket
			.file(pathFile)
			.delete()
			.then(res => {
				resolve({ success: true })
			})
			.catch(err => {
				reject(err)
			})
	})
}

exports.downloadFile = path => {
	return new Promise((resolve, reject) => {
		if (!path) reject("No path image")

		const pathFile = getPathFile(path)
		path = pathFile.split("/")[1]
		path = `./${path}`
		bucket
			.file(pathFile)
			.download({ destination: path })
			.then(res => {
				resolve(path)
			})
			.catch(err => {
				reject(err)
			})
	})
}

const getPathFile = path => {
	let filePath = path.replace(baseUrl, "")
	let indexOfEndPath = filePath.indexOf("?")
	filePath = filePath.substring(0, indexOfEndPath)
	filePath = filePath.replace(/%2F/g, "/")
	return filePath
}
