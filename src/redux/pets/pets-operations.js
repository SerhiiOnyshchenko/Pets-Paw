import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const MY_KEY = 'bf68c230-9fae-4d41-96bf-7c818f5c2d04';
axios.defaults.baseURL = 'https://api.thedogapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = MY_KEY;

// images
export const fetchVotingImage = createAsyncThunk(
   'pets/fetchVotingImage',
   async ({ limit = 1, order = 'Random', type = [''], breedId = '' }) => {
      try {
         const { data } = await axios.get(
            `images/search?limit=${limit}&order=${order}&mime_types=${type}&breed_ids=${breedId}&sub_id=${MY_KEY}`
         );
         return data;
      } catch (error) {
         console.log('fetchVotingImage-error', error);
      }
   }
);

export const votingRandomImage = async (
   limit = 1,
   order = 'Random',
   type = [''],
   breedId = ''
) => {
   const { data } = await axios.get(
      `images/search?limit=${limit}&order=${order}&mime_types=${type}&breed_ids=${breedId}&sub_id=${MY_KEY}`
   );
   return data;
};

export const postImageFile = async file => {
   const config = {
      file: file,
      sub_id: MY_KEY,
   };
   const header = {
      headers: {
         'content-type': 'multipart/form-data',
      },
   };
   await axios.post(`images/upload`, config, header);
};

export const getImagesById = async image_id => {
   const { data } = await axios.get(`images/${image_id}`);
   return data;
};

// search text
export const setSearchText = createAsyncThunk(
   'pets/setSearchText',
   text => text
);

// Voting
export const getVoteHistory = createAsyncThunk(
   'pets/getVoteHistory',
   async limit => {
      try {
         const { data } = await axios.get(
            `votes?limit=${limit}&order=Desc&sub_id=${MY_KEY}`
         );
         return data;
      } catch (error) {
         console.log('getVoteHistory-error', error);
      }
   }
);
export const postVoteImage = createAsyncThunk(
   'pets/postVoteImage',
   async ({ id, value }) => {
      try {
         const config = {
            image_id: id,
            sub_id: MY_KEY,
            value,
         };
         await axios.post(`votes`, config);
      } catch (error) {
         console.log('postVoteImage-error', error);
      }
   }
);
export const deleteVoteImage = createAsyncThunk(
   'pets/deleteVoteImage',
   async id => {
      try {
         await axios.delete(`votes/${id}`);
      } catch (error) {
         console.log('deleteVoteImage-error', error);
      }
   }
);

// Favourites
export const getFavouritesImage = createAsyncThunk(
   'pets/getFavouritesImage',
   async (limit = '') => {
      try {
         const { data } = await axios.get(
            `favourites?&limit=${limit}&page=&order=Desc&sub_id=${MY_KEY}`
         );

         return data;
      } catch (error) {
         console.log('getFavouritesImage-error', error);
      }
   }
);

export const postFavouritesImage = createAsyncThunk(
   'pets/postFavouritesImage',
   async id => {
      try {
         const config = {
            image_id: id,
            sub_id: MY_KEY,
         };
         await axios.post(`favourites/`, config);
      } catch (error) {
         console.log('postFavouritesImage-error', error);
      }
   }
);
export const deleteFavouritesImage = createAsyncThunk(
   'pets/deleteFavouritesImage',
   async id => {
      try {
         await axios.delete(`favourites/${id}`);
      } catch (error) {
         console.log('deleteFavouritesImage-error', error);
      }
   }
);
// Breeds
export const getBreedImagesByName = async q => {
   const { data } = await axios.get(`breeds/search?q=${q}`);
   return data;
};

export const fetchCategories = createAsyncThunk(
   'pets/fetchCategories',
   async () => {
      try {
         const { data } = await axios.get(`breeds`);
         const datArr = [...data].map(el => {
            return { id: el.id, name: el.name };
         });
         datArr.unshift({ id: 0, name: 'All breeds' });
         return datArr;
      } catch (error) {
         console.log('fetchCategories-error', error);
      }
   }
);
