import jwtCode from "jwt-decode";

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtCode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
