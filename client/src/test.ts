function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = {
  label: "Size 10 object",
  size: 10,
};
printLabel(myObj);
