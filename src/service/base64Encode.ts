var fs = require('fs');

// function to encode file data to base64 encoded string
export function base64_encode(file: Express.Multer.File) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}