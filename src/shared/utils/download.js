export const downloadFile = (url, filename = "download") => {

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};

export const downloadJSON = (data, filename = "data.json") => {

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  downloadFile(url, filename);

  URL.revokeObjectURL(url);

};