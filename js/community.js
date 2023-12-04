function filter(category){
  const ruang = document.querySelectorAll('.ruang-diskusi');
  
  if(category != 'all'){
    ruang.forEach(rd => {
      if(rd.classList.contains(category)){
        rd.classList.remove('visually-hidden');
      }
      else {
        rd.classList.add('visually-hidden');
      }
    })
  }
  else {
    ruang.forEach(rd=> {
      rd.classList.remove('visually-hidden');
    })
  }
}

function sortByDate() {
  const ruang = document.querySelectorAll('.ruang-diskusi');
  const ruangArray = Array.from(ruang);

  ruangArray.sort((a, b) => {
    const dateA = new Date(a.getAttribute('data-date-posted'));
    const dateB = new Date(b.getAttribute('data-date-posted'));
    return dateB - dateA; 
  });

  ruangArray.forEach((rd) => {
    rd.parentNode.appendChild(rd);
  });
}

function sortByPopularity() {
  const ruang = document.querySelectorAll('.ruang-diskusi');
  const ruangArray = Array.from(ruang);

  ruangArray.sort((a, b) => {
    const commentedA = parseInt(a.getAttribute('data-commented'), 10);
    const commentedB = parseInt(b.getAttribute('data-commented'), 10);
    return commentedB - commentedA; 
  });

  ruangArray.forEach((rd) => {
    rd.parentNode.appendChild(rd);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const ruang = document.querySelectorAll('.ruang-diskusi');
  ruang.forEach(rd => {
    const commentCountElement = rd.querySelector('.comment-count');
    const commentCount = parseInt(rd.getAttribute('data-commented'), 10);
    commentCountElement.textContent = `${commentCount} berkomentar`;
  });
})

function addDiscussionRoom(title, category, content, author, timePosted, commentCount) {
  var discussionContainer = document.createElement('div');
  var categoryId;
  if (category === 'Kesehatan Mental'){
    categoryId = 'kesehatan-mental';
  }
  else if (category === 'Depresi'){
    categoryId = 'depresi';
  }
  else if (category === 'Self-Care'){
    categoryId = 'self-care';
  }
  else if (category === 'Hubungan'){
    categoryId = 'hubungan';
  }
  discussionContainer.className = 'row mt-5 justify-content-center ' + categoryId + ' ruang-diskusi';
  discussionContainer.setAttribute('data-date-posted', timePosted);
  discussionContainer.setAttribute('data-commented', commentCount);

  var col1 = document.createElement('div');
  col1.className = 'col-lg-1';
  var avatarImg = document.createElement('img');
  avatarImg.className = 'img-fluid';
  avatarImg.src = 'images/avatar.svg'; 
  avatarImg.alt = 'Diskusi';
  avatarImg.style = 'width: 85px; height: 82px;';
  col1.appendChild(avatarImg);
  
  var col2 = document.createElement('div');
  col2.className = 'col-lg-7';
  var discussionTitle = document.createElement('h6');
  discussionTitle.textContent = title;
  var badge = document.createElement('div');
  badge.className = 'badge bg-lucu rounded-pill';
  badge.textContent = category;
  var discussionContent = document.createElement('p');
  discussionContent.className = 'my-2';
  discussionContent.textContent = content;
  col2.appendChild(discussionTitle);
  col2.appendChild(badge);
  col2.appendChild(discussionContent);

  var col3 = document.createElement('div');
  col3.className = 'col-lg-3';
  var timePostedDiv = document.createElement('div');
  var timeSvg = document.createElement('img');
  timeSvg.className = 'img-fluid me-2';
  timeSvg.src = 'images/icons/time.svg';
  var timeSpan = document.createElement('span');
  timeSpan.className = 'time-posted';
  timeSpan.textContent = 'Baru saja';
  timePostedDiv.appendChild(timeSvg);
  timePostedDiv.appendChild(timeSpan);

  var commentDiv = document.createElement('div');
  var commentSvg = document.createElement('img');
  commentSvg.className = 'img-fluid me-1';
  commentSvg.src = 'images/icons/comment.svg';
  var commentSpan = document.createElement('span');
  commentSpan.className = 'comment-count';
  commentSpan.textContent = commentCount + ' berkomentar';
  commentDiv.appendChild(commentSvg);
  commentDiv.appendChild(commentSpan);

  var authorDiv = document.createElement('div');
  var authorSvg = document.createElement('img');
  authorSvg.className = 'img-fluid me-1';
  authorSvg.src = 'images/icons/profile.svg';
  var authorSpan = document.createElement('span');
  authorSpan.innerHTML = 'oleh <a href="">' + author + '</a>';
  authorDiv.appendChild(authorSvg);
  authorDiv.appendChild(authorSpan);

  col3.appendChild(timePostedDiv);
  col3.appendChild(commentDiv);
  col3.appendChild(authorDiv);

  discussionContainer.appendChild(col1);
  discussionContainer.appendChild(col2);
  discussionContainer.appendChild(col3);

  var containerElement = document.getElementById('rd');
  containerElement.appendChild(discussionContainer);
  sortByDate();

  var discussionForm = document.getElementById('discussionForm');
  discussionForm.reset();

  var modal = document.getElementById('ruangDiskusi');
  modal.hide();
}

function createDiscussionRoom() {
  var title = document.getElementById('title').value;
  var category = document.getElementById('category').value;
  var content = document.getElementById('uraian').value;
  if (!title || !category || !content) {
    alert('Tolong masukkan data kolom pertanyaan dengan lengkap');
    return;
  }

  var author = "Noory Azyza"; 
  var timePosted = getCurrentTime();
  var commentCount = 0; 

  addDiscussionRoom(title, category, content, author, timePosted, commentCount);
}

function getCurrentTime() {
  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var hours = String(currentDate.getHours()).padStart(2, '0');
  var minutes = String(currentDate.getMinutes()).padStart(2, '0');
  var seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}