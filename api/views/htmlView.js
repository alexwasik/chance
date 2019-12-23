const view = (rowData) => {
  const data = rowData.map((row) => {
    return (
      `<div>
        <p>name: ${row.name}</p>
        <p>description: ${row.description}</p>
        <p>type: ${row.type}</p>
        <p>amount: ${row.amount}</p>
      </div>`
    );
  });
  return data.join('');
};

module.exports = {
  view: view
};
