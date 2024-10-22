// sessionStorage.js
const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  const setUserid = (userid) => {
    localStorage.setItem('userid', userid);
  };
  
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const getUserid = () => {
    return localStorage.getItem('userid');
  };
  
  const isUserAuth = () => {
    const userid = getUserid();
    return !!userid;
  };
  
  const isAuthenticated = () => {
    const token = getToken();
    return !!token;
  };
  
  const isLogged = () => {
    const token = getToken();
    const userid = getUserid();
    return !!token && !!userid;
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    window.location.reload();
  };
  
  export {
    setToken,
    getToken,
    isAuthenticated,
    logout,
    isUserAuth,
    setUserid,
    getUserid,
    isLogged,
  };
  