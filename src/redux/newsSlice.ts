import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemNewDTO} from '../models/ItemNewDTO';

interface UserState {
  newsList: ItemNewDTO[];
  favoriteNews: ItemNewDTO[];
}

const initialState: UserState = {
  newsList: [],
  favoriteNews: [],
};

// Thunk para carregar os favoritos do AsyncStorage
export const loadFavorites = createAsyncThunk(
  'news/loadFavorites',
  async () => {
    const favoriteNewsJson = await AsyncStorage.getItem('@favoriteNews');
    if (favoriteNewsJson) {
      return JSON.parse(favoriteNewsJson) as ItemNewDTO[];
    }

    return [];
  },
);

// Thunk para alternar o favorito e salvar no AsyncStorage
export const toggleFavorite = createAsyncThunk(
  'news/toggleFavorite',
  async (newsItem: ItemNewDTO, {getState, dispatch}) => {
    const state = getState() as {news: UserState};
    const isFavorite = state.news.favoriteNews.some(
      news => news.id === newsItem.id,
    );

    let updatedFavorites: ItemNewDTO[];
    if (isFavorite) {
      updatedFavorites = state.news.favoriteNews.filter(
        news => news.id !== newsItem.id,
      );
    } else {
      updatedFavorites = [...state.news.favoriteNews, newsItem];
    }

    // Salva no AsyncStorage
    await AsyncStorage.setItem(
      '@favoriteNews',
      JSON.stringify(updatedFavorites),
    );

    // Retorna a lista atualizada
    return updatedFavorites;
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // Você pode remover esse reducer, pois o `toggleFavorite` agora está lidando com a lógica de favoritos
    getFavoritesNews(state, action: PayloadAction<ItemNewDTO[]>) {
      state.favoriteNews = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favoriteNews = action.payload;
    });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      state.favoriteNews = action.payload;
    });
  },
});

export const {getFavoritesNews} = newsSlice.actions;

export default newsSlice.reducer;
