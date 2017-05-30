window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Продажи. Сегодня " + MySqlDateToStr(JournalDate(0));
  glact = -1;
  var rez;
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      glsact = rez[0];
      glgoods = rez[1];
      glsgoods = rez[2];
      // формируем select для актов продажи
      var sel1 = document.getElementById('MySaleAct');
      sel1.length=0;
      var opt1;
      var i,n;
      if(glsact!=null){
        n = glsact.length;
        for (i=0;i<n;i++){
          opt1 = document.createElement("option");
          opt1.setAttribute("value", glsact[i][0]);
          opt1.innerHTML='Акт № '+glsact[i][2] + ' от '+MySqlDateToStr(glsact[i][1]);
          sel1.appendChild(opt1);
        }
      }
      else {
        opt1 = document.createElement("option");
        opt1.setAttribute("value", 0);
        opt1.innerHTML='Нет актов!';
        sel1.appendChild(opt1);
        glac = 0;
      }
      // формируем select для актов продажи
      // проверка на существование доступных для продажи товаров
      if(glgoods==null){
        alert('Нет доступных для продажи товаров.');
      }
      // проверка на существование доступных для продажи товаров
    }
  });
}

$("#MyCreateAct").click(function () {
  $.ajax({
    type: "POST",
    url: "scripts/myinsact.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      var n;
      var sel1 = document.getElementById('MySaleAct');
      if (glsact!=null){
        n = glsact.length;
      }
      else{
        n = 0;
        sel1.length = 0;
        glsact = [];
      }
      glsact[n] = [];
      glsact[n][0] = rez[0];
      glsact[n][1] = rez[1];
      glsact[n][2] = rez[2];
      var opt1;
      opt1 = document.createElement("option");
      opt1.setAttribute("value", glsact[n][0]);
      opt1.innerHTML='Акт № '+glsact[n][2] + ' от '+MySqlDateToStr(glsact[n][1]);
      sel1.appendChild(opt1);
      document.getElementById('MySaleNum').innerHTML = 'Формируется Акт № '+glsact[n][2] + ' от '+MySqlDateToStr(glsact[n][1]);
      glact = glsact[n][0];
    }
  });
});

$("#MySaleAct").dblclick(function () {
  var sel = document.getElementById("MySaleAct");
  glact = sel.value;
  if (glact!=0) {
    var si = document.getElementById('MySaleAct').selectedIndex;
    document.getElementById('MySaleNum').innerHTML = 'Формируется '+document.getElementById('MySaleAct').options[si].innerHTML;
    if (glsgoods!=null) {
      AddToMyGoodTable();
    }
  }  
});


