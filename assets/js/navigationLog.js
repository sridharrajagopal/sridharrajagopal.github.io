// Navigation log

function printPortion(elementId) {
  var printContent = document.getElementById(elementId);
  var newWindow = window.open('', '', 'width=800,height=600');
  newWindow.document.write('<html><head><title>Print</title>');
  newWindow.document.write('</head><body>');
  newWindow.document.write(printContent.innerHTML);
  newWindow.document.write('</body></html>');
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
}

function createCellWithTextArea(row, taName) {
  var cell = row.insertCell();
  cell.rowSpan = 2;
  let textArea = document.createElement("textarea");
  textArea.name = taName;
  textArea.rows = 2;

  cell.appendChild(textArea);
}

function createCellWithInput(row, inName, colspan=1, rowspan=1,
  readonly=false, disabled=false) {
  var cell = row.insertCell();
  cell.colSpan = colspan;
  cell.rowSpan = rowspan;
  var input = document.createElement("input");
  input.name = inName;
  input.type = "text";
  input.readOnly = readonly;
  input.disabled = disabled;
  cell.appendChild(input);
}

function createCellWithFillEnroute(row) {
  var cell = row.insertCell();
  cell.classList.add("fillEnroute");
}

function createCellWithHiddenInput(row, inName, colspan=1, rowspan=1) {
  var cell = row.insertCell();
  cell.colSpan = colspan;
  cell.rowSpan = rowspan;
  var input = document.createElement("input");
  input.name = inName;
  input.type = "hidden";
  cell.appendChild(input);
}

function createCounter() {
  let count = 3; // This variable acts like a static variable

  return function() {
    return count++;
  };
}

const counter = createCounter();


function insertRow() {
  var table = document.getElementById("NavLog");
  var myVal = counter();
  var row = table.getElementsByTagName('tbody')[0].insertRow();
  createCellWithTextArea(row, "A"+myVal);

  createCellWithInput(row, "B"+myVal);

  createCellWithTextArea(row, "C"+myVal);

  createCellWithInput(row, "D"+myVal);

  createCellWithTextArea(row, "E"+myVal);
  createCellWithTextArea(row, "F"+myVal);

  createCellWithInput(row, "G"+myVal);
  createCellWithInput(row, "H"+myVal);

  createCellWithInput(row, "I"+myVal, 1, 2);

  createCellWithInput(row, "J"+myVal);
  createCellWithInput(row, "K"+myVal, 1, 1, true, true);
  createCellWithInput(row, "L"+myVal, 1, 1, true, true);

  createCellWithInput(row, "M"+myVal, 1, 2, true, true);

  createCellWithInput(row, "N"+myVal);
  createCellWithInput(row, "O"+myVal, 1, 1, true, true);
  createCellWithInput(row, "P"+myVal, 1, 1, true, true);
  createCellWithFillEnroute(row);
  createCellWithInput(row, "R"+myVal, 1, 2);
  createCellWithInput(row, "S"+myVal, 1, 1, true, true);
  createCellWithHiddenInput(row, "T"+myVal);

  myVal = counter();
  row = table.getElementsByTagName('tbody')[0].insertRow();

  createCellWithInput(row, "B"+myVal);
  createCellWithInput(row, "D"+myVal);
  createCellWithInput(row, "G"+myVal+"H"+myVal, 2);
  createCellWithInput(row, "J"+myVal, 1, 1, true, true);
  createCellWithInput(row, "K"+myVal);
  createCellWithInput(row, "L"+myVal);
  createCellWithInput(row, "N"+myVal, 1, 1, true, true);
   createCellWithFillEnroute(row);
  createCellWithFillEnroute(row);
  createCellWithFillEnroute(row);
  createCellWithInput(row, "S"+myVal, 1, 1, true, true);
  row.insertCell();
}

function deleteRow() {
  var table = document.getElementById("NavLog");
  var tbody = table.getElementsByTagName('tbody')[0];

  let numRows = tbody.rows.length;

  if (numRows > 2) {
     tbody.deleteRow(numRows - 1);
     tbody.deleteRow(numRows - 2);
  }
}
  
function ComputeTotal(cell1, cell2, cell3){
var res;
if (cell1.value == 0) cell1.value = 0;
if (cell2.value == 0) cell2.value = 0;
res = Math.round(cell1.value) + Math.round(cell2.value);
if (res < 0) res = 360 + res;
cell3.value = (res)%360;
}

function ComputeColSum(cells) {
  var total = 0.0;
  for (i=0; i<cells.length - 1; i++) {
    if (cells[i].value == 0) cells[i].value = 0;
    total += parseFloat(cells[i].value);
  }
  cells[cells.length-1].value = total.toFixed(2);
}

