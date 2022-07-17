import axios from 'axios';

const MY_KEY = 'bf68c230-9fae-4d41-96bf-7c818f5c2d04';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';

export async function votingRandomImage() {
   return await axios
      .get(`images/search?api_key=${MY_KEY}&sub_id=${MY_KEY}`)
      .then(res => res.data);
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
      .get(`votes?api_key=${MY_KEY}&sub_id=User-1234&limit=10&page=1`)
      .then(res => {
         console.log(res);
         return res.data;
      });
   return data;
}