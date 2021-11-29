const base_url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
var createForm = document.getElementById("createForm");
var author = document.getElementById("author");
var title = document.getElementById("title");
var newsurl = document.getElementById("newsurl");
var imageurl = document.getElementById("imageurl");
var sendNews = document.getElementById("sendNews");

//Send News
const submitNews = async () => {
  const x = {
    author: author.value.trim(),
    avatar: imageurl.value.trim(),
    title: title.value.trim(),
    url: newsurl.value.trim(),
  };
  try {
    const response = await fetch(`${base_url}/news`, {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonR = await response.json();
    alert("Comment submitted successfully");
    window.location.replace("/");
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

createForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitNews();
});
