import multer from 'multer'
import path from 'path'

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ''

    if (req.baseUrl.includes('users')) {
      folder = 'users'
    } else if (req.baseUrl.includes('tools')) {
      folder = 'tools'
    }

    cb(null, `public/images/${folder}`)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 100)) +
        path.extname(file.originalname)
    )
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Only JPEG and PNG files are allowed.'))
    }
    cb(undefined, true)
  }
})

export { imageUpload }
