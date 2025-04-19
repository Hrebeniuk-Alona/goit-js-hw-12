import SimpleLightbox from "simplelightbox"
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".span");
const loadMoreBtn=document.querySelector(".btn")



export function createGallery(images) {
  const markUp = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    ` <li class="gallery-item">
     <a class="gallery-link" href="${largeImageURL}">
     <img class="gallery-img" src="${webformatURL}" alt="${tags}">
     <ul class="statistic-list">
      <li class="statistic-item">
        <p class="statistic-text">Likes</p>
        <p class="statistic-value">${likes}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Views</p>
        <p class="statistic-value">${views}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Comments</p>
        <p class="statistic-value">${comments}</p>
      </li>
      <li class="statistic-item">
        <p class="statistic-text">Downloads</p>
        <p class="statistic-value">${downloads}</p>
      </li>
     </ul>
     </a>
    </li>
    `).join("");
  gallery.insertAdjacentHTML("beforeend", markUp)

    const galleryModal = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay : 250
    })
     galleryModal.refresh()
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("loader");
    
}

export function hideLoader() {
    loader.classList.remove("loader");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add("load-more-btn")
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove("load-more-btn")
}