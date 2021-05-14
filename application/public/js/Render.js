const queryOutput = document.getElementById("output");
const query1_input = document.getElementById("query1_input");

const defaults = {
  1: "Animal Farm",
};

const tableHead = head => {
  let headers = "";
  for (let i = 0; i < head.length; i++) headers += ` <th scope="col">${head[i]}</th> `;

  const tHead = `
    <thead>
    <tr>
    <th scope="col">#</th>
        ${headers}
    </tr>
    </thead>
    `;

  return tHead;
};

const tableRow = (id, row) => {
  let bodyData = "";
  for (let i = 0; i < row.length; i++) bodyData += `<td>${row[i]}</td>`;

  const rowData = `
          <tr>
          <th scope="row">${id}</th>
          ${bodyData}
          </tr>
          `;

  return rowData;
};

const tableData = data => {
  let tbodyData = "";
  for (let i = 0; i < data.length; i++) tbodyData += tableRow(i, Object.values(data[i]));

  const tableBody = `
      <tbody>
      ${tbodyData}
      </tbody>
      `;
  return tableBody;
};

const Builder = (headers, data) => {
  const output = `
    <table class="table">
        ${headers}
        ${data}
    </table>
`;
  queryOutput.innerHTML = output;
};

const Factory = data => Builder(tableHead(Object.keys(data[0])), tableData(data));

const Controller = async id => {
  try {
    let query = "null";
    if (id in defaults) {
      query = document.getElementById(`query${id}_input`).value;
      if (!(query && query.length)) query = defaults[id];
    }

    const response = await axios.get(`http://localhost:3000/api/querySelect/${id}/${query}`);
    Factory(response.data);
  } catch (e) {
    console.log(`Status: Failed\nEndpoint: /api/querySelect/${id}`);
  }
};

const init = async () => {
  await Controller(0);
};

init();
