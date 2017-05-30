window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Инвентаризация. Сегодня " + MySqlDateToStr(JournalDate(0));
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      glstgoods = JSON.parse(html1);
      MyMakeTable();
    }
  });
}

$("#MyGoodSearch").click(function () {
  var mf = document.getElementById('MyGoodNum').value;
  var done = true;
  var n = glstgoods.length;
  var i,j;
  var tarr;
  var gid;
  mf = mf.trim();
  i=0;
  if(mf!=''){
    while((i<n)&&(done==true)){
      if(glstgoods[i][0]==mf){
        done = false;
        if(glstgoods[i][5]==0){
          glstgoods[i][5]=1;
          gid = glstgoods[i][4];
          $.ajax({
            type: "POST",
            url: "scripts/goodinvent.php",
            data: { 
              pgid : gid,
            },
          //  async: false,
            success: function(html1) {
            }
          });
        }
      }
      else{
        i=i+1;
      }
    }
    if(done==false){
      j=0;
      tarr = glstgoods.concat();
      glstgoods[0] = tarr[i];
      while(j<i){
        glstgoods[j+1] = tarr[j];
        j = j+1;
      }
      MyClearTable();
      MyMakeTable();
    }
    else{
      alert('Товар не найден.');
    }
  }
});

function MyMakeTable(){
  var n = glstgoods.length;
  var i;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6;
  var row;
  var sumw, sums, stoim;
  sumw = 0;
  sums = 0;
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    if (glstgoods[i][5]==0){
      row.className += "tr1";
    }
    else{
      row.className += "tr2";
    }
    cell0 = row.insertCell(0);
    cell0.className +='td2';    
    cell1 = row.insertCell(1);
    cell1.className +='td3';
    cell2 = row.insertCell(2);
    cell2.className +='td3';
    cell3 = row.insertCell(3);
    cell3.className +='td4';    
    cell4 = row.insertCell(4);
    cell4.className +='td3';
    cell5 = row.insertCell(5);
    cell5.className +='td4';
    cell6 = row.insertCell(6);
    cell0.innerHTML = i+1;
    cell1.innerHTML = glstgoods[i][0];
    cell2.innerHTML = glstgoods[i][1];
    cell3.innerHTML = glstgoods[i][2];
    sumw = Number(sumw)+Number(glstgoods[i][2]);
    cell4.innerHTML = glstgoods[i][3];
    stoim = Math.round(glstgoods[i][3]*glstgoods[i][2]/100)*100;
    cell5.innerHTML = stoim;
    sums = Number(sums)+Number(stoim);
    cell6.innerHTML = glstgoods[i][4];
    cell6.className +='td1'
    t.appendChild(row);
  }
  row = t.insertRow(t.rows.length);
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого:";
  cell0.className +='td5';
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sumw);
  cell1.className +='td6';
  cell2 = row.insertCell(2);
  cell3 = row.insertCell(3);
  cell3.innerHTML = sums;
  cell3.className +='td6';
  document.getElementById("MyItog").innerHTML = "Итого: <br>Общий вес: " + MyFormat(Number(sumw)) +  "<br> Общая стоимость: " + sums;
}

function MyClearTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var i = 1;
  while(ntst>1){
    t.deleteRow(i);
    ntst = ntst-1;
  }
}

$("#MyPrintSel").dblclick(function () {
  var mf = document.getElementById('MyPrintSel').value;
  var n = glstgoods.length;
  var i,j;
  var tarr=[];
  switch (mf){
    case '0': // передать все
      j = 0;
      for (i=0;i<n;i++){
        tarr[j] = glstgoods[i];
        j = j+1;
      }
    break;
    case '1': // найденные
      j = 0;
      for (i=0;i<n;i++){
        if (glstgoods[i][5]==1){
          tarr[j] = glstgoods[i];
          j = j+1;
        }
      }
    break;
    case '2': // не найденные
      j = 0;
      for (i=0;i<n;i++){
        if (glstgoods[i][5]==0){
          tarr[j] = glstgoods[i];
          j = j+1;
        }
      }
    break;
  }
  $.ajax({
    type: "POST",
    url: "scripts/forprint.php",
    data: { 
      pmf : mf,
      parr : tarr,
    },
    async: false,
    success: function(html1) {
      window.open("http://lomstore/user/inventory/print/");
    }
  });
});

$("#MyStopButton").click(function () {
  $.ajax({
    type: "POST",
    url: "scripts/goodstopinvent.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      glstgoods = JSON.parse(html1);
      MyClearTable();
      MyMakeTable();
    }
  });
});
