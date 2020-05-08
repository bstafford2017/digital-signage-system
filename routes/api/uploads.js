const express = require('express')
const fs = require('fs')
const { promisify } = require('util')
const router = express.Router()

const uploadPath = __dirname + '/../../uploads'
const readdir = promisify(fs.readdir)

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await readdir(uploadPath)
    const filesWithData = files.map(file => {
      const stats = fs.statSync(uploadPath + `/${file}`)
      return {title: file, date: stats.birthtime.toLocaleString()}
    })
    res.json(filesWithData)
  } catch(err) {
    res.status(400).json({ msg: (err.code === 'ENOENT') ? 
      'No files uploaded yet' : `Error: ${err}` })
  }
})

// Create a file
router.post('/', (req, res) => {
  if(!req.files || !req.body.title){
    return res.status(400).json({ msg:'No title or file found when attempting to upload' })
  }

  const file = req.files.file
  const title = req.body.title

  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){

    // Check if uploads folder exists
    if(!fs.existsSync('./uploads')){
      fs.mkdirSync('./uploads')
    }

    file.mv(`${uploadPath}/${title}`, (err) => {
      if(err) 
        res.status(400).json({ msg: `Error: ${err}` })
      else 
        res.json({ msg: 'Success!' })
    })
  } else {
    res.status(400).json({ msg: 'File must be a .png, .jpeg, or .jpg' })
  }
})

// Delete a file
router.delete('/:title', (req, res) => {
  const title = req.params.title
  if(fs.existsSync(`${uploadPath}/${title}`)){
    fs.unlink(`${uploadPath}/${title}`, (err) => res.json({ msg: `Error: ${err}` }))
  } else {
    res.status(400).json({ msg: `No file with title of ${title}` })
  }
})

module.exports = router