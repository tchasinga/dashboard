import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/userSlice.js";
import persistStore from 'redux-persist/es/persistStore.js';

// Define persistConfig before using it
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };