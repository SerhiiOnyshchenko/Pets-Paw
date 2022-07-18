import axios from 'axios';

const MY_KEY = 'bf68c230-9fae-4d41-96bf-7c818f5c2d04';
const SUB_ID = 'user-dog-1234';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';

export async function votingRandomImage() {
   return await axios
      .get(`images/search?api_key=${MY_KEY}`)
      .then(res => res.data);
}
export function postVoteImage(id, value) {
   const config = {
      image_id: id,
      sub_id: SUB_ID,
      value,
   };
   return axios.post(`votes`, config);
}

export async function getVoteHistory() {
   const data = await axios
      .get(`votes?api_key=${MY_KEY}&sub_id=${SUB_ID}&limit=10&page=1`)
      .then(res => {
         console.log(res);
         return res.data;
      });
   return data;
}

export async function getBreedImages(limit = 5, page = 1) {
   return await axios
      .get(`breeds?api_key=${MY_KEY}&limit=${limit}&page=${page}`)
      .then(res => res.data);
}
export async function getBreedImagesByName(q = 'Akita') {
   return await axios
      .get(`breeds/search?api_key=${MY_KEY}&q=${q}`)
      .then(res => res.data);
}
