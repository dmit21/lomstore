window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Перемещение товаров. Сегодня " + MySqlDateToStr(JournalDate(0));
  $("#PrintBut").attr('disabled',true);
  $("#PrintBut").css({'color': 'gray'});
  $("#MakeBut").attr('disabled',true);
  $("#MakeBut").css({'color': 'gray'});
  document.getElementById("MyGoodTable").rows.length=1;
  StoreSearch();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});  
}

function StoreSearch(){
  var sel = document.getElementById("MyStore");
  var rez;
  sel.length=0;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      rez = JSON.parse(html1);
      glstore = rez[0];
      glcats = rez[1];
      glact = rez[2];
      glgoods = rez[3];
    }
  });
  var n = glstore.length;
  var i;
  var opt;
  opt = document.createElement("option");
  opt.setAttribute("value", 100000);
  opt.innerHTML="Все";
  sel.appendChild(opt);
  for (i = 0;i<n;i++){
    opt = document.createElement("option");
    opt.setAttribute("value", glstore[i][0]);
    opt.innerHTML=glstore[i][2];
    sel.appendChild(opt);
  }

  var sel1 = document.getElementById('MyAct');
  sel1.length=0;
  var opt1;
  if (glact!=null){
    n = glact.length;
    for (i = 0;i<n;i++){
      opt1 = document.createElement("option");
      opt1.setAttribute("value", glact[i][0]);
      opt1.innerHTML=glact[i][2]+' акт № '+glact[i][1] + ' от '+MySqlDateToStr(glact[i][4]);
      sel1.appendChild(opt1);
    }
  }
}

// акта выбранного магазина в селект для актов
$("#MyStore").dblclick(function () {
  var si = document.getElementById('MyStore').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Выбрана витрина: '+document.getElementById('MyStore').options[si].innerHTML;
  }
  var actid = document.getElementById("MyStore").value;
  var sel = document.getElementById('MyAct');
  sel.length = 0;
  var opt1;
  var j;
  var n;
  MyClearTable();
  if (glact == null) {
    n = 0;
  }
  else {
    n = glact.length;
  }
  if (n==0){
      opt1 = document.createElement("option");
      opt1.setAttribute("value", 0);
      opt1.innerHTML='Нет данных';
      sel.appendChild(opt1);
  }
  else{
    if (actid==100000){
      for (i = 0;i<n;i++){
        opt1 = document.createElement("option");
        opt1.setAttribute("value", glact[i][0]);
        opt1.innerHTML=glact[i][2]+' акт № '+glact[i][1] + ' от '+MySqlDateToStr(glact[i][4]);
        sel.appendChild(opt1);
      }
    }
    else{
      j = 0;
      for (i = 0;i<n;i++){
        if (glact[i][3]==actid){
          opt1 = document.createElement("option");
          opt1.setAttribute("value", glact[i][0]);
          opt1.innerHTML=glact[i][2]+' акт № '+glact[i][1] + ' от '+MySqlDateToStr(glact[i][4]);
          sel.appendChild(opt1);
          j = j+1;
        }
      }
      if (j==0){
        opt1 = document.createElement("option");
        opt1.setAttribute("value", 0);
        opt1.innerHTML='Нет данных';
        sel.appendChild(opt1);
      }
    }
  }
});
// акта выбранного магазина в селект для актов

// добавление товаров акта в таблицу товаров
$("#MyAct").dblclick(function () {
  var actid = document.getElementById("MyAct").value;
  glactid = actid;
  if(actid!=0){
    $("#MakeBut").removeAttr('disabled');
    $("#MakeBut").css({'color': 'black'});
    MyClearTable();
    AddTable();
    TotSum();
  }
  else{
    alert('Нет данных');
  }
});
// добавление товаров акта в таблицу товаров

