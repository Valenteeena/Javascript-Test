const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var newsData, totaldata, allDataLen;
var perpage = 12;
var numberOfPages;

var currentPage = 1;
// current.innerHTML = currentPage ? currentPage : 1;

const getAllNews = async () => {
  try {
    const response = await fetch(`${base_url}/news`);
    totaldata = await response.json();
    allDataLen = totaldata.length;
    numberOfPages = getNumberOfPages(allDataLen);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const getFirstNews = async () => {
  try {
    const response = await fetch(`${base_url}/news?page=1&limit=12`);
    newsData = await response.json();
    displayNews(newsData);
    getAllNews();
  } catch (error) {
    console.log(error);
    alert(error);
  }
  check();
};

function getNumberOfPages(allDataLen) {
  return Math.ceil(allDataLen / perpage);
}

function nextPage() {
  var current = document.getElementById("currentPage");
  currentPage += 1;
  getPaginatedNews(currentPage);
  current.innerText = currentPage;
  check();
}

function previousPage() {
  currentPage -= 1;
  var current = document.getElementById("currentPage");
  getPaginatedNews(currentPage);
  current.innerText = currentPage;
  check();
}

function firstPage() {
  currentPage = 1;
  var current = document.getElementById("currentPage");
  getPaginatedNews(currentPage);
  current.innerText = currentPage;
  check();
}

function lastPage() {
  currentPage = numberOfPages;
  var current = document.getElementById("currentPage");

  getPaginatedNews(currentPage);
  current.innerText = currentPage;
  check();
}

function check() {
  document.getElementById("next").disabled =
    currentPage == numberOfPages ? true : false;
  document.getElementById("previous").disabled =
    currentPage == 1 ? true : false;
  document.getElementById("first").disabled = currentPage == 1 ? true : false;
  document.getElementById("last").disabled =
    currentPage == numberOfPages ? true : false;
  console.log(currentPage);
}

const getPaginatedNews = async (page) => {
  try {
    const response = await fetch(`${base_url}/news?page=${page}&limit=12`);
    var newNewsData = await response.json();

    displayNews(newNewsData);
  } catch (error) {
    console.log(error);
    alert(error);
  }
  check();
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const displayNews = (data) => {
  var newsPost = document.getElementById("newsPosts");
  removeAllChildNodes(newsPost);
  data.map((dt) => {
    var newsCard = document.createElement("div");
    var avatar = document.createElement("img");
    var title = document.createElement("h2");
    var author = document.createElement("h3");
    var link = document.createElement("a");
    var buttonLink = document.createElement("button");

    //set title
    title.innerHTML = dt.title;

    //set avatar
    avatar.src = dt.avatar;
    avatar.alt = "news-image";
    avatar.onerror = () => {
      avatar.onerror = null;
      avatar.src = "./assets/img3.jpg";
    };
    avatar.width = "200";

    //set author's name
    author.innerHTML = dt.author + " <br> " + dt.url;

    //setLink
    // link.href = dt.url;
    link.href = `./pages/newsDetails.html?id=${dt.id}`;

    //set button
    buttonLink.innerText = "Read More";

    //append button to link
    link.appendChild(buttonLink);

    //appent class name to post card
    newsCard.classList.add("newsCard");

    //append all elements to card
    newsCard.appendChild(avatar);
    newsCard.appendChild(title);
    newsCard.appendChild(author);
    newsCard.appendChild(link);

    //append card to main post
    newsPost.appendChild(newsCard);
  });
};
function load() {
  getFirstNews();
  getAllNews();
}
window.onload = load;
