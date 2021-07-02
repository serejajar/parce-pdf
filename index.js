const path = require('path');
const pdfUtil = require('pdf-to-text');

const pdfPath = path.join(__dirname, '2019 - anexa1_licee_2019.pdf');

// const option = {from: 0, to: 10};

// pdfUtil.info(pdfPath, function(err, info) {
//     if (err) throw(err);
//     console.log(info);
// });


// pdfUtil.pdfToText(pdfPath, option, function(err, data) {
//   if (err) throw(err);
//   console.log(data); //print text
// });

//Omit option to extract all text from the pdf file
pdfUtil.pdfToText(pdfPath, function(err, data) {
  if (err) throw(err);
  console.log(data); //print all text
});
