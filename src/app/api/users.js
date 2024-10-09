let users = [];

export const addUser = (username, passwordHash, token) => {
  users.push({ username, passwordHash, token });
};

export const findUser = (username) => {
  return users.find(user => user.username === username);
};