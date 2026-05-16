export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  const user = getUser();

  // 🔥 FIX: ensure null, undefined, or empty object is treated as NOT logged in
  if (!user) return false;

  // extra safety check (prevents fake empty objects)
  if (Object.keys(user).length === 0) return false;

  return true;
};