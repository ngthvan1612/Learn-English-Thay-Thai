const getAccessToken = () => {
  try {
    const ACCESS_TOKEN = JSON.parse(
      localStorage.getItem("USER_DATA")
    ).accessToken;
    return ACCESS_TOKEN;
  } catch (error) {
    return null;
  }
};

const ROLE_ADMIN = "ADMIN";
const ROLE_STAFF = "STAFF";
const ROLE_STUDENT = "STUDENT";
const ROLE_TEACHER = "TEACHER";

const ROLES = [ROLE_ADMIN, ROLE_STAFF, ROLE_STUDENT, ROLE_TEACHER];

const getCurrentUserRole = () => {
  try {
    const USER_ROLE = JSON.parse(localStorage.getItem("USER_DATA")).data.role;
    if (!ROLES.includes(USER_ROLE)) return null;
    return USER_ROLE;
  } catch (error) {
    return null;
  }
};

const getCurrentUserId = () => {
  try {
    const id = JSON.parse(localStorage.getItem("USER_DATA")).data.id;
    return id;
  } catch (error) {
    return null;
  }
};

export {
  getAccessToken,
  getCurrentUserRole,
  getCurrentUserId,
  ROLE_ADMIN,
  ROLE_STAFF,
  ROLE_STUDENT,
  ROLE_TEACHER,
};
