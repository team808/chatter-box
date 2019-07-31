const moment = require('moment');


const getYesterday = () => {
  return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`);
};

// const getYesterday = () => {
//   // return moment().subtract(1, 'days').calendar();
//   // return moment().startOf('day').fromNow();
// };

console.log(getYesterday());
