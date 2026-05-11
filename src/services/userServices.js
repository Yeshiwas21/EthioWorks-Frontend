import {
  clientSignupApi,
  workerSignupApi,
  getUsers,
  registerUserAPI,
  updateUserApi,
  deleteUserApi,
  listClientApi,
  listWorkerApi,
  clientCreateApi,
  workerCreateApi
} from "../api/userApi";

/* USERS LIST */
export const fetchUsers = async () => {
  const res = await getUsers();
  return res.data;
};

/* CLIENT SIGNUP */
export const signupClient = async (form) => {
  const payload = {
    email: form.email,
    phone: form.phone,
    password: form.password,
    password_2: form.password_2,
    client: {
      company_name: form.company_name,
      location: form.location,
    },
  };

  const res = await clientSignupApi(payload);
  return res.data;
};

/* WORKER SIGNUP */
export const signupWorker = async (form) => {
  const payload = {
    email: form.email,
    phone: form.phone,
    password: form.password,
    password_2: form.password_2,
    worker: {
      first_name: form.first_name,
      last_name: form.last_name,
      national_id: form.national_id,
      location: form.location,
    },
  };

  const res = await workerSignupApi(payload);
  return res.data;
};

/* REGISTER USER */
export const registerUser = async (payload) => {
  const response = await registerUserAPI(payload);
  return response.data;
};

/* DELETE USER */
export const deleteUser = async (id) => {
  const response = await deleteUserApi(id);
  return response.data;
};

/* UPDATE USER */
export const updateUser = async (id, data) => {
  const response = await updateUserApi(id, data);
  return response.data;
};

/* LIST WORKER */
export const listWorker = async () => {
  const response = await listWorkerApi();
  return response.data;
};

/* LIST CLIENT */
export const listClient = async () => {
  const response = await listClientApi();
  return response.data;
};

/* CREATE CLIENT */
export const createClient = async (data) => {
  const response = await clientCreateApi(data);
  return response.data;
};

/* CREATE Worker */
export const createWorker = async (data) => {
  const response = await workerCreateApi(data);
  return response.data;
};
