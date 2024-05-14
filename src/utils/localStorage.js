export const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  export const addTourToLocalStorage = (tour) => {
    localStorage.setItem("tour", JSON.stringify(tour));
  };

  export const addLatandLongToLocalStorage = (pos) => {
    localStorage.setItem("position", JSON.stringify(pos));
  };

  export const getLatandLongFromLocalStorage = () => {
    const result = localStorage.getItem("position");
    const posi = result !== 'undefined' ? JSON.parse(result) : null;
    return posi;
  };

  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("user");
    const user = result !== 'undefined' ? JSON.parse(result) : null;
    return user;
  };

  export const getTourFromLocalStorage = () => {
    const result = localStorage.getItem("tour");
    const tour = result ? JSON.parse(result) : null;
    return tour;
  };

  export const removeAll = () => {
    localStorage.removeItem("user");
  };