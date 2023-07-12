import { createContext, useEffect, useReducer } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { assignCartToUser } from "../features/cart/cartSlice";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const INITIALIZE = "AUTH.INITIALIZE";
// const UPDATE_PROFILE = "UPDATE.PROFILE_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case REGISTER_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return { ...state, isInitialized: true, isAuthenticated, user };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });
const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const res = await apiService.get("/users/me");
          const user = res.data.user;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const register = async ({ name, email, password }, callback) => {
    const res = await apiService.post("/users", { name, email, password });
    const { user, accessToken } = res.data;
    //dispatch another function update user in cart controller
    setSession(accessToken);
    dispatch({ type: REGISTER_SUCCESS, payload: { user } });
    callback();
  };
  const login = async ({ email, password }, callback) => {
    const res = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = res.data;
    if (user) {
      dispatch(assignCartToUser({ user_id: user._id }));
    }
    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    callback();
  };
  const logout = async (callback) => {
    setSession(null);
    // localStorage.removeItem('cart')
    dispatch({ type: LOGOUT });
    callback();
  };
  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
