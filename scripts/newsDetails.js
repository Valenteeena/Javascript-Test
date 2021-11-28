const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var url_string = window.location.href;
var url = new URL(url_string);
var newsdata, comments;
var form = document.getElementById("form");

//retrieve news id from URL
const getId = () => {
  var c = url.searchParams.get("id");
  return c;
};

//Fetch single news from DB
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

//Fetch news comment
const getNewsComment = async (id) => {
  try {
    const response = await fetch(`${base_url}/news/${id}/comments`);
    comments = await response.json();
    console.log(comments);
    displaynewsComment(comments);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

//display news details in ui
const displayNewsDets = (dt) => {
  var title = document.getElementById("newsTitle");
  var url = document.getElementById("url");
  var author = document.getElementById("author");
  title.innerHTML = dt.title;
  author.innerText = "Published by " + dt.author;
  url.innerText = dt.url;
};

//display comment in ui
const displaynewsComment = (comments) => {
  var commentList = document.getElementById("comment-list");
  var comms = document.getElementById("comms");
  removeAllChildNodes(comms);

  comments.map((cm, index) => {
    var aside = document.createElement("aside");
    var commentAvatar = document.createElement("img");
    var article = document.createElement("article");
    var commentTitle = document.createElement("h4");
    var commentText = document.createElement("p");

    commentTitle.innerText =
      cm.comment === "" ? "Comment " + Number(index + 1) : cm.comment;
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
    comms.appendChild(aside);
    commentList.appendChild(comms);
  });
};

//Send Comment
const submitComment = async () => {
  var id = getId();
  const x = {
    newsId: id,
    name: document.getElementById("name").value.trim(),
    avatar: "",
    comment: document.getElementById("commentVal").value.trim(),
  };
  //   console.log(x);
  try {
    const response = await fetch(`${base_url}/news/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonR = await response.json();
    console.log(jsonR);
    getNewsComment(id);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function load() {
  var id = getId();
  getSingleNews(id);
  getNewsComment(id);
}
window.onload = load;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  submitComment();
});
