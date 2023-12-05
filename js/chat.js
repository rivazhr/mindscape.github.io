document.getElementById('fileInput').addEventListener('change', function (event) {
  const fileInput = event.target;
  const previewImage = document.getElementById('previewImage');
  const selectedFileDetails = document.getElementById('selectedFileDetails');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileName = file.name;
    
    selectedFileDetails.innerText = fileName;
    if(selectedFileDetails != null){
      selectedFileDetails.classList.remove('visually-hidden');
    }

    if (/\.(jpeg|png|gif)$/i.test(fileName)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
    }
  } else {
    selectedFileDetails.innerText = '';
    previewImage.src = '';
  }
});

function send(fileInputId, chatInputId) {
  const fileInput = document.getElementById(fileInputId);
  const chatInput = document.getElementById(chatInputId);

  const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : '';
  const messageText = chatInput.value;

  fileInput.value = '';
  chatInput.value = '';

  const chatMessage = document.createElement('div');
  chatMessage.classList.add('row', 'justify-content-end');
  chatMessage.innerHTML = `
    <div class="col-6 justify-content-end">
      <div class="chatSelf p-2 px-3">
        <div>
          <p>${messageText}</p>
          <p>${fileName ? `<strong>File:</strong> ${fileName}` : ''}</p>
        </div>
        <div class="text-end timeSent" style="font-size: 10px;">${getCurrentTime()}</div>
      </div>
    </div>
  `;

  const selectedFileDetails = document.getElementById('selectedFileDetails');
  selectedFileDetails.innerText = ''; 
  selectedFileDetails.classList.add('visually-hidden');

  const chatContainer = document.getElementById('ruangObrolan');
  chatContainer.appendChild(chatMessage);
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
}
