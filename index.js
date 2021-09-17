const Search = document.querySelector("#search");
const Form = document.querySelector("#form");
let pagenum = 0;
let out = "";
Form.addEventListener("submit", (e) => {
  e.preventDefault();

  search(Search.value);
});
function pageinc() {
  pagenum++;
  return (urlnet = `https://api.unsplash.com/photos?client_id=E5EHMkfEkragu1136UCpc_fGGenGwqZltRj6vgw9Hyk&page=${pagenum}`);
}

function search(query) {
  sessionStorage.setItem("searchquery", query);
  window.location = "search.html";
}

function searchImage() {
  let query = sessionStorage.getItem("searchquery");
  window.removeEventListener("scroll", inscroll);

  let image = "";
  console.log(query);
  searchurl = `https://api.unsplash.com/search/photos?client_id=E5EHMkfEkragu1136UCpc_fGGenGwqZltRj6vgw9Hyk&query=${query}`;
  fetch(searchurl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.results.map((data) => {
        image += `<div class="item">
     <img src=${data.urls.thumb}/>
    </div>`;
      });

      document.querySelector("#searchedimg").innerHTML = image;
    });
}
function data() {
  const url = pageinc();
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.map((data) => {
        out += `<div onclick="show()" class="item">
       <img src=${data.urls.thumb}/>
      </div>`;
      });
      document.querySelector("#images").innerHTML = out;
    });
}
window.addEventListener("scroll", inscroll);

function inscroll() {
  if (
    window.scrollY + window.innerHeight + 100 >=
    document.documentElement.scrollHeight
  ) {
    window.removeEventListener("scroll", inscroll);
    setTimeout(() => {
      window.addEventListener("scroll", inscroll);
    }, 2000);
    data();
  }
}

function show (){
  console.log("clicked")
   document.querySelector(".preview").classList.add("show")
}

data();
// token : E5EHMkfEkragu1136UCpc_fGGenGwqZltRj6vgw9Hyk
