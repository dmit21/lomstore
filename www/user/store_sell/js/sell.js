window.onload = function () {
  document.getElementById("MyZag").innerHTML = "Продажа. Сегодня " + MySqlDateToStr(JournalDate(0));
  var rez;
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      if (html1!='null'){
        var tarr = JSON.parse(html1);
        glsgoods = tarr[0];
        glgoods = tarr[1];
        AddToMyGoodTable();
        TotSum();
      }
      else{
        alert('На пункте нет товаров для продажи.');
      }
    }
  });
}

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
  var row;
  var tcon;
  var sw,sst,sop,stoim;
  if(glsgoods!=null){
    sw = 0;
    sst = 0;
    sop = 0;
    n = glsgoods.length;
    tcon = 1;
    for(i=0;i<n;i++){
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0); // номер по порядку
      cell0.className +='td2';
      cell1 = row.insertCell(1); // номер товара
      cell1.className +='td3';
      cell2 = row.insertCell(2); // наименование
      cell2.className +='td3';
      cell3 = row.insertCell(3); // вес
      cell3.className +='td4';
      cell4 = row.insertCell(4); // за грамм
      cell4.className +='td4';
      cell5 = row.insertCell(5); // стоимость
      cell5.className +='td4';
      cell6 = row.insertCell(6); // скидка
      cell6.className +='td4';
      cell7 = row.insertCell(7); // к оплате
      cell7.className +='td4';
      cell8 = row.insertCell(8); // кнопка удалить
      cell8.className +='td2';
      cell9 = row.insertCell(9); // id товара
      cell0.innerHTML = tcon;
      cell1.innerHTML = glsgoods[i][2];
      cell2.innerHTML = glsgoods[i][1];
      cell3.innerHTML = MyFormat(glsgoods[i][4]);
      sw = Number(sw)+Number(glsgoods[i][4]);
      cell4.innerHTML = glsgoods[i][5];
      stoim = Math.round(Number(glsgoods[i][4])*Number(glsgoods[i][5])/100)*100;
      cell5.innerHTML = stoim;
      sst = Number(sst)+Number(stoim);
      cell6.innerHTML = glsgoods[i][6];
      var inp = document.createElement("input");
      inp.setAttribute("type", "number");
      inp.setAttribute("step", "1000");
      inp.setAttribute("onChange", "MySum(this)");
      inp.setAttribute("ondblclick", "MyStGood(this)");
      inp.className += "input2";
      inp.value = glsgoods[i][9];
      sop = Number(sop)+Number(glsgoods[i][9]);
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
    // заполнение таблицы товарами
  }
}
function TotSum(){
  var t = document.getElementById('MyGoodTable');
  var n,i;
  var sw,sst,sop,stoim;
  if(glsgoods!=null){
    sw = 0;
    sst = 0;
    sop = 0;
    n = glsgoods.length;
    for(i=0;i<n;i++){
      sw = Number(sw)+Number(glsgoods[i][4]);
      sst = Number(sst)+Math.round(Number(glsgoods[i][4])*Number(glsgoods[i][5])/100)*100;
      sop = Number(sop)+Number(glsgoods[i][9]);
    }
    // сумма по товарам
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);
    cell0.className += "td5";
    cell0.setAttribute("colspan", "3");
    cell0.innerHTML = "Итого:";
    cell1 = row.insertCell(1);
    cell1.innerHTML = MyFormat(sw);
    cell1.className += "td6";
    cell2 = row.insertCell(2);
    cell3 = row.insertCell(3);
    cell3.className += "td6";
    cell3.innerHTML = sst;
    cell4 = row.insertCell(4);
    cell5 = row.insertCell(5);
    cell5.className += "td6";
    cell5.innerHTML = sop;
    cell6 = row.insertCell(6);
    t.appendChild(row);
    document.getElementById("MyItog").innerHTML = "Итого: <br>Общий вес: " + MyFormat(Number(sw)) +  "<br> Общая сумма к оплате: " + sop;
    // сумма по товарам
  }
}


