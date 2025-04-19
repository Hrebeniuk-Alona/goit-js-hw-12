import axios from "axios";

const API_KEY = "49725109-808c4ffe1912c75b108e52d51";


export default async function getImagesByQuery(query, page) {
    const {data} = await axios(`https://pixabay.com/api/`, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 15,
            page
        }
    })
    return data
}





