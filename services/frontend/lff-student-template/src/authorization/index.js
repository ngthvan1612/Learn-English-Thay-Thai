const getAccessToken = () => {
  try {
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('USER_DATA')).accessToken
    return ACCESS_TOKEN
  }
  catch (error) {
    return null;
  }
}

const ROLE_ADMIN = "ADMIN"
const ROLE_STAFF = "STAFF"
const ROLE_STUDENT = "STUDENT"
const ROLE_TEACHER = "TEACHER"

const ROLES = [ROLE_ADMIN, ROLE_STAFF, ROLE_STUDENT, ROLE_TEACHER]

const getCurrentUserRole = () => {
  try {
    const USER_ROLE = JSON.parse(localStorage.getItem('USER_DATA')).data.role
    if (!ROLES.includes(USER_ROLE))
      return null
    return USER_ROLE
  }
  catch (error) {
    return null
  }
}

const getCurrentUserData = () => {
  const USER_DATA = JSON.parse(localStorage.getItem('USER_DATA')).data;
  return USER_DATA
}

const getCurrentUserId = () => getCurrentUserData().id;

export {
  getAccessToken, getCurrentUserRole, getCurrentUserData, getCurrentUserId,
  ROLE_ADMIN, ROLE_STAFF, ROLE_STUDENT, ROLE_TEACHER,
}
