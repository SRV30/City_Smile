import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const getAllAdmins = async () => unwrap(await api.get("/admins"));
export const createAdmin = async (payload) => unwrap(await api.post("/admins", payload));
export const updateAdmin = async (id, payload) => unwrap(await api.put(`/admins/${id}`, payload));
export const deactivateAdmin = async (id) => unwrap(await api.patch(`/admins/${id}/deactivate`));
export const reactivateAdmin = async (id) => unwrap(await api.patch(`/admins/${id}/reactivate`));
