window.onload = function () {
  document.getElementById("MyGoodTable").rows.length=1;
  document.getElementById("MyZag").innerHTML = "Инвентаризация. Сегодня " + MySqlDateToStr(JournalDate(0));
  StoreSearch();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});  
}

function StoreSearch(){
  var sel = document.getElementById("MyGoodSel");
  var stid;
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
    }
  });
  var n = glstore.length;
  var i;
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
  opt = document.createElement("option");
  opt.setAttribute("value",0);
  opt.innerHTML="Не разукомплектованное имущество";
  sel.appendChild(opt);
  document.getElementById("MyGoodSel").value = 100000;
  glstid = document.getElementById("MyGoodSel").value;
  AddTable(glstid);
}

function AddTable(num){
  var gid, gid1;
  MyClearTable();
  //document.getElementById('MyItog').innerHTML = '';
  $.ajax({
    type: "POST",
    url: "scripts/goodfromstore.php",
    data: { 
      pnum: num,
    },
    async: false,
    success: function(html1) {
      if(html1!='null'){
        glgoods = JSON.parse(html1);
        var t = document.getElementById("MyGoodTable");
        var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
        var n = glgoods.length;
        var j,nc,done,ic,k=1;
        var sumw, sums, sumss,sumst;
        sumw = 0;
        sums = 0;
        sumss = 0;
        var vitr='';
        for (i=0;i<n;i++){
          if(vitr!=glgoods[i][5]){
            vitr=glgoods[i][5];
            k=1;
          }
          else{
            k = k+1;
          }
          var row = t.insertRow(t.rows.length); // Добавляем строку
          cell0 = row.insertCell(0); // № по порядку
          cell0.className +='td2';
          cell1 = row.insertCell(1); // номер билета
          cell1.className +='td3';
          cell2 = row.insertCell(2); // номер товара
          cell2.className +='td3';
          cell3 = row.insertCell(3); // наименование товара
          cell3.className +='td3';
          cell4 = row.insertCell(4); // категория товара
          cell4.className +='td3';
          cell5 = row.insertCell(5); // вес товара
          cell5.className +='td4';
          cell6 = row.insertCell(6); // стоимость за гр товара
          cell6.className +='td4';
          cell7 = row.insertCell(7); // стоимость
          cell7.className +='td4';
          cell8 = row.insertCell(8); // себестоимость
          cell8.className +='td4';
          cell9 = row.insertCell(9); // магазин
          cell9.className +='td3';
          cell10 = row.insertCell(10); // id товара
          cell0.innerHTML = k;
          cell1.innerHTML = glgoods[i][7];
          cell2.innerHTML = glgoods[i][2];
          cell3.innerHTML = glgoods[i][1];
          cell4.innerHTML = glgoods[i][6];
          cell5.innerHTML = MyFormat(glgoods[i][4]);
          sumw = Number(sumw)+Number(glgoods[i][4]);
          cell6.innerHTML = glgoods[i][3] ;
          sumst = Math.round(glgoods[i][3]*glgoods[i][4]/100)*100;
          cell7.innerHTML = sumst;
          sums = Number(sums)+Number(sumst);
          cell8.innerHTML = glgoods[i][8];
          sumss = Number(sumss)+Number(glgoods[i][8]);
          cell9.innerHTML = glgoods[i][5];
          cell10.innerHTML = glgoods[i][0];
          cell10.className +='td1';
          t.appendChild(row);
        }
        row = t.insertRow(t.rows.length);
        cell0 = row.insertCell(0);
        cell0.setAttribute("colspan", "5");
        cell0.innerHTML = "Итого:";
        cell0.className +='td5';
        cell1 = row.insertCell(1);
        cell1.innerHTML = MyFormat(sumw);
        cell1.className +='td4';
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell3.innerHTML = sums;
        cell3.className +='td2';
        cell4 = row.insertCell(4);
        cell4.innerHTML = sumss;
        cell4.className +='td4';
        cell5 = row.insertCell(5);
        document.getElementById("MyItog").innerHTML = "Итого: <br> Себестоимость: " + sumss +  "<br> Общий вес: " + MyFormat(Number(sumw)) +  "<br> Общая стоимость: " + sums;
      }
      else alert('Нет данных');
    }
  });
}

