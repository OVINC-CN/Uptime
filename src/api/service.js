import http from './index';

export const listServicesAPI = (params) => new Promise((resolve, reject) => {
  http.get(`/services/`, {params}).then((res) => resolve(res), (err) => reject(err));
});

export const createServiceAPI = (data) => new Promise((resolve, reject) => {
  http.post(`/services/`, data).then((res) => resolve(res), (err) => reject(err));
});

export const getServiceMonitorConfigAPI = (id) => new Promise((resolve, reject) => {
  http.post(`/services/${id}/monitor_config/`).then((res) => resolve(res), (err) => reject(err));
});

export const updateServiceAPI = (id, data) => new Promise((resolve, reject) => {
  http.put(`/services/${id}/`, data).then((res) => resolve(res), (err) => reject(err));
});

export const deleteServiceAPI = (id) => new Promise((resolve, reject) => {
  http.delete(`/services/${id}/`).then((res) => resolve(res), (err) => reject(err));
});
