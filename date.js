const getYesterday = () => {
  return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`);
};

console.log(getYesterday());
