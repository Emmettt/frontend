export const set = value => {
  localStorage.setItem('shortcuts', JSON.stringify(value));
};

export const get = () => {
  const data = localStorage.getItem('shortcuts');

  return data ? JSON.parse(data) : null;
};
