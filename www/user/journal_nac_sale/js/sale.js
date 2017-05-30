window.onload = function () {
  document.getElementById('DateBeg').value = JournalDate(10);
  document.getElementById('DateEnd').value = JournalDate(0);
  MySearch();
}
$("#DateSearch").click(function () {
  MySearch();
});

function MySearch() {
  var db = document.getElementById('DateBeg').value;
  var de = document.getElementById('DateEnd').value;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: {
      pdb : db,
      pde : de,
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glact = store[0];
      glgoods = store[1];
      if (glact!=null) {
        n = glact.length;
        var acts = document.getElementById('MyAct');
        for(i=0;i<n;i++){
          opt = document.createElement("option");
          opt.setAttribute("value", glact[i][0]);
          opt.innerHTML=glact[i][2]+' от '+MySqlDateToStr(glact[i][1]);
          acts.appendChild(opt);
        }
      }
      else {
        alert("Нет актов за выбраный период.");
      }
    }
  });
}


$("#MyAct").dblclick(function () {
  MyClickAct();
});

function MyClickAct(){
  var anum = document.getElementById('MyAct').value;
  var n,i,done;

  done = false;
  if(glgoods!=null){
    n = glgoods.length;
    for (i=0;i<n;i++) glgoods[i][10] = 0;
    for(i=0;i<n;i++){
      if((glgoods[i][9]==anum)){
        glgoods[i][10] = 1;
        done = true;
      }
    }
  }
  else{
    alert('Нет товаров');
    var t = document.getElementById('MyGoodTable');
    var ntst = t.rows.length;
    var i;
    while(ntst>1){
      t.deleteRow(1);
      ntst = ntst-1;
    }
  }
  if (done == true){
    AddToTable();
    TotSum();
  }
  else{
    alert('Нет товаров совсем');
    var t = document.getElementById('MyGoodTable');
    var ntst = t.rows.length;
    var i;
    while(ntst>1){
      t.deleteRow(1);
      ntst = ntst-1;
    }
  }
}


function AddToTable(){
  var t = document.getElementById('MyGoodTable');
  var ntst = t.rows.length;
  var i,j;
  while(ntst>1){
    t.deleteRow(1);
    ntst = ntst-1;
  }
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9;
  var row;
  var n = glgoods.length;
  var  stoim, tobuy;
  var inp;
  j = 1;
  for (i=0;i<n;i++){
    if(glgoods[i][10]==1){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);// номер по порядку
      cell1 = row.insertCell(1);// номер товара
      cell2 = row.insertCell(2);// нименование товара
      cell3 = row.insertCell(3);// вес
      cell4 = row.insertCell(4);// стоимость за гр
      cell5 = row.insertCell(5);// цена
      cell6 = row.insertCell(6);// скидка
      cell7 = row.insertCell(7);// продажная цена
      cell8 = row.insertCell(8);// Продано за
      cell0.innerHTML = j;
      j = j+1;
      cell0.className +='td3';
      cell1.innerHTML = glgoods[i][2];
      cell1.className +='td4';
      cell2.innerHTML = glgoods[i][1];
      cell2.className +='td5';
      cell3.innerHTML = MyFormat(glgoods[i][4]);
      cell3.className +='td4';
      cell4.innerHTML = glgoods[i][5];
      stoim = Math.round(glgoods[i][4]*glgoods[i][5]/100)*100;
      cell4.className +='td6';
      cell5.innerHTML = stoim;
      cell5.className +='td6';
      cell6.innerHTML = glgoods[i][6];
      cell6.className +='td4';
      tobuy = Math.round((stoim-stoim*glgoods[i][6]/100)/100)*100;
      cell7.innerHTML = tobuy;
      cell7.className +='td6';
      if(glgoods[i][11]==0){
        cell8.innerHTML = glgoods[i][8];
        cell8.className +='td6';
      }
      t.appendChild(row);
    }
  } 
}

function TotSum(){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sw,sst,sseb;
  var row,cell0, cell1,cell2,cell3,cell4;
  sw = 0;
  sst = 0;
  n = glgoods.length;
  for (i=0;i<n;i++){
    if(glgoods[i][10]==1){
      sw = Number(sw)+Number(glgoods[i][4]);
      sst = Number(sst)+Number(glgoods[i][8]);
    }
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого";
  cell0.className +='td7';
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(Number(sw));
  cell1.className +='td7';
  cell2 = row.insertCell(2);
  cell2.setAttribute("colspan", "4");
  cell3 = row.insertCell(3);
  cell3.innerHTML = sst;
  cell3.className +='td7';
  t.appendChild(row);
}

$("#MyPrintButton").click(function () {
  var anum = document.getElementById('MyAct').value;
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: {
      panum : anum,
    },
    async : false,
    success: function(html1) {
      window.open("http://lomstore/user/journal_nac_sale/print/");
    }
  });
});
