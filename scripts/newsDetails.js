const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var url_string = window.location.href;
var url = new URL(url_string);
var newsdata, comments;

const getId = () => {
  var c = url.searchParams.get("id");
  return c;
};

const getSingleNews = async (id) => {
  try {
    const response = await fetch(`${base_url}/news/${id}`);
    newsdata = await response.json();
    console.log(newsdata);
    displayNewsDets(newsdata);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const getNewsComment = async (id) => {
  try {
    const response = await fetch(`${base_url}/news/${id}/comments`);
    comments = await response.json();
    console.log(comments);
    // displayNewsDets(newsdata);
    displaynewsComment(comments);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const displayNewsDets = (dt) => {
  var title = document.getElementById("newsTitle");
  var url = document.getElementById("url");
  var author = document.getElementById("author");
  title.innerHTML = dt.title;
  author.innerText = "Published by " + dt.author;
  url.innerText = dt.url;
};

const displaynewsComment = (comments) => {
  var commentList = document.getElementById("comment-list");
  comments.map((cm) => {
    var aside = document.createElement("aside");
    var commentAvatar = document.createElement("img");
    var article = document.createElement("article");
    var commentTitle = document.createElement("h4");
    var commentText = document.createElement("p");

    commentTitle.innerText = cm.comment;
    commentText.innerText = cm.name;
    commentAvatar.src = cm.avatar;
    commentAvatar.onerror = () => {
      commentAvatar.onerror = null;
      commentAvatar.src = "../assets/img3.jpg";
    };
    commentAvatar.width = "70";

    aside.appendChild(commentAvatar);
    article.appendChild(commentTitle);
    article.appendChild(commentText);
    aside.appendChild(article);
    commentList.appendChild(aside);
  });
};
function load() {
  var id = getId();
  getSingleNews(id);
  getNewsComment(id);
}
window.onload = load;
