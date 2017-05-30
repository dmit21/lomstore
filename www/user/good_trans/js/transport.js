window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Передача товаров между пунктами. Сегодня " + MySqlDateToStr(JournalDate(0));
  MyGoodList();
}

function MyGoodList(){
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var arr = JSON.parse(html1);
      glgoods = arr[0];
      glstor = arr[1];
    }
  });
}

$("#MyGoodSearch").click(function () {
  var mf = document.getElementById('MyGoodNum').value;
  var done = true;
  var n = glgoods.length;
  var i;
  mf = mf.trim();
  i=0;
  if(mf!=''){
    while((i<n)&&(done==true)){
      if((glgoods[i][0]==mf)&&(glgoods[i][6]==0)){
        done = false;
        glgoods[i][6]=1;
      }
      else{
        i=i+1;
      }
    }
  }
  else{
    alert('Введите номер товара');
  }
  if (done==true){
    alert('Товар не найден или уже перемещен.');
  }
  else{
    ClearTable();
    MakeTable();
    TotSum();
  }
});

function ClearTable(){
  var tab = document.getElementById("MyGoodTable");
  var tl = document.getElementById("MyGoodTable").rows.length;
  var i;
  for(i=tl-1; i>0; i--) {
    tab.deleteRow(i);
  }
}

function MakeTable(){
  var table = document.getElementById("MyGoodTable");
  var n = glgoods.length;
  var i;
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, row, info;
  var st, clnbtn;
  var j =1;
  for (i=0;i<n;i++){
    if(glgoods[i][6]==1){
      row = table.insertRow(table.rows.length);
      cell0 = row.insertCell(0);
      cell0.className +='td2';      
      cell1 = row.insertCell(1);
      cell1.className +='td3';
      cell2 = row.insertCell(2);
      cell2.className +='td3';
      cell3 = row.insertCell(3);
      cell3.className +='td4';
      cell4 = row.insertCell(4);
      cell4.className +='td4';
      cell5 = row.insertCell(5);
      cell5.className +='td4';
      cell6 = row.insertCell(6);
      cell6.className +='td2';
      cell7 = row.insertCell(7);
      cell0.innerHTML = j;
      j = j+1;
      cell1.innerHTML = glgoods[i][0];
      cell2.innerHTML = glgoods[i][1];
      cell3.innerHTML = glgoods[i][2];
      cell4.innerHTML = glgoods[i][4];
      cell5.innerHTML = Math.round(glgoods[i][4]*glgoods[i][2]/100)*100;
      clnbtn = document.createElement("button");
      clnbtn.setAttribute("type", "button");
      clnbtn.setAttribute("onclick", "DeleteGood(this)");
      info = document.createElement("i");
      info.className += "fa fa-trash-o";
      clnbtn.appendChild(info);
      cell6.appendChild(clnbtn);
      cell7.innerHTML = glgoods[i][5];
      cell7.className +='td1'
      table.appendChild(row);
    }
  }
}

function DeleteGood(val){
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[1].innerHTML;
  var n = glgoods.length;
  var i,done;
  done = true;
  i = 0;
  while ((i<n)&&(done==true)){
    if (glgoods[i][0]==ng){
      done=false;
      glgoods[i][6]=0;
    }
    else{
      i = i+1;
    }
  }
  ClearTable();
  MakeTable();
  TotSum();
}

$("#MyClearButton").click(function () {
  var n = glgoods.length;
  var i;
  for (i=0;i<n;i++) glgoods[i][6]=0;
  ClearTable();
});

$("#MyMoveButton").click(function () {
  $("#MyMoveButton").attr('disabled',true);
  $("#MyMoveButton").css('color','gray');
  $("#MyClearButton").attr('disabled',true);
  $("#MyClearButton").css('color','gray');
  $("#MyPrintButton").css('visibility','visible');
  var i,j,done;
  var tarr=[];
  var table = document.getElementById('MyGoodTable');
  var nt = table.rows.length;
  var ng; // номер товара
  j = 0;
  for (i=1;i<nt-1;i++){
    tarr[j] = table.rows[i].cells[7].innerHTML;
    j = j+1;
  }
  //ClearTable();
  if(tarr.length>0){
    $.ajax({
      type: "POST",
      url: "scripts/movegood.php",
      data: { 
        ptarr : tarr,
      },
      async: false,
      success: function(html1) {
        alert('Операция перемещения завершена.');

      }
    });
  }
  MyGoodList();
});

$("#MyPrintButton").click(function () {
  var t = document.getElementById('MyGoodTable');
  var n, i;
  n = t.rows.length;
  var tarr = [];
  var j = 0;
  for (i=1; i<(n-1); i++) {
    tarr[j] = [];
    tarr[j][0] = t.rows[i].cells[1].innerHTML;
    tarr[j][1] = t.rows[i].cells[2].innerHTML;
    tarr[j][2] = t.rows[i].cells[3].innerHTML;
    tarr[j][3] = t.rows[i].cells[4].innerHTML;
    tarr[j][4] = t.rows[i].cells[5].innerHTML;
    j = j+1;  
  }
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
      ptarr : tarr,
    },
    async: false,
    success: function(html1) {
    }
  });
  window.open("http://lomstore/user/good_trans/print/");
});

function TotSum(){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sw,sst;
  var row,cell0,cell1,cell2,cell3,cell4;
  // сумма себестоимости
  sw = 0;
  sst = 0;
  n = t.rows.length;
  for(i=1;i<n;i++){
    sw = sw+Number(t.rows[i].cells[3].innerHTML);
    sst = sst+Number(t.rows[i].cells[5].innerHTML);
  }
  // сумма себестоимости
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.className += "td5";
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого:";
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sw);
  cell1.className += "td6";
  cell2 = row.insertCell(2);
  cell2.innerHTML = '';
  cell2.className += "td6";
  cell3 = row.insertCell(3);
  cell3.innerHTML = sst;
  cell3.className += "td6";
  cell4 = row.insertCell(4);
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br>Общий вес: " + MyFormat(Number(sw)) +  "<br> Общая стоимость: " + sst;
}
