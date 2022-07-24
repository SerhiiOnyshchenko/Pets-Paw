import { createSlice } from '@reduxjs/toolkit';
import {
   fetchCategories,
   fetchVotingImage,
   setSearchText,
} from './pets-operations';

const initialState = {
   categories: [{ id: 0, name: 'All breeds' }],
   searchText: '',
   votingImage: [],
   isLoading: false,
};

const petsSlice = createSlice({
   name: 'pets',
   initialState,
   extraReducers: {
      [fetchVotingImage.pending](state) {
         state.isLoading = true;
      },
      [fetchVotingImage.fulfilled](state, { payload }) {
         const [data] = payload;
         state.votingImage = data;
         state.isLoading = false;
      },
      [fetchVotingImage.rejected](state) {
         state.isLoading = false;
      },

      [setSearchText.fulfilled](state, { payload }) {
         state.searchText = payload;
      },

      [fetchCategories.fulfilled](state, { payload }) {
         state.categories = payload;
      },
   },
});

export default petsSlice.reducer;