function AddTable(){
  var actid = document.getElementById("MyAct").value;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13;
  var n = glgoods.length;
  var j,nc,done,ic,st,jj,st1;
  var row;
  var inp, inp1, tobuy;
  jj = 1;
  for (i=0;i<n;i++){
    if(glgoods[i][0]==actid){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // № по порядку
      cell0.className +='td2';
      cell1 = row.insertCell(1); // № билета
      cell1.className +='td3';
      cell2 = row.insertCell(2); // номер товара
      cell2.className +='td3';
      cell3 = row.insertCell(3); // наименование товара
      cell3.className +='td3';
      cell4 = row.insertCell(4); // вес товара
      cell4.className +='td4';
      cell5 = row.insertCell(5); // категория магазина
      cell5.className +='td3';
      cell6 = row.insertCell(6); // стоимость за гр товара
      cell6.className +='td4';
      cell7 = row.insertCell(7); // скидка
      cell7.className +='td4';
      cell8 = row.insertCell(8); // стоимость
      cell8.className +='td4';
      cell9 = row.insertCell(9); // себестоимость
      cell9.className +='td4';
      cell10 = row.insertCell(10); // магазин откуда
      cell10.className +='td3';
      cell11 = row.insertCell(11); // магазин куда
      cell11.className +='td3';
      cell12 = row.insertCell(12); // подтверж
      cell12.className +='td2';
      cell13 = row.insertCell(13); // id товара
      cell14 = row.insertCell(14); // id магазина, откуда товар
      cell15 = row.insertCell(15); // признак, были ли изменены цены на товар вручную

      cell0.innerHTML = Number(jj); jj = jj+1;
      cell1.innerHTML = glgoods[i][11]
      cell1.className +='td2';
      cell2.innerHTML = glgoods[i][2];
      cell2.className +='td2';
      cell3.innerHTML = glgoods[i][3];
      cell4.innerHTML = MyFormat(glgoods[i][4]);
      cell5.innerHTML = glgoods[i][8];
      cell6.innerHTML = glgoods[i][6];
      cell7.innerHTML = glgoods[i][13];
      tobuy = Math.round(Number(glgoods[i][4])*Number(glgoods[i][6])/100)*100-Math.round(Number(glgoods[i][4])*Number(glgoods[i][6])*Number(glgoods[i][13])/10000)*100;
      cell8.innerHTML = tobuy;
      cell9.innerHTML = glgoods[i][10];
      cell10.innerHTML = glgoods[i][9];

      st = document.createElement("select"); // выбор витрины
      st.className +='sel3';
      st.setAttribute("onChange", "MyVit(this)");
      nc = glstore.length;
      for (ic = 0; ic < nc; ic++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", glstore[ic][0]);
        opt.innerHTML=glstore[ic][2];
        st.appendChild(opt);
      };
      st.value = glgoods[i][15];
      cell11.appendChild(st);

      st1 = document.createElement("input");// checkbox для подтверждения
      st1.setAttribute("type", "checkbox");
      if(glgoods[i][16]==1) st1.setAttribute("checked","checked");
      st1.setAttribute("onChange", "MyCheck(this)");
      cell12.appendChild(st1);
      cell13.innerHTML = glgoods[i][1];
      cell13.className +='td1'
      cell14.innerHTML = glgoods[i][7];
      cell14.className +='td1'
      cell15.innerHTML = glgoods[i][14];
      cell15.className +='td1'
      t.appendChild(row);
    }
  } 
}

function MyClearTable(){
  var mtst = document.getElementById("MyGoodTable");
  var ntst = mtst.rows.length;
  var i = 1;
  while(ntst>1){
    mtst.deleteRow(i);
    ntst = ntst-1;
  }
}

function TotSum(){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sseb,sw,sst;
  var row,cell0,cell1,cell2,cell3,cell4;
  // сумма себестоимости
  sseb = 0;
  sw = 0;
  sst = 0;
  ssb = 0;
  n = t.rows.length;
  for(i=1;i<n;i++){
    if(t.rows[i].cells[12].childNodes[0].checked==true){
      sw = sw+Number(t.rows[i].cells[4].innerHTML);
      sst = sst+Number(t.rows[i].cells[8].innerHTML);
      ssb = ssb+Number(t.rows[i].cells[9].innerHTML);
    }
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.className +='td5';
  cell0.setAttribute("colspan", "4");
  cell0.innerHTML = "Итого:";
  cell1 = row.insertCell(1);
  cell1.className +='td4';
  cell1.innerHTML = MyFormat(sw);
  cell2 = row.insertCell(2);
  cell2.setAttribute("colspan", "3");
  cell3 = row.insertCell(3);
  cell3.className +='td4';
  cell3.innerHTML = sst;
  cell4 = row.insertCell(4);
  cell4.className +='td4';
  cell4.innerHTML = ssb;
  cell5 = row.insertCell(5);
  cell5.setAttribute("colspan", "3");
  t.appendChild(row);
}


$("#MakeBut").click(function () {
  $("#MakeBut").attr('disabled',true);
  $("#MakeBut").css({'color': 'gray'});
  $("#PrintBut").removeAttr('disabled');
  $("#PrintBut").css({'color': 'black'});

  $.ajax({
    type: "POST",
    url: "scripts/movegood.php",
    data: { 
      pactid : glactid,
    },
    async: false,
    success: function(html1) {
      alert(html1);
    }
  });
//  SaveCom();
//  StoreSearch();
//  MyClearTable();
});

$("#PrintBut").click(function () {
  $("#PrintBut").attr('disabled',true);
  $("#PrintBut").css({'color': 'gray'});
  window.open("http://lomstore/admin/goodmove/print/");
});

$("#MyCancelButton").click(function () {
  var n,i;
  n = glgoods.length;
  for(i=0;i<n;i++){
    glgoods[i][7] = glgoods[i][13];
  }
  MyClearTable();
  AddTable();
  TotSum();
  document.getElementById('MySaveButton').setAttribute('class','but1');
  document.getElementById('MyCancelButton').setAttribute('class','but1');
});

function MyVit(val){ // выбор витрины, куда будет перемещен товар, с изменением соответствующих цен и скидок.
  var t = document.getElementById('MyGoodTable');
  var stoim, weigth, discont;
  var r = val.parentNode.parentNode.rowIndex; // номер строки
  var vitnum = t.rows[r].cells[11].childNodes[0].value;// id витрины
  var goodid = t.rows[r].cells[13].innerHTML;
  var gind = t.rows[r].cells[15].innerHTML;
  $.ajax({
    type: "POST",
    url: "scripts/upvit.php",
    data: { 
      pvitnum : vitnum,
      pgoodid : goodid,
      pgind : gind,
      pactid : glactid,
    },
    async : false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      if(rez[0]!=0){
        t.rows[r].cells[6].innerHTML = rez[0];
        t.rows[r].cells[7].innerHTML = rez[1];
        weigth = t.rows[r].cells[4].innerHTML;
        stoim = Math.round(weigth*rez[0]/100)*100-Math.round(weigth*rez[0]*rez[1]/10000)*100;
        t.rows[r].cells[8].innerHTML = stoim;
      }
    }
  });
  var n = t.rows.length;
  t.deleteRow(n-1);
  TotSum();
}