// добавление товаров  акта в таблицу
$("#MakeSearch").click(function () {
  var t = document.getElementById("MyGoodTable");
  var nt = t.rows.length;
  var i, mystr,mysum,myc,mystic,mysgood;
  for(i=1;i<nt;i++){
    $(t.rows[i]).css("color","black");
  }
  var myss = document.getElementById("MyNam").value.trim();
  var mysb = document.getElementById("MyNumBeg").value;
  var myse = document.getElementById("MyNumEnd").value;
  var myst = document.getElementById("MyTic").value;
  var mysg = document.getElementById("MyGood").value;
  if(myss!='') myc = 1; else myc = 0;
  if((mysb!='')&&(myse!='')) myc = myc+2; else myc = myc+0;
  if(myst!='') myc = 4; else myc = myc+0;
  if(mysg!='') myc = 5; else myc = myc+0;
  for(i=1;i<nt;i++){
    mystr = t.rows[i].cells[3].innerHTML.trim();
    mysum = t.rows[i].cells[7].childNodes[0].value;
    mystic = t.rows[i].cells[1].innerHTML.trim();
    mysgood = t.rows[i].cells[2].innerHTML.trim();
    switch (myc) {
      case 0 : 
      break;
      case 1: if(mystr.indexOf(myss)>=0) $(t.rows[i]).css("color","red");
      break;
      case 2: if((Number(mysb)<=Number(mysum))&&(Number(myse)>=Number(mysum))) $(t.rows[i]).css("color","red");
      break;
      case 3: if((Number(mysb)<=Number(mysum))&&(Number(myse)>=Number(mysum))&&(mystr.indexOf(myss)>=0)) $(t.rows[i]).css("color","red");
      break;
      case 4: if(mystic.indexOf(myst)>=0) $(t.rows[i]).css("color","red");
      break;
      case 5: if(mysgood.indexOf(mysg)>=0) $(t.rows[i]).css("color","red");
      break;
    }
  }
});
// добавление товаров  акта в таблицу


// выбор витрины
$("#MyGoodSel").dblclick(function () {
  var si = document.getElementById('MyGoodSel').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = document.getElementById('MyGoodSel').options[si].innerHTML;
  }
  glstid = document.getElementById("MyGoodSel").value;
  AddTable(glstid);
});
// выбор витрины

$("#MyPrn").click(function () {
  MySaveCom();
  // кнопка печать, через аякс записываем в сессию все необходимое и вызываем форму печати
  var si = document.getElementById('MyGoodSel').selectedIndex;
  var snt;
  if (si==-1){
    snt = 'все витрины';
  }
  else{
    snt = document.getElementById('MyGoodSel').options[si].innerHTML;
  }
  var t = document.getElementById("MyGoodTable");
  var nt = t.rows.length;
  if (nt>2){
    $.ajax({
      type: "POST",
      url: "scripts/forprn.php",
      data: { 
        psid : glstid,
        pvi  : snt,
      },
      async : false,
      success: function(html1) {
        //window.open("http://dm.btop.kz/lomstore/www/admin/goods/print/");
        window.open("http://lomstore/admin/goods/print/");
      }
    });
  }
});

function MyClearTable(){
  var mtst = document.getElementById("MyGoodTable");
  var ntst = mtst.rows.length;
  while(ntst>1){
    mtst.deleteRow(1);
    ntst = ntst-1;
  }
}

