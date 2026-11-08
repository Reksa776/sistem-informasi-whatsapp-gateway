const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const fallbackApiUrl = "http://localhost:5000";

export const API_URL = trimTrailingSlash(
  import.meta.env.VITE_API_URL || fallbackApiUrl
);

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || `${API_URL}/api`
);

const uploadUrl = import.meta.env.VITE_UPLOAD_URL || `${API_URL}/uploads`;
export const UPLOAD_URL = `${trimTrailingSlash(uploadUrl)}/`;

export const SOCKET_URL = trimTrailingSlash(
  import.meta.env.VITE_SOCKET_URL || API_URL
);
