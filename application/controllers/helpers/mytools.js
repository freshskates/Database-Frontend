const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
module.exports = {
  resFormatDateCreated: res_data => {
    for (let i = 0; i < res_data.length; i++) {
      let date_object = new Date(res_data[i].created.toString().split("-")[0]);
      res_data[i].created = `${MONTHS[date_object.getMonth()]} ${date_object.getDate()}, ${date_object.getFullYear()}`;
    }
    return res_data;
  },

  isLetter: str => {
    return str.length > 0 && str.match(/^[a-z\d\-_\s]+$/i);
  },
};
