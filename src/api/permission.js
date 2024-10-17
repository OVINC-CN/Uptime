import http from './index';

export const getPermissionsAPI = () => new Promise((resolve, reject) => {
  http.get(`/permissions/`).then((res) => resolve(res), (err) => reject(err));
});
