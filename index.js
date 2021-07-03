const fs = require('fs');
const path = require('path');
const pdfUtil = require('pdf-to-text');

const { createId, handleWrongString } = require('./src/utils');

const pdfPath = path.join(__dirname, '2019 - anexa1_licee_2019.pdf');

const file = {
  id: '',
  keywords: [],
  name: {
    ro: '',
    ru: '',
  },
  site: '',
  fb: '',
  address: {
    district: '',
    city: '',
    street: '',
    building: '',
  },
  type: 'licei',
  languages: [],
  bac: [],
  students: [],
};

pdfUtil.pdfToText(pdfPath, (err, text) => {
  if (err) throw (err);

  const strings = text.split('\n');

  for (let i = 0; i < strings.length; i++) {
    if (i < 5) continue;

    const [
      mediumNote,,
      rejectedCandidats,,
      candidats,
      nameStr,
      cityStr,
      districtStr,
      num,
    ] = strings[i]
      .trim()
      .replace(/(\s){2,}/g, '#$%')
      .split('#$%')
      .reverse();

    const { district, city, name } = handleWrongString(num, districtStr, cityStr, nameStr);
    const id = createId(district, city, name);

    const dataForSave = {
      ...file,
      id,
      bac: [
        {
          year: '2019',
          candidats: +candidats,
          rejectedCandidats: +rejectedCandidats,
          mediumNote: +mediumNote,
        },
      ],
      name: {
        ro: name,
        ru: '',
      },
      address: {
        district,
        city,
      },
    };

    if (!district || !city || !name) {
      console.log(JSON.stringify(dataForSave, null, 2));
    }

    if (district && city && name) {
      fs.writeFileSync(`${__dirname}/data/${id}.json`, JSON.stringify(dataForSave, null, 2));
    }
  }
});
