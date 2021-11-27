const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var newsData;

const getAllNews = async () => {
  try {
    const response = await fetch(`${base_url}/news`);
    newsData = await response.json();
    displayNews(newsData);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const displayNews = (data) => {
  var newsPost = document.getElementById("newsPosts");
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
    author.innerHTML = dt.author;

    //setLink
    link.href = dt.url;

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

window.onload = getAllNews;
