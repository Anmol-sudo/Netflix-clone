const animeItemCont = document.querySelectorAll(".anime-item-wrapper");
const childDivs = animeItemCont[0].children;


const imgElements = Array.from(childDivs).map((childDiv) => {
  const imgElement = document.createElement("img");
  childDiv.appendChild(imgElement);
  return imgElement;
});

async function fetchAnime() {
  try {
    const url = "https://api.jikan.moe/v4/top/anime?type=ona";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    const { pagination, data } = result;

    data.forEach((element, index) => {
      if (index < imgElements.length) {
        const images = element.images;
        const jpg = images.jpg;
        const image_url = jpg["large_image_url"];
        imgElements[index].src = image_url;
        imgElements[index].style.width = "150px";
        imgElements[index].style.height = "200px";
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

fetchAnime();
