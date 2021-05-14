const Tool = {};
const length = 13;
Tool.generateISBN = () => {
  let result = "";
  let characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

Tool.generateDate = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  newdate = year + "-" + month + "-" + day;
  return newdate;
};

module.exports = Tool;
