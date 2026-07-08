import { api } from "./axios";

export const authApi = {
  login: async (payload) => {
    const response = await api.post("/admin/auth/login", payload);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/admin/auth/logout");
    return response.data;
  },

  me: async () => {
    const response = await api.get("/admin/auth/me");
    return response.data;
  },

  refresh: async () => {
    const response = await api.post("/admin/auth/refresh");
    return response.data;
  },

  changePassword: async (payload) => {
    const response = await api.patch("/admin/auth/change-password", payload);
    return response.data;
  },
};

export default authApi;
