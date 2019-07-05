import {
  getToken,
  getUser,
} from 'helpers/storage/auth';

const storageUser = getUser();
const storageToken = getToken();

const initialState = {
  authenticated: !!storageUser,
  error: '',
  user: storageUser || {},
  isAuthenticatedLoading: true,
  keepSignIn: false,
  isLoading: false,
  loginError: '',
  isLoginLoading: false,
  registered: false,
  registerError: '',
  isRegisterLoading: false,
  token: storageToken || '',
};

export const authenticateRequest = state => ({
  ...state,
  authenticated: false,
  loginError: initialState.error,
  isLoginLoading: true,
});

export const authenticateSuccess = (state, { payload }) => ({
  ...state,
  authenticated: true,
  token: payload.token,
  user: payload.user,
  isLoginLoading: false,
});

export const authenticateFailure = (state, { payload }) => ({
  ...state,
  authenticated: false,
  loginError: payload,
  isLoginLoading: false,
});

export const isAuthenticatedRequest = state => ({ ...state, isAuthenticatedLoading: true });

export const isAuthenticatedSuccess = (state, { payload }) => ({
  ...state,
  authenticated: true,
  token: payload.token,
  user: payload.user,
  isAuthenticatedLoading: false,
});
export const isAuthenticatedFailure = state => ({ ...state, authenticated: false, isAuthenticatedLoading: false });

export const logoutRequest = state => ({ ...state, error: initialState.error, isLoading: true });

export const logoutSuccess = () => ({
  ...initialState,
  authenticated: false,
  isAuthenticatedLoading: false,
  isLoading: false,
});

export const logoutFailure = (state, { payload }) => ({ ...state, error: payload, isLoading: false });

export default initialState;
