import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import budgetDataReducer from './budgetdata/budgetdataSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['budgetData'],
};

const persistedReducer = persistReducer(persistConfig, budgetDataReducer);

export const store = configureStore({
    reducer: {
        budgetData: persistedReducer,
    },
});

export const persistor = persistStore(store);




// import { configureStore } from '@reduxjs/toolkit';
// import formDataReducer from './budgetdata/budgetdataSlice';

// export const store = configureStore({
//     reducer: {
//         budgetData: formDataReducer
//     },
// });

// above is my store.js 
