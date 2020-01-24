const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

// Get all files
router.get('/', (req, res) => {
  fs.readdir('../../uploads', (err, files) => {
    if(err){
      if(err.code === 'ENOENT'){
        // Page not found
        res.json({ msg: `No files uploaded yet!` })
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
  const file = req.files.upload

  if(!file){
    res.json({ msg:'No file found when attempting to upload' })
  }

  console.log(file.name)

  const extname = path.extname(file.name).toLowerCase()

  if(extname === '.png' || extname === '.jpeg' || extname === '.jpg'){
    file.mv(`${__dirname}/images/${req.params.title}${extname}`, (err) => res.json({ msg: `Error: ${err}` }))
    res.json({ msg: 'File uploaded!'})
  } else {
    res.status(400).json({ msg: 'File must be a .png, .jpeg, or .jpg' })
  }
})

module.exports = router