function AddToMyGoodTable(){
  var t = document.getElementById('MyGoodTable');
  var i,n;
  // очистка таблицы
  n = t.rows.length;
  for(i=(n-1);i>0;i--){
    t.deleteRow(i);
  }
  // очистка таблицы

  // заполнение таблицы товарами
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var row, inp;
  var tcon;
  var sseb,sw,sst,sop,stoim;
  n = glsgoods.length;
  tcon = 1;
  for(i=0;i<n;i++){
    if (glsgoods[i][10]==glact){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // номер по порядку
      cell0.className += "td2";
      cell1 = row.insertCell(1); // номер товара
      cell1.className += "td3";
      cell2 = row.insertCell(2); // наименование
      cell3 = row.insertCell(3); // себестоимость
      cell4 = row.insertCell(4); // вес
      cell5 = row.insertCell(5); // за грамм
      cell6 = row.insertCell(6); // стоимость
      cell7 = row.insertCell(7); // к оплате
      cell8 = row.insertCell(8); // кнопка удалить
      cell9 = row.insertCell(9); // id товара
      cell0.innerHTML = tcon;
      cell1.innerHTML = glsgoods[i][2];
      cell2.innerHTML = glsgoods[i][1];
      cell3.innerHTML = glsgoods[i][8];
      cell4.innerHTML = MyFormat(glsgoods[i][4]);
      inp = document.createElement("input"); 
      inp.setAttribute("type", "number");
      inp.setAttribute("onChange", "MySum(this)");
      inp.className += "input2";
      inp.value = glsgoods[i][5];
      cell5.appendChild(inp);
      stoim = Math.round(glsgoods[i][4]*glsgoods[i][5]/100)*100;
      cell6.innerHTML = stoim;
      inp = document.createElement("input"); 
      inp.setAttribute("type", "number");
      inp.setAttribute("onChange", "MySum1(this)");
      inp.className += "input2";
      inp.value = glsgoods[i][9];
      cell7.appendChild(inp);
      var clnbtn = document.createElement("button");
      clnbtn.setAttribute("type", "button");
      clnbtn.setAttribute("onclick", "DeleteGood(this)");
      var info = document.createElement("i");
      info.className += "fa fa-trash-o";
      clnbtn.appendChild(info);
      cell8.appendChild(clnbtn);
      cell9.innerHTML = glsgoods[i][0];
      cell9.className +='td1'
      t.appendChild(row);
      tcon = tcon+1;
    }
  }
  // заполнение таблицы товарами
// общая сумма
  var sseb,sw,sst,sop,stoim;

  sseb = 0;
  sw = 0;
  sst = 0;
  sop = 0;
  n = glsgoods.length;
  for(i=0;i<n;i++){
    if (glsgoods[i][10]==glact){
      sseb = Number(sseb)+Number(glsgoods[i][8]);
      sw = Number(sw)+Number(glsgoods[i][4]);
      sst = Number(sst)+Math.round(Number(glsgoods[i][4])*Number(glsgoods[i][5])/100)*100;
      sop = Number(sop)+Number(glsgoods[i][9]);
    }
  }
  // сумма по товарам
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.className += "cell0";
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого";
  cell1 = row.insertCell(1);
  cell1.innerHTML = sseb;
  cell2 = row.insertCell(2);
  cell2.innerHTML = MyFormat(sw);
  cell3 = row.insertCell(3);
  cell4 = row.insertCell(4);
  cell4.className += "cell0";
  cell4.innerHTML = sst;
  cell5 = row.insertCell(5);
  cell5.className += "cell0";
  cell5.innerHTML = sop;
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br> Себестоимость: " + sseb +  "<br> Общий вес: " + MyFormat(Number(sw))
                                                +  "<br> Общая стоимость: " + sst+  "<br> Всего к оплате: " + sop;
// общая сумма

}

function MySum(val){
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var weight = Number(table.rows[RowNum].cells[4].innerHTML);
  var price = Number(table.rows[RowNum].cells[5].childNodes[0].value);
  price = Math.round(price/100)*100;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var done,n,i;
  var stoim = Math.round(weight*price/100)*100;
  n = glsgoods.length;
  done = true;
  i=0;
  while((done==true)&&(i<n)){
    if(glsgoods[i][0]==ng){
      glsgoods[i][5]=price;
      glsgoods[i][9]=stoim;
      done = false;
      $.ajax({
        type: "POST",
        url: "scripts/upprice.php",
        data: { 
          png : ng,
          pprice : price,
          pstoim : stoim,
        },
        async: false,
        success: function(html1) {
        }
      });
    }
    else{
      i = i+1;
    }
  }
  table.rows[RowNum].cells[5].childNodes[0].value = price;
  table.rows[RowNum].cells[6].innerHTML = stoim;
  table.rows[RowNum].cells[7].childNodes[0].value = stoim;
  TotSum(1);
}

function MySum1(val){
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var stoim = Number(table.rows[RowNum].cells[7].childNodes[0].value);
  var price;
  stoim = Math.round(stoim/100)*100;
  table.rows[RowNum].cells[7].childNodes[0].value = stoim;
  var done,n,i;
  n = glsgoods.length;
  done = true;
  i=0;
  while((done==true)&&(i<n)){
    if(glsgoods[i][0]==ng){
      price = glsgoods[i][5];
      glsgoods[i][9]=stoim;
      done = false;
      $.ajax({
        type: "POST",
        url: "scripts/upprice.php",
        data: { 
          png : ng,
          pprice : price,
          pstoim : stoim,
        },
        async: false,
        success: function(html1) {
        }
      });
    }
    else{
      i = i+1;
    }
  }
  TotSum(1);
}



