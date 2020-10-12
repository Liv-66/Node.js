/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { logout } from './login';

export const updateSetting = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updatePassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Updated Successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
