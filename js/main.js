// Listen for form submitted

document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save Bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName,siteUrl)) {

    return false;
  };



  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  
  //Local Storage Test
  // localStorage.setItem('testing testing','poop');
  // console.log(localStorage.getItem('testing testing'));
  // localStorage.removeItem('testing testing');
  // console.log(localStorage.getItem('testing testing'));

//test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){

  //init array
  var bookmarks = [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}else{
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//add bookmark to array
  bookmarks.push(bookmark);
  //re-set back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}

//Clear form

document.getElementById('myForm').reset();
//Re-fetch bookmarks
fetchBookmarks();


//prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url){

//Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }

//Re-set back to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

//Re-fetch bookmarks
fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks(){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id

  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output

  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' + 
    '<h3>'+ name + 
    ' <a class="btn btn-default" target="_blank" href="' + url + '"> Visit</a> '+
    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete</a> '+
    '</h3>'+ 
    '</div>';

  };
}


function validateForm(siteName, siteUrl){

  if (!siteName || !siteUrl) {
      alert('Please Fill In Form');
      return false;
      
    };

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
      alert('Please use a valid URL');
      return false;
  };

    return true;

}


