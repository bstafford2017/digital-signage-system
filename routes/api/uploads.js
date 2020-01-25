const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const uploadPath = '../../uploads'

// Get all files
router.get('/', (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if(err){
      if(err.code === 'ENOENT'){
        // Page not found
        res.json({ msg: `No files uploaded yet` })
      } else {
        res.status(500).json({ msg: `Error: ${err}` })
      }
    } else {
      res.json(files)
    }
  })
})

// Create a file
router.post('/', (req, res) => {

  if(!req.files){
    return res.status(400).json({ msg:'No file found when attempting to upload' })
  }

  const file = req.files.file
  const title = req.body.title

  const extname = path.extname(file.name).toLowerCase()

  if(extname === '.png' || extname === '.jpeg' || extname === '.jpg'){
    const fileName = title + extname
    file.mv(`/home/ben/Desktop/digital-signage-system/uploads/${fileName}`, (err) => {
      if(err) 
        res.json({ msg: `Error: ${err}` })
      else 
        res.json({ msg: 'Success!' })
    })
  } else {
    res.status(400).json({ msg: 'File must be a .png, .jpeg, or .jpg' })
  }
})

// Delete a file
router.delete('/', (req, res) => {
  const title = req.params.title
  if(fs.existsSync(uploadsPath)){
    fs.unlink(uploadsPath, (err) => res.json({ msg: `Error: ${err}` }))
  } else {
    res.json({ msg: `No file with title of ${title}` })
  }
})

module.exports = router