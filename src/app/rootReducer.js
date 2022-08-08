// redux
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// apis
import authApi from './services/jhinimal/authApi';
import userApi from './services/jhinimal/userApi';
import authorityApi from './services/jhinimal/authorityApi';
import accountApi from './services/jhinimal/accountApi';
import uploadApi from './services/imgbb/uploadApi';

// slices
import authReducer from './slices/auth';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [authorityApi.reducerPath]: authorityApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  auth: authReducer,
});

export { rootPersistConfig, rootReducer };
