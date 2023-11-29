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
  try {
    const USER_DATA = JSON.parse(localStorage.getItem('USER_DATA')).data;
    return USER_DATA;
  }
  catch (err) {
    return null;
  }
}

const getCurrentUserName = () => {
  try {
    const userName = JSON.parse(localStorage.getItem('USER_DATA')).data.username;
    return userName;
  }
  catch (err) {
    return null;
  }
}

const getCurrentUserId = () => {
  try {
    const userId = JSON.parse(localStorage.getItem('USER_DATA')).data.id;
    return userId;
  }
  catch (err) {
    return null;
  }
}

export {
  getAccessToken, getCurrentUserRole, getCurrentUserData, getCurrentUserId, getCurrentUserName,
  ROLE_ADMIN, ROLE_STAFF, ROLE_STUDENT, ROLE_TEACHER,
}
