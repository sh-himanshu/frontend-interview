import { PASSWORD_PARAM_LABELS } from '@/constants';
import { useState } from 'react';

export const useGeneratePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 2000);
  };

  const generate = (params: Array<{ label: string; value: boolean }>, charLength: number = 0) => {
    if (charLength === 0) {
      setPassword('');
      setErrorMessage("Character length can't be zero !");

      return;
    }

    let charString = '';

    params.forEach(item => {
      if (item.value) {
        switch (item.label) {
          case PASSWORD_PARAM_LABELS.includeUppercaseLetters:
            charString += 'ABCDEFGHIJKLMNOPQRSTWXYZ';
            break;
          case PASSWORD_PARAM_LABELS.includeLowercaseLetters:
            charString += 'abcdefghijklmnopqrstwxyz';
            break;
          case PASSWORD_PARAM_LABELS.includeNumbers:
            charString += '0123456789';
            break;
          case PASSWORD_PARAM_LABELS.includeSymbols:
            charString += '~`! @#$%^&*()_-+={[}]|:;"\'<,>.?/\\';
          default:
            break;
        }
      }
    });

    if (charString === '') {
      setErrorMessage('Choose at least one param to generate password.');
      setPassword('');
      return;
    }

    let randomPassword = '';

    for (let i = 0; i < charLength; i++) {
      const randomIndex = Math.floor(Math.random() * charString.length);
      randomPassword += charString[randomIndex];
    }

    setPassword(randomPassword);
  };

  return {
    password,
    error,
    generate,
  };
};