function MyCheck(val){ // выбор витрины, куда будет перемещен товар, с изменением соответствующих цен и скидок.
  var t = document.getElementById('MyGoodTable');
  var mact;
  var r = val.parentNode.parentNode.rowIndex; // номер строки
  var goodid = t.rows[r].cells[13].innerHTML;

  if(t.rows[r].cells[12].childNodes[0].checked==true){
    mact = 1;
  }
  else{
    mact = 0;
  }

  $.ajax({
    type: "POST",
    url: "scripts/upgood.php",
    data: { 
      pgoodid : goodid,
      pmact : mact,
      pactid : glactid,
    },
    async : false,
    success: function(html1) {
    }
  });
  var n = t.rows.length;
  t.deleteRow(n-1);
  TotSum();
}
/*
function MyGr(val) {// изменение цены за грамм
  var t = document.getElementById('MyGoodTable');
  var stoim, w;
  var r = val.parentNode.parentNode.rowIndex; // номер строки
  var st = t.rows[r].cells[6].childNodes[0].value;
  var n = t.rows.length;
  st = Math.round(st/100)*100;
  t.rows[r].cells[6].childNodes[0].value = st;
  w = t.rows[r].cells[4].innerHTML;
  stoim = Math.round(Number(st)*Number(w)/100)*100;
  t.rows[r].cells[7].childNodes[0].value = stoim;
  t.deleteRow(n-1);
  TotSum();
  var ng,i,done,gid;
  gid = t.rows[r].cells[12].innerHTML;
  ng = glgoods.length;
  i = 0;
  done = true;
  while((done == true)&&(i<n)){
    if (glgoods[i][1]==gid){
      done = false;
      glgoods[i][7] = t.rows[r].cells[6].childNodes[0].value;
    }
    else{
      i = i+1;
    }
  }
  SaveGr();
}

function MySum(val) {// изменение стоимости
  var t = document.getElementById('MyGoodTable');
  var stoim, w;
  var r = val.parentNode.parentNode.rowIndex; // номер строки
  w = t.rows[r].cells[4].innerHTML;
  var stoim = t.rows[r].cells[7].childNodes[0].value;

  var st = Math.round(stoim/w/100)*100;
  stoim = Math.round(st*w/100)*100;

  t.rows[r].cells[7].childNodes[0].value = stoim;
  t.rows[r].cells[6].childNodes[0].value = st;

  var n = t.rows.length;
  t.deleteRow(n-1);
  TotSum();
  var ng,i,done,gid;
  gid = t.rows[r].cells[12].innerHTML;
  ng = glgoods.length;
  i = 0;
  done = true;
  while((done == true)&&(i<n)){
    if (glgoods[i][1]==gid){
      done = false;
      glgoods[i][7] = t.rows[r].cells[6].childNodes[0].value;
    }
    else{
      i = i+1;
    }
  }
  SaveGr();
}

function SaveGr(){ // при изменение цен открывает кнопки сохранить и отменить
// сохранение цены за грамм в табл lzaloggood и фискалки в lcorpricegood
  document.getElementById('MySaveButton').setAttribute('class','but2');
  document.getElementById('MyCancelButton').setAttribute('class','but2');
}

function SaveCom(){ // сохранение измененных цен
// сохранение цены за грамм в табл lzaloggood и фискалки в lcorpricegood
  document.getElementById('MySaveButton').setAttribute('class','but1');
  document.getElementById('MyCancelButton').setAttribute('class','but1');
  var n,i,j;
  var rez = [];

  j = 0;
  n = glgoods.length;
  for (i=0;i<n;i++){
    if (glgoods[i][6]!=glgoods[i][12]){
      rez[j] = [];
      rez[j][0] = glgoods[i][1];
      rez[j][1] = glgoods[i][6];// new price
      rez[j][2] = glgoods[i][12];// old price
      rez[j][3] = glgoods[i][5];// категория магазина
      j = j+1;
    }
  }

  $.ajax({
    type: "POST",
    url: "scripts/saveprice.php",
    data: { 
      pnprice : rez,
    },
    async : false,
    success: function(html1) {
    }
  });
}

$("#MySaveButton").click(function () {
  SaveCom();
});
*/
