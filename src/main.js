
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getImagesByQuery from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iconError from './img/error.svg'


const form = document.querySelector(".form");
const input = document.querySelector("[name='search-text']");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".span").classList.remove("loader");
const loadMoreBtn = document.querySelector(".btn")


let page=1;
let query;
let maxPages;

form.addEventListener("submit", hendleSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);


function hendleSubmit(event) {
    event.preventDefault();
    clearGallery();
    page = 1;

    query = input.value.trim();
    if (!query) {
        errorMessage()
        form.reset();
        return;
    }
    showLoader()

    getImagesByQuery(query, page)
        .then(data=> {
            const aray = data.hits;
            maxPages = Math.ceil(data.totalHits / aray.length);

            if (aray.length === 0) {
                errorMessage();
                hideLoadMoreButton()
                return;
            }

            createGallery(aray);

            if (page< maxPages) {
                showLoadMoreButton();
            } 

            if (page >= maxPages) {
            hideLoader()
            hideLoadMoreButton();
            theEnd();
        }
            
        })
        .catch(error=>{
            console.log(error.message);
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ffffff',
                message: 'Error connecting to server',
                messageColor: '#ffffff',
                iconUrl: iconError,
                backgroundColor: '#B51B1B',
                position: 'topRight'})
        })

        .finally(() => {
          hideLoader();
        });
    
 
    form.reset()

   
}

async function onLoadMore() {
    hideLoadMoreButton();
    showLoader();
    page++

    try {
        const data = await getImagesByQuery(query,page);
        createGallery(data.hits);
        hideLoader();
        showLoadMoreButton();
        if (page >= maxPages) {
            hideLoader()
            hideLoadMoreButton();
            theEnd();
        }
        
        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height;

        window.scrollBy({
            leаt: 0,
            top: cardHeight*2,
            behavior: "smooth"
        })
       
        
        
    } catch (error) {
        
    }
    
}




function errorMessage() {
    iziToast.show({
         message: 'Sorry, there are no images matching your search query. Please try again!',
         messageColor: '#fafafb',
         backgroundColor: '#ef4040',
          iconUrl: iconError,
         position: 'topRight'
        })
}



function theEnd() {
    iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
         messageColor: '#fafafb',
         backgroundColor: '#ef4040',
          iconUrl: iconError,
         position: 'topRight'
    })
}