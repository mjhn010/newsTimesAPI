//뉴스 가져오는
let news = []
const apiKey = `dc89acfcece146f98594bfaabf5bc4b5`;
const getLateNews = async()=>{
    const url = new URL(`https://jun-newstimes.netlify.app/top-headlines?category=science`);
    const response = await fetch(url)
    const data = await response.json();
    news = data.articles;
    console.log("dd",news);
}
getLateNews();