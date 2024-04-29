import { useEffect, useState } from 'react';
import cn from 'clsx';
import { PASSWORD_PARAM_LABELS } from '@/constants';
import { useGeneratePassword } from '@/hooks/generatePassword';

type Props = {};

const PasswordGenerator = (props: Props) => {
  const [characterLimit, setCharacterLimit] = useState(10);
  const [parameters, setParameters] = useState(
    Object.values(PASSWORD_PARAM_LABELS).map(item => {
      return { label: item, value: item === PASSWORD_PARAM_LABELS.includeLowercaseLetters };
    })
  );
  const [isCopied, setIsCopied] = useState(false);
  const { error, generate, password } = useGeneratePassword();

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(password)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (error) window.alert(error);
  }, [error]);

  return (
    <div className="bg-cyan-950 p-8 w-full max-w-xl text-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">{password}</h3>
        <button
          onClick={handleCopyClick}
          className={cn(
            'h-10 w-24 flex items-center justify-center rounded-md uppercase font-medium active:bg-teal-700 bg-teal-600 text-white',
            {
              'bg-teal-900': isCopied,
              'bg-gray-400 pointer-events-none': !password,
            }
          )}
        >
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="flex mt-6 items-center justify-between font-medium text-lg">
        <span>Character Length</span>
        <span>{characterLimit}</span>
      </div>

      <input
        max={30}
        onChange={e => setCharacterLimit(parseInt(e.target.value, 10))}
        value={characterLimit}
        className="w-full mt-2"
        type="range"
        name="character-limit"
        id="character-limit"
      />

      <div className="grid gap-2 mt-6 grid-cols-2">
        {parameters.map((item, index) => {
          const id = item.label.toLowerCase().split(' ').join('-');
          return (
            <div className="flex gap-2 font-medium" key={index}>
              <input
                onChange={e => {
                  const copyParam = [...parameters];
                  copyParam[index] = { label: item.label, value: e.target.checked };
                  setParameters(copyParam);
                }}
                type="checkbox"
                checked={item.value}
                name={id}
                id={id}
              />
              <label htmlFor={id}>{item.label}</label>
            </div>
          );
        })}
      </div>

      <div className="flex mt-8 items-center justify-between ">
        <span>Password Strength</span>
        <span className="font-semibold">Medium</span>
      </div>
      <button
        onClick={() => generate(parameters, characterLimit)}
        className="h-16 w-full mt-3 rounded-md uppercase font-medium active:bg-teal-900 bg-teal-600 text-white"
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
