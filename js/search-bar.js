document.addEventListener('DOMContentLoaded', function() {
  var searchBars = document.querySelectorAll('.searchBar');

  searchBars.forEach(function(searchBar) {
    searchBar.addEventListener('input', function() {
      var searchTerm = searchBar.value.toLowerCase();
      var targetSelector = searchBar.getAttribute('data-bs-target');
      var itemList = document.querySelector(targetSelector);
      var items = Array.from(itemList.getElementsByTagName('li'));

      items.forEach(function(item) {
        var itemName = item.textContent.toLowerCase();
        var isMatch = itemName.includes(searchTerm);

        if(!isMatch){
          item.classList.remove('d-flex');
          item.classList.add('d-none');
        }
        else {
          item.classList.remove('d-none');
          item.classList.add('d-flex');
        }
      });
    });
  });
});
