// @ts-ignore
function parseVCF(vcfString) {
    const lines = vcfString.split(/\r?\n/);
    const contacts = [];
    let contact = {};
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      if (line.startsWith('BEGIN:VCARD')) {
        // @ts-ignore
        contact = {};
      } else if (line.startsWith('END:VCARD')) {
        // @ts-ignore
        if (contact.name || contact.phoneNumber) {
          contacts.push(contact);
        }
      } else if (line.startsWith('N;') || line.startsWith('FN;')) {
        const field = line.substring(0, line.indexOf(':'));
        const value = line.substring(line.indexOf(':') + 1);
        // @ts-ignore
        contact[field] = value;
      } else if (line.startsWith('TEL;') || line.startsWith('CELL;')) {
        const field = line.substring(0, line.indexOf(':'));
        const phoneNumber = line.substring(line.indexOf(':') + 1);
        // @ts-ignore
        contact[field] = phoneNumber;
      } else if (line.startsWith('PHOTO;')) {
        const photoData = line.substring(line.indexOf(':') + 1);
        contact['PHOTO'] = photoData;
      }
    }
  
    return contacts;
  }
  
  const vcfString = `BEGIN:VCARD
  VERSION:2.1
  N;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:;=E1=88=98=E1=88=B3=E1=8B=AD;;;
  FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:=E1=88=98=E1=88=B3=E1=8B=AD
  TEL;CELL:+251912990847
  PHOTO;
  END:VCARD`;
  
  const contacts = parseVCF(vcfString);
  console.log(contacts);