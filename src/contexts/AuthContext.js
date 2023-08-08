import { createContext, useEffect, useReducer } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import {
  assignCartToUser,
  createCart,
  logInUser,
  logOutUser,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authGoogle } from "../firebase/firebaseConfig";

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
const setSession = (accessToken, user) => {
  if (accessToken && user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchFunction = useDispatch();
  const cart = useSelector((state) => state?.carts?.cart);
  const navigate = useNavigate();
  const location = useLocation();

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
    const res = await apiService.post("/users", {
      name,
      email,
      password,
      cart,
    });
    const { user, accessToken, userCart } = res.data;

    setSession(accessToken, user);
    dispatchFunction(logInUser(userCart.cart));
    dispatch({ type: REGISTER_SUCCESS, payload: { user } });
    callback();
  };
  const login = async ({ email, password }, callback) => {
    const res = await apiService.post("/auth/login", {
      email,
      password,
      cart,
    });
    const { user, accessToken, userCart } = res.data;

    if (user.role === "user") {
      dispatchFunction(logInUser(userCart.cart));
    }
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }

    setSession(accessToken, user);
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });

    callback();
  };

  const loginWithGoogle = async ({ googleId }) => {
    let url = "/auth/google/login/success";
    const res = await apiService.post(url, { googleId });
    console.log(res.data);
  };
  const logout = async (callback) => {
    setSession(null);

    dispatch({ type: LOGOUT });

    dispatchFunction(logOutUser());
    callback();
  };
  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
