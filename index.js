const express = require('express')
const path = require('path')
const multer = require('multer')
const publicPath = path.join(__dirname, 'public')

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

app.get('/scan', function (req, res) {
    res.sendFile(publicPath + '/scan.html');
  });

app.post('/single', upload.single('pdf'), (req, res) => {
    console.log(req.file)
    res.send('PDF file uploaded successfully')
})

app.use(express.static(publicPath))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})