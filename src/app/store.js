// redux toolkit
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

// apis
import authApi from './services/jhinimal/authApi';
import userApi from './services/jhinimal/userApi';
import authorityApi from './services/jhinimal/authorityApi';
import accountApi from './services/jhinimal/accountApi';
import uploadApi from './services/imgbb/uploadApi';

// middlewares
import { rtkQueryNotifier } from './middlewares/notifier';

// reducers
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(rtkQueryNotifier)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(authorityApi.middleware)
      .concat(accountApi.middleware)
      .concat(uploadApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
