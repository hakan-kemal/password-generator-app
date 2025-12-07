const characterLengthInput = document.getElementById('character-length-input');
const characterLengthValue = document.getElementById('character-length-value');
const copyPasswordButton = document.getElementById('copy-password-btn');
const copyStatus = document.getElementById('copy-status');
const generatePasswordButton = document.getElementById('generate-password-btn');
const generatedPassword = document.getElementById('generated-password');
const passwordUppercaseOption = document.getElementById('uppercase');
const passwordLowercaseOption = document.getElementById('lowercase');
const passwordNumbersOption = document.getElementById('numbers');
const passwordSymbolsOption = document.getElementById('symbols');
const passwordStrengthOutput = document.getElementById(
  'password-strength-output'
);
const strengthBars = document.getElementById('strength-bars');

const INITIAL_CHARACTER_LENGTH = 0;
const PASSWORD_STRENGTH_CLASSES = ['too-weak', 'weak', 'medium', 'strong'];
const PLACEHOLDER_PASSWORD = 'P4$5W0rD!';

const initializePasswordGenerator = () => {
  generatedPassword.textContent = PLACEHOLDER_PASSWORD;
  generatedPassword.classList.remove('new-password');

  characterLengthInput.value = INITIAL_CHARACTER_LENGTH;
  characterLengthValue.textContent = characterLengthInput.value;

  copyStatus.classList.add('hidden');
  copyPasswordButton.setAttribute('disabled', true);

  passwordUppercaseOption.checked = false;
  passwordLowercaseOption.checked = false;
  passwordNumbersOption.checked = false;
  passwordSymbolsOption.checked = false;

  strengthBars.classList.remove(...PASSWORD_STRENGTH_CLASSES);
};

const writeClipboardText = async (text) => {
  if (!navigator.clipboard) return console.warn('Clipboard unsupported');

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.classList.remove('hidden');

    setTimeout(() => {
      copyStatus.classList.add('hidden');
    }, 3000);
  } catch (error) {
    console.error(error.message);
  }
};

const generateRandomPassword = () => {
  const charsets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '`~§±!@€#$%^&*()-_=+[]{};:\'"|\\,<.>/?',
  };

  const opts = {
    uppercase: passwordUppercaseOption.checked,
    lowercase: passwordLowercaseOption.checked,
    numbers: passwordNumbersOption.checked,
    symbols: passwordSymbolsOption.checked,
  };

  const passwordLength = Number(characterLengthInput.value);

  const charset = Object.entries(charsets)
    .filter(([key]) => opts[key])
    .map(([, val]) => val)
    .join('');

  if (
    !charset ||
    passwordLength < 1 ||
    !Object.values(opts).some((val) => val)
  ) {
    return;
  }

  const strengthIndex = Object.values(opts).filter(Boolean).length - 1;
  const strengthClass = PASSWORD_STRENGTH_CLASSES[strengthIndex];

  strengthBars.classList.remove(...PASSWORD_STRENGTH_CLASSES);

  const buffer = new Uint32Array(passwordLength);
  crypto.getRandomValues(buffer);

  const newGeneratedPassword = Array.from(
    buffer,
    (n) => charset[n % charset.length]
  ).join('');

  copyPasswordButton.removeAttribute('disabled');
  generatedPassword.classList.add('new-password');
  passwordStrengthOutput.textContent = strengthClass;
  strengthBars.classList.add(strengthClass);
  generatedPassword.textContent = newGeneratedPassword;

  return newGeneratedPassword;
};

const handleCharacterLengthChange = (event) => {
  const { value } = event.target;
  characterLengthValue.textContent = value;
};

generatePasswordButton.addEventListener('click', generateRandomPassword);

characterLengthInput.addEventListener('input', handleCharacterLengthChange);

copyPasswordButton.addEventListener('click', () =>
  writeClipboardText(generatedPassword.textContent)
);

initializePasswordGenerator();
