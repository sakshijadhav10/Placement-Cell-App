export const server = "https://placement-cell-backend-ny07.onrender.com";

const apiList = {
  login: `${server}/auth/login`,
  forgotpassword:`${server}/auth/forgot-password`,
  resetpassword:`${server}/auth/reset-password`,
  signup: `${server}/auth/signup`,
  userMe:`${server}/auth/me`,
  // uploadResume: `${server}/upload/resume`,
  // uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  users:`${server}/api/all-users`
};

export default apiList;