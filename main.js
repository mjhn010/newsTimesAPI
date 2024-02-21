let hamburgerMenu = document.getElementById('hamburger-menu');
let closeIcon = document.querySelector(".close");
let mobileMenus = document.querySelector(".m-menus"); 
let search = document.querySelector(".search");
let inputArea = document.getElementById("input-area");
let newsList = []
const apiKey = `dc89acfcece146f98594bfaabf5bc4b5`;
const getLateNews = async()=>{
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=science`);
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const response = await fetch(url)
    const data = await response.json();
    newsList = data.articles;
    render();
    
    console.log("dd",newsList);
    
}

hamburgerMenu.addEventListener('click',()=>{
    mobileMenus.classList.remove("d-none")
    mobileMenus.classList.add("d-flex")
})
closeIcon.addEventListener("click",()=>{
    mobileMenus.classList.remove("d-flex")
    mobileMenus.classList.add("d-none")
})
search.addEventListener("click",()=>{
    inputArea.classList.toggle("d-none")
})

const imageError = ()=>{
    let image = new Image();
    if(!image.complete){
        return false
    }else{
        return true;
    }
}
const render=()=>{
    
    const newHTML = newsList.map((news)=>
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
).join('');
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
    
}
getLateNews();