function TotSum(val){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sseb,sw,sst,sop,stoim;

  sseb = 0;
  sw = 0;
  sst = 0;
  sop = 0;
  n = glsgoods.length;
  for(i=0;i<n;i++){
    if (glsgoods[i][10]==glact){
      sseb = Number(sseb)+Number(glsgoods[i][8]);
      sw = Number(sw)+Number(glsgoods[i][4]);
      sst = Number(sst)+Math.round(Number(glsgoods[i][4])*Number(glsgoods[i][5])/100)*100;
      sop = Number(sop)+Number(glsgoods[i][9]);
    }
  }
  if (val == 1) {
    t.deleteRow(t.rows.length-1);
  }
  // сумма по товарам
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.className += "cell0";
  cell0.setAttribute("colspan", "3");
  cell0.innerHTML = "Итого";
  cell1 = row.insertCell(1);
  cell1.innerHTML = sseb;
  cell2 = row.insertCell(2);
  cell2.innerHTML = MyFormat(sw);
  cell3 = row.insertCell(3);
  cell4 = row.insertCell(4);
  cell4.className += "cell0";
  cell4.innerHTML = sst;
  cell5 = row.insertCell(5);
  cell5.className += "cell0";
  cell5.innerHTML = sop;
  t.appendChild(row);
  document.getElementById("MyItog").innerHTML = "Итого: <br> Себестоимость: " + sseb +  "<br> Общий вес: " + MyFormat(Number(sw))
                                                +  "<br> Общая стоимость: " + sst+  "<br> Всего к оплате: " + sop;
  // сумма по товарам
}


$("#MyGoodSearch").click(function () {// добавление товаров  акта в таблицу
//  document.getElementById('MySaveButton').setAttribute('class','but2');
  if (glact>0) {
    var goodnum = document.getElementById("MyGoodNum").value;
    var i,n,done,donev, tobuy, stoim, ng, j;
    n = glgoods.length;
    i = 0;
    done = true;
    donev = true;
    while ((done==true)&&(i<n)){
      if ((glgoods[i][2]==goodnum)&&(glgoods[i][7]!=7)){
        done = false;
        glgoods[i][7] = 7;
        if (glsgoods!=null) {
          j = glsgoods.length;
        }
        else{
          j = 0;
          glsgoods = [];
        } 
        glsgoods[j] = [];
        ng = glgoods[i][0];
        glsgoods[j][0] = ng;
        glsgoods[j][1] = glgoods[i][1];
        glsgoods[j][2] = glgoods[i][2];
        glsgoods[j][3] = glgoods[i][3];
        glsgoods[j][4] = glgoods[i][4];
        glsgoods[j][5] = 0;
        glsgoods[j][8] = glgoods[i][8];
        glsgoods[j][9] = 0;
        glsgoods[j][10] = glact;
      }
      else{
        i = i+1;
      }
    }
    if (done!=true){
      $.ajax({
        type: "POST",
        url: "scripts/adddelgood.php",
        data: { 
          paid : glact,
          png :ng,
          pad : 1,
        },
        async: false,
        success: function(html1) {
        }
      });
      AddToMyGoodTable();
      TotSum(1);
    }
    else{
      alert('Товар не найден или уже выбран');
    }
  }
  else {
    alert('Не выбран акт');
  }
});

function DeleteGood(val){
//  document.getElementById('MySaveButton').setAttribute('class','but2');
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var n = glgoods.length;
  var i,done;
  done = true;
  i = 0;
  while ((i<n)&&(done==true)){
    if (glgoods[i][0]==ng){
      done=false;
      glgoods[i][7]=4;
    }
    else{
      i = i+1;
    }
  }
  n = glsgoods.length;
  done = true;
  i = 0;
  while ((i<n)&&(done==true)){
    if (glsgoods[i][0]==ng){
      done=false;
      glsgoods.splice(i,1);
    }
    else{
      i = i+1;
    }
  }
  $.ajax({
    type: "POST",
    url: "scripts/adddelgood.php",
    data: { 
      paid : glact,
      png :ng,
      pad : 0,
    },
    async: false,
    success: function(html1) {
    }
  });
  AddToMyGoodTable();
}

$("#MyProvestiButton").click(function () {
  $.ajax({
    type: "POST",
    url: "scripts/goodsalesave.php",
    data: { 
      paid : glact,
    },
    async: false,
    success: function(html1) {
    }
  });
  document.getElementById('MyPrintButton').setAttribute('class','but3');  
});

$("#MyCloseButton").click(function () {
//  TotSave(0);
  window.location.assign("http://lomstore/admin/");
});

$("#MyPrintButton").click(function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: {
      psactid : glact,
    },
    async: false,
    success: function(html1) {
    }
  });
  window.open("http://lomstore/admin/admin_goods_sale/print/");
});
