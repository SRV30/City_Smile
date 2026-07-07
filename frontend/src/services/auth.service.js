import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const login = async (payload) =>
  unwrap(await api.post("/auth/login", payload));
export const logout = async () => unwrap(await api.post("/auth/logout"));
export const me = async () => unwrap(await api.get("/auth/me"));
export const changePassword = async (payload) =>
  unwrap(await api.put("/auth/change-password", payload));
