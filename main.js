let hamburgerMenu = document.getElementById("hamburger-menu");
let closeIcon = document.querySelector(".close");
let mobileMenus = document.querySelector(".m-menus");
let search = document.querySelector(".search");
let inputArea = document.getElementById("input-area");
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsBycategory(event))
);
let newsList = [];
const apiKey = `dc89acfcece146f98594bfaabf5bc4b5`;
 let url = new URL(`https://jun-newstimes.netlify.app//top-headlines`);
// let url = new URL(
//   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
// );
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
const getNews = async () => {
  try {
    url.searchParams.set("page", page); // =>&page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status == 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this Error");
      }
      newsList = data.articles;
      totalResults = data.totalResults;

      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLateNews = async () => {
    // url = new URL(
    //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    // );
    url = new URL(
        `https://jun-newstimes.netlify.app//top-headlines`
      );
    getNews();
};
//카테고리별
const getNewsBycategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
//   url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
//   );
  url = new URL(
    `https://jun-newstimes.netlify.app//top-headlines?category=${category}`
  );
  getNews();
};
//모바일 클릭이벤트
hamburgerMenu.addEventListener("click", () => {
  mobileMenus.classList.remove("d-none");
  mobileMenus.classList.add("d-flex");
});
closeIcon.addEventListener("click", () => {
  mobileMenus.classList.remove("d-flex");
  mobileMenus.classList.add("d-none");
});
search.addEventListener("click", () => {
  inputArea.classList.toggle("d-none");
});

const imageError = () => {
  let image = new Image();
  if (!image.complete) {
    return false;
  } else {
    return true;
  }
};

const getNewsByKeyWord = async () => {
  const keyWord = document.getElementById("search-input").value;
//   url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&q=${keyWord}&apiKey=${apiKey}`
//   );
  url = new URL(
    `https://jun-newstimes.netlify.app//top-headlines?q=${keyWord}`
  );
  getNews();
};
//UI그려주는함수
const render = () => {
  const newHTML = newsList
    .map(
      (news) =>
        `<div class="row news">
    <div class="col-lg-4">
    <img class="news-img-size"
                src="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
    </div>
    <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${
      news.description == null || news.description == ""
        ? "내용없음"
        : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
    }</p>
    <div>${news.source.name || "no source"}  ${moment(
          news.pulisheAt
        ).fromNow()}</div>
    </div>
    </div>`
    )
    .join("");
  // newsList.map((news)=>{
  //     console.log(news.description == null)
  //   if(news.description == null){
  //     `<p>${
  //         news.summary == null || news.summary == ""
  //           ? "내용없음"
  //           : news.summary.length > 200
  //           ? news.summary.substring(0, 200) + "..."
  //           : news.summary
  //    }</p>`
  //   }
  // })
  document.getElementById("news-board").innerHTML = newHTML;
};
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};
const paginationRender = (pageNum) => {
  //totalresult
  //page
  //pagesize
  //groupSize
  //totalpages
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  let lastPage = pageGroup * groupSize;
  //마지막 페이지그룹이 그룹사이즈보다 작다 ? lastpage = totalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  //firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHTML = "";
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page?"active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
//       <nav aria-label="Page navigation example">
//     <ul class="pagination">
//       <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//       <li class="page-item"><a class="page-link" href="#">1</a></li>
//       <li class="page-item"><a class="page-link" href="#">2</a></li>
//       <li class="page-item"><a class="page-link" href="#">3</a></li>
//       <li class="page-item"><a class="page-link" href="#">Next</a></li>
//     </ul>
//   </nav>
};
const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
};
const pagenationRender = () => {};
getLateNews();

//1. 버튼들에게 클릭 이벤트를 줘야한다.
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
