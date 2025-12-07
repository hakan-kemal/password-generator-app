const copyPasswordButton = document.getElementById('copy-password-btn');
const copyStatus = document.getElementById('copy-status');
const generatePasswordButton = document.getElementById('generate-password-btn');
const generatedPassword = document.getElementById('generated-password');
const strengthBars = document.getElementById('strength-bars');

const placeholderPassword = 'P4$5W0rD!';
let newGeneratedPassword = '';

const initializePasswordGenerator = () => {
  generatedPassword.textContent = placeholderPassword;
  generatedPassword.classList.remove('new-password');
  strengthBars.classList.remove('too-weak', 'weak', 'medium', 'strong');
  copyStatus.classList.add('hidden');
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

generatePasswordButton.addEventListener('click', () => {
  generatedPassword.classList.add('new-password');
  newGeneratedPassword = 'aB3$dEfG';
  strengthBars.classList.add('strong');

  generatedPassword.textContent = newGeneratedPassword;
});

copyPasswordButton.addEventListener('click', () => {
  if (!newGeneratedPassword) return;

  writeClipboardText(newGeneratedPassword);
});

initializePasswordGenerator();