function TotSum(){
  var n = glgoods.length;
  var i;
  var sumw, sumst, sumsb;
  sumw = 0;
  sumst = 0;
  sumsb = 0;
  for (i=0;i<n;i++){
    sumw = Number(sumw)+Number(glgoods[i][4]);
    sumsb = Number(sumsb)+Number(glgoods[i][8]);
    sumst = Number(sumst)+Math.round(Number(glgoods[i][4]*Number(glgoods[i][3])/100))*100;
  }
  var t = document.getElementById("MyGoodTable");
  var row;
  var cell0, cell1, cell2, cell3, cell4, cell5;
  var nt = t.rows.length;
  t.deleteRow(nt-1);
  row = t.insertRow(t.rows.length);
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "5");
  cell0.innerHTML = "Итого:";
  cell0.className +='td5';
  cell1 = row.insertCell(1);
  cell1.innerHTML = MyFormat(sumw);
  cell1.className +='td4';
  cell2 = row.insertCell(2);
  cell3 = row.insertCell(3);
  cell3.innerHTML = sumst;
  cell3.className +='td2';
  cell4 = row.insertCell(4);
  cell4.innerHTML = sumsb;
  cell4.className +='td4';
  cell5 = row.insertCell(5);

  //document.getElementById('MyItog').innerHTML = '    Вес всего '+MyFormat(sumw)+'; сум. стоим '+sumst+'; сум сб. '+sumsb;
}

function MyChSt(val){// изменили сумму
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[10].innerHTML;
  var n = glgoods.length;
  var i, done;
  var st = table.rows[RowNum].cells[7].childNodes[0].value;

  done = true;
  i=0;
  while((done==true)&&(i<n)){
    if (glgoods[i][0]==ng){
      done = false;
    }
    else{
      i = i+1;
    }
  }
  glgoods[i][3] = Math.round(Number(st)/Number(glgoods[i][4])/100)*100;
  st = Math.round(Number(glgoods[i][3])*Number(glgoods[i][4])/100)*100;
  table.rows[RowNum].cells[7].childNodes[0].value = st;
  table.rows[RowNum].cells[6].childNodes[0].value = glgoods[i][3];
  TotSum();
  SaveGr();
}

function MyChGr(val){// изменили цену за грамм
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[10].innerHTML;
  var n = glgoods.length;
  var i, done, st;
  var gr = table.rows[RowNum].cells[6].childNodes[0].value;
  gr = Math.round(gr/100)*100;
  done = true;
  i=0;
  while((done==true)&&(i<n)){
    if (glgoods[i][0]==ng){
      done = false;
    }
    else{
      i = i+1;
    }
  }
  glgoods[i][3] = gr;
  st = Math.round(Number(glgoods[i][3])*Number(glgoods[i][4])/100)*100;
  table.rows[RowNum].cells[7].childNodes[0].value = st;
  table.rows[RowNum].cells[6].childNodes[0].value = gr;
  TotSum();
  SaveGr();
}

function SaveGr(){ // сохранение цены за грамм в табл lzaloggood и фискалки в lcorpricegood
  document.getElementById('MySave').setAttribute('class','but2');
  document.getElementById('MyCancel').setAttribute('class','but2');
}

function MySaveCom(){
  var n,i,j;
  var rez = [];
  n = glgoods.length;
  j = 0;
  for (i=0;i<n;i++){
    if(glgoods[i][3]!=glgoods[i][9]){
      rez[j] = [];
      rez[j][0] = glgoods[i][0];
      rez[j][1] = glgoods[i][3];
      rez[j][2] = glgoods[i][9];
      j = j+1;
      glgoods[i][9] = glgoods[i][3];
    }
  }
  if (j!=0){
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
  document.getElementById('MySave').setAttribute('class','but1');
  document.getElementById('MyCancel').setAttribute('class','but1');
}

$("#MySave").click(function () { // сохранение цены за грамм в табл lzaloggood и фискалки в lcorpricegood
  MySaveCom();
});

$("#MyCancel").click(function () {
  var n, i;
  var actid = document.getElementById("MyGoodSel").value;
  n = glgoods.length;
  for (i=0;i<n;i++){
    glgoods[i][3] = glgoods[i][9];
  }
  AddTable(actid);
  document.getElementById('MySave').setAttribute('class','but1');
  document.getElementById('MyCancel').setAttribute('class','but1');
  TotSum();
});