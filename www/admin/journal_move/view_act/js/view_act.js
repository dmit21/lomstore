window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/viewact.php",
    data: { 
    },
    success: function(html1) {
      var timearr = JSON.parse(html1);
      gltic = timearr[3];
      document.getElementById('MyZag').innerHTML = '№ '+timearr[1]+' от '+timearr[2];
      AddToTable();
    }
  });
}
/*
function MySearch(){
  var si = document.getElementById('MyStore').selectedIndex;
  if(si>=0){
    ms = document.getElementById('MyStore').value;
    var MyDate = document.getElementById("MyDateSale").value;
    var snt = document.getElementById('MyStore').options[si].innerHTML;
    document.getElementById('MyStoreName').innerHTML = snt + ' от '+MySqlDateToStr(MyDate);
    $.ajax({
      type: "POST",
      url: "scripts/goodssale.php",
      data: { 
        ppoint : ms,
        pmydate : MyDate,
      },
      success: function(html1) {
        glgoods = JSON.parse(html1);
        AddToTable();
      }
    });
  }
  else{
    alert('Нет данных');
  }
}
*/
function AddToTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var i;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
  var cell0, cell1, cell2, cell3, cell4, cell5;
  var row;
  var n = gltic.length;
  var sseb, sw, sst;
  var tnum,pnum
  sseb = 0;
  sw = 0;
  sst = 0;
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    cell3 = row.insertCell(3);
    cell4 = row.insertCell(4);
    cell5 = row.insertCell(5);

    cell0.innerHTML = i+1;
    cell0.className +='td3';
    tnum = gltic[i][1].length;
    pnum = gltic[i][2].length;
    pnum = 8-tnum-pnum;
    tnum = gltic[i][2]+InSymToStr('0',pnum)+gltic[i][1];
    cell1.innerHTML = tnum;
    cell1.className +='td4';
    cell2.innerHTML = MyFormat(gltic[i][3]);
    sw = Number(sw)+Number(gltic[i][3]);
    cell2.className +='td5';
    cell3.innerHTML = gltic[i][5];
    sseb = Number(sseb)+Number(gltic[i][5]);
    cell3.className +='td6';
    cell4.innerHTML = gltic[i][4];
    sst = Number(sst)+Number(gltic[i][4]);
    cell4.className +='td4';
    cell5.innerHTML = gltic[i][0];
    cell5.className +='td1';
    t.appendChild(row);
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "2");
  cell0.innerHTML = "Итого";
  cell0.className +='td7';
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sw);
  cell1.className +='td4';
  cell2 = row.insertCell(2);
  cell2.innerHTML = sseb;
  cell2.className +='td4';
  cell3 = row.insertCell(3);
  cell3.innerHTML = sst;
  cell3.className +='td4';
  t.appendChild(row);
}
// формирование печати
$("#MyPrintButton").click(function () {
  window.open("http://lomstore/admin/journal_act_exec/view_act/print/");
});
// формирование печати