function ComputeColRem(totalFuel, cells) {
  var total = 0.0;
  if (totalFuel.value == 0)
    total = 0.0;
  else
    total = parseFloat(totalFuel.value);

  for (i=0; i<cells.length; i = i+2) {
     let newTotal = total - parseFloat(cells[i].value);
     total = newTotal;
     cells[i+1].value = newTotal.toFixed(2);
  }
}

function ComputeThetaW(cell1, cell2, cell3){
var wind;
if (cell1.value == 0) cell1.value = 0;
if (cell2.value == 0) cell2.value = 0;
wind = (Math.round(cell1.value) + 180)%360;
if (wind >= Math.round(cell2.value) )
  cell3.value = (Math.abs(Math.round(cell2.value) - wind))%360;
else
  cell3.value = 360 - (Math.abs(Math.round(cell2.value) - wind))%360;
}

function ComputeWindCorrectionAngle(Wvel, Avel, ThetaW, Wca){
var result;
if (Wvel.value == 0) Wvel.value = 0;
if (Avel.value == 0) Avel.value = 0;
if (ThetaW.value == 0) ThetaW.value = 0;
if (Avel.value == 0) result = 0;
else result = Math.asin((Math.round(Wvel.value)/Math.round(Avel.value))*Math.sin(ThetaW.value*Math.PI/180))*180/Math.PI;
Wca.value = -Math.round(result);
}

function ComputeGroundSpeed(Ws, Tas, Wca, ThetaW, Gs){
if (Ws.value == 0) Ws.value = 0;
if (Tas.value == 0) Tas.value = 0;
if (Wca.value == 0) Wca.value = 0;
if (ThetaW.value == 0) ThetaW.value = 0;
Gs.value = Math.round(
           Math.round(Tas.value)*Math.cos(Math.round(Wca.value)*Math.PI/180) + 
         Math.round(Ws.value)*Math.cos(Math.round(ThetaW.value)*Math.PI/180));
}

function ComputeLegTime(D, Gs, T){
if (D.value == 0) D.value = 0;
if (Gs.value == 0) Gs.value = 0;
if (D.value == 0) T.value = 0;
else T.value = Math.round(Math.round(D.value)/Math.round(Gs.value)*60);
}

function ComputeFuelAmt(T, Fr, Fa){
if (T.value == 0) T.value = 0;
if (Fr.value == 0) Fr.value = 0;
if (Fr.value == 0) Fa.value = 0;
else Fa.value = (Math.round(T.value)/60 * parseFloat(Fr.value)).toFixed(2);
}

function ComputeRow(WD, WV, TAS, TC, WCA, TH, VAR, MH, DEV, CH, LEG, GSE, ETE, FR, FA, TW) {
ComputeThetaW(WD, TC, TW);
ComputeWindCorrectionAngle(WV, TAS, TW, WCA);
ComputeGroundSpeed(WV, TAS, WCA, TW, GSE);
ComputeLegTime(LEG, GSE, ETE);
ComputeFuelAmt(ETE, FR, FA);
ComputeTotal(TC, WCA, TH);
ComputeTotal(TH, VAR, MH);
ComputeTotal(MH, DEV, CH);
}

function ComputeResults(form) {
    const distCol = [];
    const eteCol = [];
    const fuelCol = [];

    const fuelRemCol = [];
    const distRemCol = [];
  for(var i=3; i<form.length-7; i=i+27){
     ComputeRow(form.elements[i+6], form.elements[i+7], form.elements[i+8], 
                form.elements[i+9], form.elements[i+22], form.elements[i+10], 
                form.elements[i+23], form.elements[i+11], form.elements[i+24],
                form.elements[i+12], form.elements[i+13], form.elements[i+14],
                form.elements[i+15], form.elements[i+16], form.elements[i+17],
                form.elements[i+18]);
      distCol.push(form.elements[i+13]);
      eteCol.push(form.elements[i+15]);
      fuelCol.push(form.elements[i+17]);

      distRemCol.push(form.elements[i+13]);
      distRemCol.push(form.elements[i+25]);
      
      fuelRemCol.push(form.elements[i+17]);
      fuelRemCol.push(form.elements[i+26]);      
  }
  distCol.push(form.NTOT);
  eteCol.push(form.PTOT);
  fuelCol.push(form.STOT);

  ComputeColSum(distCol);
  ComputeColSum(eteCol);
  ComputeColSum(fuelCol);

  ComputeColRem(form.FUELTOT, fuelRemCol);
  ComputeColRem(form.NTOT, distRemCol);

}
