const roDiacriticts = 'ăâșşţțîе';
const regexpForRoDiacritics = new RegExp(`[${roDiacriticts}]`, 'ig');
const roToEn = {
  ă: 'a',
  â: 'a',
  ș: 's',
  ş: 's',
  ţ: 't',
  ț: 't',
  î: 'i',
};

function handleWrongString(num, district, city, name) {
  if (!name || num) {
    return {
      district,
      city,
      name,
    };
  }

  // BUIUCANI CHIŞINĂUInstituţia Publică Liceul Teoretic ""Mircea Eliade""
  // BUIUCANI CHIŞINĂULICEUL DE CREATIVITATE ŞI INVENTICĂ ""PROMETEU-PRIM""
  const [cityTwo, nameTwo] = name.split('CHIŞINĂU');
  if (nameTwo) {
    return {
      name: nameTwo.trim(),
      city: cityTwo.trim(),
      district: city,
    };
  }

  const index = name.search(/(?<=[A-ZŢÎĂŞ ]{3,})[a-z]/g);

  if (index !== -1) {
    return {
      name: name.slice(index - 1).trim(),
      city: name.slice(0, index - 1).trim(),
      district: city,
    };
  }

  return {
    name,
    city: '',
    district: '',
  };
}

function createId(districtStr, cityStr, nameStr = '') {
  const regexp = new RegExp(`(?<="")[a-z${roDiacriticts} .]{2,}`, 'ig'); // ""Mircea Eliade""
  const nameMatch = nameStr.match(regexp);
  const name = (nameMatch ? nameMatch[0] : '');

  const data = [districtStr, cityStr, name].map((str) => {
    if (!str) {
      return 'none';
    }
    return str
      .toLowerCase()
      .replace(regexpForRoDiacritics, (match) => roToEn[match])
      .replace(/[\s-.]/gi, '');
  });

  return `${data[0]}-${data[1]}-${data[2]}`;
}

module.exports = {
  createId,
  handleWrongString,
};
