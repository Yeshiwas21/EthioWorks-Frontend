/**
 * Determine which storage is currently being used (local vs session)
 */
export const getStorage = () => {
  return localStorage.getItem("access") ? localStorage : sessionStorage;
};

/**
 * Store access & refresh tokens based on "remember me"
 */
export const storeTokens = (access, refresh, remember) => {
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem("access", access);
  storage.setItem("refresh", refresh);
};

/**
 * Get access token from available storage
 */
export const getAccessToken = () => {
  return (
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );
};

/**
 * Get refresh token from available storage
 */
export const getRefreshToken = () => {
  return (
    localStorage.getItem("refresh") ||
    sessionStorage.getItem("refresh")
  );
};

/**
 * Update access token in the active storage
 */
export const setAccessToken = (token) => {
  const storage = getStorage();
  storage.setItem("access", token);
};

/**
 * Update refresh token in the active storage
 */
export const setRefreshToken = (token) => {
  const storage = getStorage();
  storage.setItem("refresh", token);
};

/**
 * Clear all stored authentication tokens
 */
export const clearTokens = () => {
  localStorage.clear();
  sessionStorage.clear();
};