$("#MyGoodSearch").click(function () {// добавление товаров  акта в таблицу
  var goodnum = document.getElementById("MyGoodNum").value;
  var i,n,done,donev, tobuy, stoim,ng;
  var nn;
  if(glgoods!=null){
    n = glgoods.length;
    i = 0;
    done = true;
    while ((done==true)&&(i<n)){
      if ((glgoods[i][2]==goodnum)&&(glgoods[i][7]!=7)){
        done = false;
        glgoods[i][7] = 7;
        if(glsgoods==null){
          glsgoods = [];
          glsgoods[0] = glgoods[i];
        }
        else{
          glsgoods.push(glgoods[i]);
        }
        stoim = Math.round(Number(glgoods[i][4])*Number(glgoods[i][5])/100)*100;
        tobuy = Number(stoim)-Number(stoim)*Number(glgoods[i][6]/100);
        tobuy = Math.round(tobuy/100)*100;
        ng = glgoods[i][0];
        glgoods.splice(i,1);

        nn = glsgoods.length;
        glsgoods[nn-1][9] = tobuy;
      }
      else{
        i = i+1;
      }
    }
    if (done!=true){
      AddToMyGoodTable();
      TotSum();
  //    TotSave();
      MyAddDelSale(1,ng,tobuy);
    }
    else{
      alert('Товар не найден или уже выбран');
    }
  }
});

function TotSave(val1, val2, val3){// запись в БД изменение продажной цены на произвольную
	// val1 - id goods
	// val2 - new price
	// val3 - old price
  $.ajax({
    type: "POST",
    url: "scripts/upprice.php",
    data: { 
      pgid : val1,
      pns : val2,
      polds : val3, 
    },
    async: false,
    success: function(html1) {
    }
  });
}

function MySum(val){
//  document.getElementById('MySaveButton').setAttribute('class','but2');  
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ns = table.rows[RowNum].cells[7].childNodes[0].value;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var done,n,i, oldns;
  n = glsgoods.length;
  done = true;
  i=0;
  ns = Math.round(Number(ns)/100)*100;
  while((done==true)&&(i<n)){
    if(glsgoods[i][0]==ng){
      oldns = glsgoods[i][9];
      glsgoods[i][9]=ns;
      done = false;
    }
    else{
      i = i+1;
    }
  }
  table.rows[RowNum].cells[7].childNodes[0].value = ns;
  table.deleteRow(table.rows.length-1);
  TotSum();
  TotSave(ng,ns,oldns);
}

$("#MySaveButton").click(function () {
  document.getElementById('MySaveButton').setAttribute('class','but1');
//  TotSave();
});



$("#MyCloseButton").click(function () {
//  TotSave();
  window.location.assign("http://lomstore/user/");
});

function DeleteGood(val){
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var n = glsgoods.length;
  var i,done;
  done = true;
  i = 0;
  while ((i<n)&&(done==true)){
    if (glsgoods[i][0]==ng){
      done=false;
      glsgoods[i][7] = 4;
      glsgoods[i][9] = 0;

      if(glgoods!=null){
        glgoods.push(glsgoods[i]);
      }
      else{
        glgoods = [];
        glgoods[0] = glsgoods[i];
      }
      glsgoods.splice(i,1);
    }
    else{
      i = i+1;
    }
  }
  AddToMyGoodTable();
  TotSum();
  MyAddDelSale(0,ng,0)
}



function MyStGood(val){// возвращает первоначальную цену продажи
  var table = document.getElementById("MyGoodTable");
  var RowNum = val.parentNode.parentNode.rowIndex;
  var ng = table.rows[RowNum].cells[9].innerHTML;
  var done,n,i, tobuy, oldprice, stoim;
  n = glsgoods.length;
  done = true;
  i=0;
  while((done==true)&&(i<n)){
    if(glsgoods[i][0]==ng){
      stoim = Math.round(Number(glsgoods[i][4])*Number(glsgoods[i][5])/100)*100;
      tobuy = Number(stoim)-Number(stoim)*Number(glsgoods[i][6]/100);
      tobuy = Math.round(tobuy/100)*100;
      oldprice = glsgoods[i][9];
      glsgoods[i][9] = tobuy;
      done = false;
    }
    else{
      i = i+1;
    }
  }
  table.rows[RowNum].cells[7].childNodes[0].value = tobuy;
  table.deleteRow(table.rows.length-1);
  TotSum();
  TotSave(ng,tobuy,oldprice);
}

function MyAddDelSale(val1,val2,val3){// удаление добавление записей в lsaleacttogood
  //val1 - 0 - удалить запись, 1 - добавить запись
  // val2 goodid добавляемого, удаляемого товара
  // продажная цена если добавляем запись, 0 - если удаляем
  $.ajax({
    type: "POST",
    url: "scripts/adddelgood.php",
    data: { 
      pad : val1,
      pgoodid : val2,
      pgsale : val3,
    },
    async: false,
    success: function(html1) {
    }
  });
}

$("#MyProvestiButton").click(function () {
  document.getElementById('MyPrintButton').setAttribute('class','but3');  
});

$("#MyPrintButton").click(function () {
  window.open("http://lomstore/user/store_sell/print/");

});
