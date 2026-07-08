import env from "../config/env.js";

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const getBaseCookieOptions = () => ({
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "strict" : "lax",
  path: "/",
});

export const clearCookieOptions = () => ({
  ...getBaseCookieOptions(),
});

export const getAccessTokenCookieOptions = () => ({
  ...getBaseCookieOptions(),
  maxAge: 15 * 60 * 1000,
});

export const getRefreshTokenCookieOptions = () => ({
  ...getBaseCookieOptions(),
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(
    COOKIE_NAMES.ACCESS_TOKEN,
    accessToken,
    getAccessTokenCookieOptions()
  );
  res.cookie(
    COOKIE_NAMES.REFRESH_TOKEN,
    refreshToken,
    getRefreshTokenCookieOptions()
  );
};

export const clearAuthCookies = (res) => {
  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, clearCookieOptions());
  res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, clearCookieOptions());
};
