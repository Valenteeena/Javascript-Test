const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var url_string = window.location.href;
var url = new URL(url_string);
var newsdata, comments, commentId;
var editf = false;
var form = document.getElementById("form");
var formTitle = document.getElementById("formTitle");
var namef = document.getElementById("name");
var commentVal = document.getElementById("commentVal");
var sendComment = document.getElementById("sendComment");
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
    displayNewsDets(newsdata);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

//Fetch news comment
const getNewsComment = async (id) => {
  editf = false;
  if (!editf) {
    formTitle.innerHTML = "Add Comment";
    namef.value = "";
    commentVal.value = "";
    sendComment.innerHTML = "Comment";
    commentId = "";
  }
  try {
    const response = await fetch(`${base_url}/news/${id}/comments`);
    comments = await response.json();
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
    var deleteCom = document.createElement("button");
    var editcom = document.createElement("button");

    deleteCom.onclick = function () {
      deleteComment(cm.id);
    };
    deleteCom.innerHTML = "X";
    deleteCom.classList.add("delete");

    editcom.onclick = function () {
      setEditComment(cm);
    };
    editcom.innerHTML = "&#9998;";
    editcom.classList.add("edit");

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
    aside.appendChild(deleteCom);
    aside.appendChild(editcom);
    comms.appendChild(aside);
    commentList.appendChild(comms);
  });
};

//Send Comment
const submitComment = async () => {
  var id = getId();
  const x = {
    newsId: id,
    name: namef.value.trim(),
    avatar: "",
    comment: commentVal.value.trim(),
  };
  try {
    const response = await fetch(`${base_url}/news/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonR = await response.json();
    alert("Comment submitted successfully");

    getNewsComment(id);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

// Submmit Edit
const submitEditComment = async () => {
  var newsid = getId();
  const x = {
    newsId: newsid,
    name: namef.value.trim(),
    avatar: "",
    comment: commentVal.value.trim(),
  };
  try {
    const response = await fetch(
      `${base_url}/news/${newsid}/comments/${commentId}`,
      {
        method: "PUT",
        body: JSON.stringify(x),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonR = await response.json();
    alert("Edit submitted successfully");
    editf = false;
    getNewsComment(newsid);
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

//Delete Comment
const deleteComment = async (id) => {
  var newsid = getId();
  try {
    const response = await fetch(`${base_url}/news/${newsid}/comments/${id}`, {
      method: "DELETE",
    });
    const jsonR = await response.json();
    getNewsComment(newsid);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const setEditComment = (cm) => {
  editf = true;
  if (editf) {
    formTitle.innerHTML = "Edit Comment";
    namef.value = cm.name;
    commentVal.value = cm.comment;
    sendComment.innerHTML = "Edit";
    commentId = cm.id;
  }
};

function load() {
  var id = getId();
  editf = false;
  // formTitle.innerHTML = "Add Comment";
  getSingleNews(id);
  getNewsComment(id);
}
window.onload = load;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (editf) {
    submitEditComment();
  } else {
    submitComment();
  }
});
