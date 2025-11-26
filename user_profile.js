
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});


const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);


const editAvatarBtn = document.querySelector('.edit-avatar-btn');
const profileAvatar = document.querySelector('.profile-avatar img');
const userAvatar = document.querySelector('.user-avatar img');


const savedAvatar = localStorage.getItem('userAvatar');
if (savedAvatar) {
    if (profileAvatar) profileAvatar.src = savedAvatar;
    if (userAvatar) userAvatar.src = savedAvatar;
}


fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageData = event.target.result;


            if (profileAvatar) profileAvatar.src = imageData;
            if (userAvatar) userAvatar.src = imageData;


            localStorage.setItem('userAvatar', imageData);
        };

        reader.readAsDataURL(file);
    } else if (file) {
        alert('Please select a valid image file');
    }

 
    fileInput.value = '';
});


editAvatarBtn.addEventListener('click', () => {
    fileInput.click();
});


const editBtn = document.querySelector('#personal .edit-btn');
const formInputs = document.querySelectorAll('#personal .form-input');
const formSelects = document.querySelectorAll('#personal .form-select');
const userNameHeader = document.querySelector('.user-name');
const profileNameSidebar = document.querySelector('.profile-name');

let isEditing = false;

if (editBtn) {
  editBtn.addEventListener('click', () => {
    if (!isEditing) {
      enableEditing();
    } else {
      saveChanges();
    }
  });
}

function enableEditing() {
  formInputs.forEach(input => input.removeAttribute('readonly'));
  formSelects.forEach(select => select.removeAttribute('disabled'));
  editBtn.textContent = '💾 Save Changes';
  isEditing = true;
}

function saveChanges() {
  
  const formData = {};
  formInputs.forEach(input => {
    const name = input.name || input.id || 'field';
    formData[name] = input.value.trim();
  });
  formSelects.forEach(select => {
    const name = select.name || select.id || 'selectField';
    formData[name] = select.value;
  });

  console.log('Saving profile data:', formData);
  alert('✅ Profile changes saved successfully!');

  
  updateDisplayedNames();

  disableEditing();
}

function disableEditing() {
  formInputs.forEach(input => input.setAttribute('readonly', true));
  formSelects.forEach(select => select.setAttribute('disabled', true));
  editBtn.textContent = '✎ Edit Profile';
  isEditing = false;
}

function updateDisplayedNames() {
  const firstName = formInputs[0]?.value.trim() || '';
  const lastName = formInputs[1]?.value.trim() || '';
  const fullName = `${firstName} ${lastName}`.trim();

  if (userNameHeader) userNameHeader.textContent = fullName;
  if (profileNameSidebar) profileNameSidebar.textContent = fullName;
}


const updatePasswordBtn = document.getElementById('updatePasswordBtn');
const changePasswordBtn = document.querySelector('.change-password-btn');

if (changePasswordBtn) {
  changePasswordBtn.addEventListener('click', () => {
    const passwordInputs = document.querySelectorAll('#security .form-input');
    const isHidden = passwordInputs[0].style.display === 'none';
    passwordInputs.forEach(input => {
      input.style.display = isHidden ? 'block' : 'none';
      input.value = '';
    });
    updatePasswordBtn.style.display = isHidden ? 'inline-flex' : 'none';
  });
}

if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener('click', () => {
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmNewPassword').value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('❌ New passwords do not match!');
      return;
    }

    if (newPassword.length < 8) {
      alert('⚠️ Password must be at least 8 characters long.');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      alert('⚠️ Password must contain uppercase, lowercase, and numbers.');
      return;
    }

    console.log('Password change request prepared (should be handled on backend)');
    alert('✅ Password updated successfully!');
    clearPasswordFields();
  });
}

function clearPasswordFields() {
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmNewPassword').value = '';
}

