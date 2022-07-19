import axios from 'axios';

const MY_KEY = 'bf68c230-9fae-4d41-96bf-7c818f5c2d04';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = MY_KEY;

export async function votingRandomImage(
   limit = 5,
   order = 'Random',
   type = [''],
   breedId = ''
) {
   return await axios
      .get(
         `images/search?limit=${limit}&order=${order}&mime_types=${type}&breed_ids=${breedId}`
      )
      .then(res => res.data);
}

export async function getImagesById(image_id) {
   return await axios.get(`images/${image_id}`).then(res => res.data);
}

export function postVoteImage(id, value) {
   const config = {
      image_id: id,
      sub_id: MY_KEY,
      value,
   };
   return axios.post(`votes`, config);
}

export async function getVoteHistory() {
   const data = await axios
      .get(`votes?sub_id=${MY_KEY}&limit=10&page=1`)
      .then(res => {
         console.log(res);
         return res.data;
      });
   return data;
}

export async function getBreedImages(limit = 5, page = 1) {
   return await axios
      .get(`breeds?limit=${limit}&page=${page}`)
      .then(res => res.data);
}
export async function getBreedImagesByName(q = 'Akita') {
   return await axios.get(`breeds/search?q=${q}`).then(res => res.data);
}

export async function getCategories() {
   return await axios.get(`breeds`).then(res => {
      return res.data;
   });
}
