import axios from 'axios';

const MY_KEY = 'bf68c230-9fae-4d41-96bf-7c818f5c2d04';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = MY_KEY;

// images
export async function votingRandomImage(
   limit = 1,
   order = 'Random',
   type = [''],
   breedId = ''
) {
   return await axios
      .get(
         `images/search?limit=${limit}&order=${order}&mime_types=${type}&breed_ids=${breedId}&sub_id=${MY_KEY}`
      )
      .then(res => res.data);
}

export async function getImagesById(image_id) {
   return await axios.get(`images/${image_id}`).then(res => res.data);
}

export async function uploadFile(file) {
   const config = {
      file: file,
      sub_id: MY_KEY,
   };
   const header = {
      headers: {
         'content-type': 'multipart/form-data',
      },
   };
   return await axios
      .post(`images/upload`, config, header)
      .then(res => res.data);
}

// Vote
export async function getVoteHistory(limit) {
   const data = await axios
      .get(`votes?limit=${limit}&order=Desc&sub_id=${MY_KEY}`)
      .then(res => res.data);
   return data;
}

export function postVoteImage(id, value) {
   const config = {
      image_id: id,
      sub_id: MY_KEY,
      value: value,
   };
   return axios.post(`votes`, config);
}

export function deleteVoteImage(id) {
   return axios.delete(`votes/${id}`);
}

// Favourites
export async function getFavouritesImage(limit = '') {
   const data = await axios
      .get(`favourites?&limit=${limit}&page=&order=Desc&sub_id=${MY_KEY}`)
      .then(res => res.data);
   return data;
}

export function postFavouritesImage(id) {
   const config = {
      image_id: id,
      sub_id: MY_KEY,
   };
   return axios.post(`favourites/`, config);
}

export function deleteFavouritesImage(id) {
   return axios.delete(`favourites/${id}`);
}

// Breeds

export async function getBreedImagesByName(q) {
   return await axios.get(`breeds/search?q=${q}`).then(res => res.data);
}

export async function getCategories() {
   return await axios.get(`breeds`).then(res => res.data);
}
