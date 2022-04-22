const express = require('express')
const path = require('path')
const multer = require('multer')

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/docs")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

app.post('/single', upload.single('pdf'), (req, res) => {
    console.log(req.file)
    res.send('PDF file uploaded successfully')
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})