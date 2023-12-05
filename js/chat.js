document.getElementById('chatInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

document.getElementById('fileInput').addEventListener('change', function (event) {
  const fileInput = event.target;
  const selectedFileDetails = document.getElementById('selectedFileDetails');
  const name = document.getElementById('fileName');
  const previewImage = document.getElementById('previewImage');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileName = file.name;

    name.textContent = fileName;
    if(name.textContent != ""){
      selectedFileDetails.classList.remove('visually-hidden');
    } else {
      selectedFileDetails.classList.add('visually-hidden');
    }

    if (/\.(jpg|jpeg|png|gif)$/i.test(fileName)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
    }
  } else {
    selectedFileDetails.innerHTML = '';
    previewImage.src = '';
  }
});

function clearFile() {
  const selectedFileDetails = document.getElementById('selectedFileDetails');
  selectedFileDetails.classList.add('visually-hidden');

  const previewImage = document.getElementById('previewImage');
  previewImage.src = '';

  const clearButton = document.getElementById('clear');
  clearButton.style.display = 'none';
}


function send(fileInputId, chatInputId) {
  const chatContainer = document.getElementById('ruangObrolan');
  const fileInput = document.getElementById(fileInputId);
  const chatInput = document.getElementById(chatInputId);

  const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
  const messageText = chatInput.value;

  if(messageText != "" || fileName != ""){
    fileInput.value = '';
    chatInput.value = '';
  
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('row', 'justify-content-end');
    chatMessage.innerHTML = `
      <div class="col-6 justify-content-end">
        <div class="chatSelf p-2 px-3">
          <div class="message-content">
            <p>${messageText}</p>
            <p>${fileName ? `<strong>File:</strong> ${fileName}` : ''}</p>
          </div>
          <div class="text-end timeSent" style="font-size: 10px;">${getCurrentTime()}</div>
        </div>
      </div>
    `;
  
    const selectedFileDetails = document.getElementById('selectedFileDetails');
    selectedFileDetails.classList.add('visually-hidden');
  
    chatContainer.appendChild(chatMessage);
    
  }
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}

function clearFile() {
  const selectedFileDetails = document.getElementById('selectedFileDetails');
  const form = document.getElementById('sendChat');
    form.reset();
  selectedFileDetails.classList.add('visually-hidden');
  
}
function resetFileInput() {
}