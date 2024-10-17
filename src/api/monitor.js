import http from './index';

export const listMonitorConfigAPI = (params) => new Promise((resolve, reject) => {
  http.get(`/monitor_configs/`, {params}).then((res) => resolve(res), (err) => reject(err));
});

export const getMonitorCommonAPI = () => new Promise((resolve, reject) => {
  http.get(`/monitor_configs/common/`).then((res) => resolve(res), (err) => reject(err));
});

export const createMonitorConfigAPI = (data) => new Promise((resolve, reject) => {
  http.post(`/monitor_configs/`, data).then((res) => resolve(res), (err) => reject(err));
});

export const loadMonitorConfigAPI = (id) => new Promise((resolve, reject) => {
  http.get(`/monitor_configs/${id}/`).then((res) => resolve(res), (err) => reject(err));
});

export const updateMonitorConfigAPI = (id, data) => new Promise((resolve, reject) => {
  http.put(`/monitor_configs/${id}/`, data).then((res) => resolve(res), (err) => reject(err));
});

export const deleteMonitorConfigAPI = (id) => new Promise((resolve, reject) => {
  http.delete(`/monitor_configs/${id}/`).then((res) => resolve(res), (err) => reject(err));
});

export const listServiceStatusAPI = (id, params) => new Promise((resolve, reject) => {
  http.get(`/service_statuses/${id}/`, {params}).then((res) => resolve(res), (err) => reject(err));
});
