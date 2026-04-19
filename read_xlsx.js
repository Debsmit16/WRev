const xlsx = require("xlsx");
const workbook = xlsx.readFile("qa/WRev_QA_Report.xlsx");
console.log("Sheet Names:", workbook.SheetNames);
["Test_Cases", "Bug_Report", "Test_Summary"].forEach(name => {
  const sheet = workbook.Sheets[name];
  if (sheet) {
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(`\nSheet: ${name}`);
    console.log(`Row Count: ${data.length}`);
    if (name === "Test_Cases") {
      console.log("First 3 rows:");
      console.log(JSON.stringify(data.slice(0, 3), null, 2));
    }
  } else {
    console.log(`\nSheet: ${name} (Not Found)`);
  }
});
