export interface Result {
  name: string;
  password: string;
}

export function parseQRCodeValue(qrCodeValue: string): Result {
  let splitted = qrCodeValue.split(';');
  let [, passwordPart, namePart] = splitted;

  let password, name;

  if (passwordPart.startsWith('P:')) {
    password = passwordPart.replace(/^P:/, '');
  } else {
    throw Error('invalid password part');
  }

  if (namePart.startsWith('S:')) {
    name = namePart.replace(/^S:/, '');
  } else {
    throw Error('invalid password part');
  }

  return { name, password };
}
