var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
let fs = require('fs-extra');

var app = express();
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = `./uploads/${type}`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    }
  })
})  

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single("upfile"), function(req, res, next){
  const {filename, mimetype, size} = req.file;
  res.json({
    name: filename,
    type: mimetype,
    size: size,
  })
  res.send();
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
