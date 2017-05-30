window.onload = function () {
  document.getElementById('DateBeg').value = JournalDate(0);
  var db = document.getElementById('DateBeg').value;
  document.getElementById("MyZag").innerHTML = "Корректировка цен. Сегодня " + MySqlDateToStr(JournalDate(0));  
  MyVit();
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});  
  $.ajax({
    type: "POST",
    url: "scripts/goodstore.php",
    data: {
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      glstgoods = rez[0];
      glcat = rez[1];
      glnac = rez[2];
      MyMakeTable(0);
    }
  });
}

function MyVit() {
  var ms = document.getElementById('MyStore');
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: {
    },
    success: function(html1) {
      var store = JSON.parse(html1);
      glstore = store;
      var ms = document.getElementById('MyStore');
      var n,i;
      n = glstore.length;
      opt = document.createElement("option");
      opt.setAttribute("value", 0);
      opt.innerHTML="Все";
      ms.appendChild(opt);
      for(i=0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", glstore[i][0]);
        opt.innerHTML=glstore[i][2];
        ms.appendChild(opt);
      }
    }
  });
  ms.value = 0;
  glstorename = "Все витрины";

}

$("#MyStore").dblclick(function () {// выбор витрины
  var si = document.getElementById('MyStore').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
    glstorename = "Все витрины";
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Выбрана витрина: '+document.getElementById('MyStore').options[si].innerHTML;
    glstorename = document.getElementById('MyStore').options[si].innerHTML;
  }
  glvit = document.getElementById('MyStore').value;
  MyClearTable();
  MyMakeTable(glvit);
});


function MyMakeTable(val){
  var n = glstgoods.length;
  var i;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var row;
  var stoim, price, discont;
  for (i=0;i<n;i++){
    if (val==0){
      row = t.insertRow(t.rows.length); // Добавляем строку
      if (glstgoods[i][9] == 1) {
        row.className += "tr1";
        cell0 = row.insertCell(0);// номер по порядку
        cell0.className += "td2";      
        cell1 = row.insertCell(1);// идентификатор
        cell1.className +='td3';      
        cell2 = row.insertCell(2);// наименование
        cell2.className +='td3';      
        cell3 = row.insertCell(3);// категория ломбарда
        cell3.className +='td4';      
        cell4 = row.insertCell(4);// вес
        cell4.className +='td4';      
        cell5 = row.insertCell(5);// категория
        cell5.className +='td3';      
        cell6 = row.insertCell(6);// цена за г
        cell6.className +='td4';
        cell7 = row.insertCell(7);// скидка
        cell7.className +='td4';
        cell8 = row.insertCell(8);// стоимость
        cell8.className +='td4';
        cell9 = row.insertCell(9);// витрина
        cell9.className +='td3';      
        cell10 = row.insertCell(10);// идентиф товара
        cell11 = row.insertCell(11);// идентиф витрины
        cell0.innerHTML = i+1;
        cell1.innerHTML = glstgoods[i][1];
        cell2.innerHTML = glstgoods[i][2];
        cell3.innerHTML = glstgoods[i][10];
        cell4.innerHTML = MyFormat(glstgoods[i][3]);
        var stcat = document.createElement("select"); // выбор категории
        stcat.className += "sel2";
        stcat.setAttribute("onChange", "MyChangeCat(this)");
        var ic,nc;
        nc = glcat.length;
        for (ic = 0; ic < nc; ic++){ 
        	if(glcat[ic][0]==glstgoods[i][7]){
	          var opt = document.createElement("option");
	          opt.setAttribute("value", glcat[ic][1]);
	          opt.innerHTML=glcat[ic][2]+' (за г '+glcat[ic][3]+')';
	          stcat.appendChild(opt);
        	}
        };
        stcat.value = glstgoods[i][4];
        cell5.appendChild(stcat);
        price = document.createElement("input"); 
        price.setAttribute("type", "number");
        price.setAttribute("step", "100");
        price.setAttribute("onChange", "MyPriceChange(this)");
        price.setAttribute("onkeypress", "MyreturnSumBeg(this)");
        price.value = glstgoods[i][5];
        price.className += "input1";
        cell6.appendChild(price);
        discont = document.createElement("input"); 
        discont.setAttribute("type", "number");
        discont.setAttribute("step", "1");
        discont.setAttribute("onChange", "MyDisChange(this)");
        discont.setAttribute("onkeypress", "MyDisBeg(this)");
        discont.value = glstgoods[i][8];
        discont.className += "input1";
        cell7.appendChild(discont);
        stoim = Math.round(glstgoods[i][3]*glstgoods[i][5]*(1 - glstgoods[i][8]/100)/100)*100;
        cell8.innerHTML = stoim;
        cell9.innerHTML = glstgoods[i][6];
        cell10.innerHTML = glstgoods[i][0];
        cell10.className += "td1";
        cell11.innerHTML = glstgoods[i][7];
        cell11.className += "td1";
        t.appendChild(row);
      }
      else {
        row.className += "tr2";
        cell0 = row.insertCell(0);// номер по порядку
        cell0.className += "td2";      
        cell1 = row.insertCell(1);// идентификатор
        cell1.className +='td3';      
        cell2 = row.insertCell(2);// наименование
        cell2.className +='td3';      
        cell3 = row.insertCell(3);// категория ломбарда
        cell3.className +='td4';      
        cell4 = row.insertCell(4);// вес
        cell4.className +='td4';      
        cell5 = row.insertCell(5);// категория
        cell5.className +='td3';      
        cell6 = row.insertCell(6);// цена за г
        cell6.className +='td4';
        cell7 = row.insertCell(7);// скидка
        cell7.className +='td4';
        cell8 = row.insertCell(8);// стоимость
        cell8.className +='td4';
        cell9 = row.insertCell(9);// витрина
        cell9.className +='td3';      
        cell10 = row.insertCell(10);// идентиф товара
        cell11 = row.insertCell(11);// идентиф витрины
        cell0.innerHTML = i+1;
        cell1.innerHTML = glstgoods[i][1];
        cell2.innerHTML = glstgoods[i][2];
        cell3.innerHTML = glstgoods[i][10];
        cell4.innerHTML = MyFormat(glstgoods[i][3]);
        var stcat = document.createElement("select"); // выбор категории
        stcat.className += "sel2";
        stcat.setAttribute("onChange", "MyChangeCat(this)");
        var ic,nc;
        nc = glcat.length;
        for (ic = 0; ic < nc; ic++){ 
        	if(glcat[ic][0]==glstgoods[i][7]){
	          var opt = document.createElement("option");
	          opt.setAttribute("value", glcat[ic][1]);
	          opt.innerHTML=glcat[ic][2]+' (за г '+glcat[ic][3]+')';
	          stcat.appendChild(opt);
        	}
        };
        stcat.value = glstgoods[i][4];
        cell5.appendChild(stcat);
        price = document.createElement("input"); 
        price.setAttribute("type", "number");
        price.setAttribute("step", "100");
        price.setAttribute("onChange", "MyPriceChange(this)");
        price.setAttribute("onkeypress", "MyreturnSumBeg(this)");
        price.value = glstgoods[i][5];
        price.className += "input1";
        cell6.appendChild(price);
        discont = document.createElement("input"); 
        discont.setAttribute("type", "number");
        discont.setAttribute("step", "1");
        discont.setAttribute("onChange", "MyDisChange(this)");
        discont.setAttribute("onkeypress", "MyDisBeg(this)");
        discont.value = glstgoods[i][8];
        discont.className += "input1";
        cell7.appendChild(discont);
        stoim = Math.round(glstgoods[i][3]*glstgoods[i][5]*(1 - glstgoods[i][8]/100)/100)*100;
        cell8.innerHTML = stoim;
        cell9.innerHTML = glstgoods[i][6];
        cell10.innerHTML = glstgoods[i][0];
        cell10.className += "td1";
        cell11.innerHTML = glstgoods[i][7];
        cell11.className += "td1";
        t.appendChild(row);
      }
    }
    else{
      if (glstgoods[i][7]==val){
        row = t.insertRow(t.rows.length); // Добавляем строку
        if (glstgoods[i][9] == 1) {
          row.className += "tr1";
          cell0 = row.insertCell(0);// номер по порядку
          cell0.className += "td2";      
          cell1 = row.insertCell(1);// идентификатор
          cell1.className +='td3';      
          cell2 = row.insertCell(2);// наименование
          cell2.className +='td3';      
          cell3 = row.insertCell(3);// категория ломбарда
          cell3.className +='td4';      
          cell4 = row.insertCell(4);// вес
          cell4.className +='td4';      
          cell5 = row.insertCell(5);// категория
          cell5.className +='td3';      
          cell6 = row.insertCell(6);// цена за г
          cell6.className +='td4';
          cell7 = row.insertCell(7);// скидка
          cell7.className +='td4';
          cell8 = row.insertCell(8);// стоимость
          cell8.className +='td4';
          cell9 = row.insertCell(9);// витрина
          cell9.className +='td3';      
          cell10 = row.insertCell(10);// идентиф товара
	        cell11 = row.insertCell(11);// идентиф витрины
          cell0.innerHTML = i+1;
          cell1.innerHTML = glstgoods[i][1];
          cell2.innerHTML = glstgoods[i][2];
          cell3.innerHTML = glstgoods[i][10];
          cell4.innerHTML = MyFormat(glstgoods[i][3]);
          var stcat = document.createElement("select"); // выбор категории
          stcat.className += "sel2";
          stcat.setAttribute("onChange", "MyChangeCat(this)");
          var ic,nc;
          nc = glcat.length;
	        for (ic = 0; ic < nc; ic++){ 
	        	if(glcat[ic][0]==glstgoods[i][7]){
		          var opt = document.createElement("option");
		          opt.setAttribute("value", glcat[ic][1]);
		          opt.innerHTML=glcat[ic][2]+' (за г '+glcat[ic][3]+')';
		          stcat.appendChild(opt);
	        	}
	        };
          stcat.value = glstgoods[i][4];
          cell5.appendChild(stcat);
          price = document.createElement("input"); 
          price.setAttribute("type", "number");
          price.setAttribute("step", "100");
          price.setAttribute("onChange", "MyPriceChange(this)");
          price.setAttribute("onkeypress", "MyreturnSumBeg(this)");
          price.value = glstgoods[i][5];
          price.className += "input1";
          cell6.appendChild(price);
          discont = document.createElement("input"); 
          discont.setAttribute("type", "number");
          discont.setAttribute("step", "1");
          discont.setAttribute("onChange", "MyDisChange(this)");
          discont.setAttribute("onkeypress", "MyDisBeg(this)");
          discont.value = glstgoods[i][8];
          discont.className += "input1";
          cell7.appendChild(discont);
          stoim = Math.round(glstgoods[i][3]*glstgoods[i][5]*(1 - glstgoods[i][8]/100)/100)*100;
          cell8.innerHTML = stoim;
          cell9.innerHTML = glstgoods[i][6];
          cell10.innerHTML = glstgoods[i][0];
          cell10.className += "td1";
          cell11.innerHTML = glstgoods[i][7];
          cell11.className += "td1";
          t.appendChild(row);
        }
        else {
          row.className += "tr2";
          cell0 = row.insertCell(0);// номер по порядку
          cell0.className += "td2";      
          cell1 = row.insertCell(1);// идентификатор
          cell1.className +='td3';      
          cell2 = row.insertCell(2);// наименование
          cell2.className +='td3';      
          cell3 = row.insertCell(3);// категория ломбарда
          cell3.className +='td4';      
          cell4 = row.insertCell(4);// вес
          cell4.className +='td4';      
          cell5 = row.insertCell(5);// категория
          cell5.className +='td3';      
          cell6 = row.insertCell(6);// цена за г
          cell6.className +='td4';
          cell7 = row.insertCell(7);// скидка
          cell7.className +='td4';
          cell8 = row.insertCell(8);// стоимость
          cell8.className +='td4';
          cell9 = row.insertCell(9);// витрина
          cell9.className +='td3';      
          cell10 = row.insertCell(10);// идентиф товара
          cell11 = row.insertCell(11);// идентиф витрины
          cell0.innerHTML = i+1;
          cell1.innerHTML = glstgoods[i][1];
          cell2.innerHTML = glstgoods[i][2];
          cell3.innerHTML = glstgoods[i][10];
          cell4.innerHTML = MyFormat(glstgoods[i][3]);
          var stcat = document.createElement("select"); // выбор категории
          stcat.className += "sel2";
          stcat.setAttribute("onChange", "MyChangeCat(this)");
          var ic,nc;
          nc = glcat.length;
	        for (ic = 0; ic < nc; ic++){ 
	        	if(glcat[ic][0]==glstgoods[i][7]){
		          var opt = document.createElement("option");
		          opt.setAttribute("value", glcat[ic][1]);
		          opt.innerHTML=glcat[ic][2]+' (за г '+glcat[ic][3]+')';
		          stcat.appendChild(opt);
	        	}
	        };
          stcat.value = glstgoods[i][4];
          cell5.appendChild(stcat);
          price = document.createElement("input"); 
          price.setAttribute("type", "number");
          price.setAttribute("step", "100");
          price.setAttribute("onChange", "MyPriceChange(this)");
          price.setAttribute("onkeypress", "MyreturnSumBeg(this)");
          price.value = glstgoods[i][5];
          price.className += "input1";
          cell6.appendChild(price);
          discont = document.createElement("input"); 
          discont.setAttribute("type", "number");
          discont.setAttribute("step", "1");
          discont.setAttribute("onChange", "MyDisChange(this)");
          discont.setAttribute("onkeypress", "MyDisBeg(this)");
          discont.value = glstgoods[i][8];
          discont.className += "input1";
          cell7.appendChild(discont);
          stoim = Math.round(glstgoods[i][3]*glstgoods[i][5]*(1 - glstgoods[i][8]/100)/100)*100;
          cell8.innerHTML = stoim;
          cell9.innerHTML = glstgoods[i][6];
          cell10.innerHTML = glstgoods[i][0];
          cell10.className += "td1";
          cell11.innerHTML = glstgoods[i][7];
          cell11.className += "td1";
          t.appendChild(row);
        }
      }
    }
  }
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

$("#MyPrnButton").click(function () {
  var db = document.getElementById('DateBeg').value;
  $.ajax({
    type: "POST",
    url: "scripts/forprint.php",
    data: { 
      pnid : glnac,
      pdate : db,
    },
    async: false,
    success: function(html1) {
      window.open("http://lomstore/admin/change_price/print/");
    }
  });
});


//функция пересчета стоимости товара при изменении категории
function MyChangeCat(sel) {// category
  var i, price, stoim, weight, we,suma;
  var r = sel.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById("MyGoodTable");
  var mm = t.rows[r].cells[5].childNodes[0].value; // номер категории
  var mv = t.rows[r].cells[11].innerHTML; // id витрины
  var mig = t.rows[r].cells[10].innerHTML; // id товара
  
  price = MyCatStoim(mm,mv); // определение стоимости и скидки категории
  weight = Number(t.rows[r].cells[4].innerHTML);
  t.rows[r].cells[6].childNodes[0].value = price[0]; 
  t.rows[r].cells[7].childNodes[0].value = price[1]; 
  stoim = Math.round(Number(weight)*Number(price[0])/100)*100 - Math.round(Number(weight)*Number(price[0])*Number(price[1])/10000)*100;
  t.rows[r].cells[8].innerHTML = stoim;
  
  // определение текущих значений
  var n = glstgoods.length;
  var done = true;
  var numi = 0;
  i = 0;
  while((done==true)&&(i<n)){
    if(glstgoods[i][0]==mig){
      done = false;
    }
    else{
      i = i+1;
    }
  }
  // определение текущих значений

  $.ajax({
    type: "POST",
    url: "scripts/savechange.php",
    data: { 
      pnid : glnac,
      pgid : mig,
      poldprice : glstgoods[i][5],
      pnewprice : price[0],
      poldcat : glstgoods[i][4],
      pnewcat : mm,
      polddiscont : glstgoods[i][8],
      pnewdiscont : price[1],
      psnact : 2,
    },
    async: false,
    success: function(html1) {
    }
  });
}
//функция пересчета стоимости товара при изменении категории

// функции для расчета
function MyCatStoim(catnum,vitnum) {
  var i,sto = [];
  var la = glcat.length;
  for (i =0; i < la; i++) {
    if ((glcat[i][1]==catnum)&&(glcat[i][0]==vitnum)){
      sto[0] = glcat[i][3];
      sto[1] = glcat[i][4];
    }
  }
  return sto;
}
// функции для расчета

function MyPriceChange(sel) { // изменение цены за грамм
  var  price, stoim, weight, discont;
  var r = sel.parentNode.parentNode.rowIndex; 
  var t = document.getElementById("MyGoodTable");
  var mig = t.rows[r].cells[10].innerHTML; // id товара
  var mm = t.rows[r].cells[5].childNodes[0].value; // номер категории
  price = t.rows[r].cells[6].childNodes[0].value;
  price = Math.round(Number(price)/100)*100;
  t.rows[r].cells[6].childNodes[0].value = price; 
  weight = Number(t.rows[r].cells[4].innerHTML);
  discont = Math.round(Number(t.rows[r].cells[7].childNodes[0].value));
  stoim = Math.round(Number(weight)*Number(price)/100)*100 - Math.round(Number(weight)*Number(price)*Number(discont)/10000)*100;
  t.rows[r].cells[8].innerHTML = stoim;

  // определение текущих значений
  var n = glstgoods.length;
  var done = true;
  i = 0;
  while((done==true)&&(i<n)){
    if(glstgoods[i][0]==mig){
      done = false;
    }
    else{
      i = i+1;
    }
  }
  // определение текущих значений

  $.ajax({
    type: "POST",
    url: "scripts/savechange.php",
    data: { 
      pnid : glnac,
      pgid : mig,
      poldprice : glstgoods[i][5],
      pnewprice : price,
      poldcat : glstgoods[i][4],
      pnewcat : mm,
      polddiscont : glstgoods[i][8],
      pnewdiscont : discont,
      psnact : 1,
    },
    async: false,
    success: function(html1) {
    }
  });
}
function MyDisChange(sel) { // изменение скидки на товар
  var  price, stoim, weight, discont;
  var r = sel.parentNode.parentNode.rowIndex; 
  var t = document.getElementById("MyGoodTable");
  var mig = t.rows[r].cells[10].innerHTML; // id товара
  var mm = t.rows[r].cells[5].childNodes[0].value; // номер категории
  discont = t.rows[r].cells[7].childNodes[0].value;
  discont = Math.round(discont);
  t.rows[r].cells[7].childNodes[0].value = discont; 
  weight = Number(t.rows[r].cells[4].innerHTML);
  price = Math.round(Number(t.rows[r].cells[6].childNodes[0].value));
  stoim = Math.round(Number(weight)*Number(price)/100)*100 - Math.round(Number(weight)*Number(price)*Number(discont)/10000)*100;
  t.rows[r].cells[8].innerHTML = stoim;

  // определение текущих значений
  var n = glstgoods.length;
  var done = true;
  i = 0;
  while((done==true)&&(i<n)){
    if(glstgoods[i][0]==mig){
      done = false;
    }
    else{
      i = i+1;
    }
  }
  // определение текущих значений

  $.ajax({
    type: "POST",
    url: "scripts/savechange.php",
    data: { 
      pnid : glnac,
      pgid : mig,
      poldprice : glstgoods[i][5],
      pnewprice : price,
      poldcat : glstgoods[i][4],
      pnewcat : mm,
      polddiscont : glstgoods[i][8],
      pnewdiscont : discont,
      psnact : 1,
    },
    async: false,
    success: function(html1) {
    }
  });
}


$("#MySaveButton").click(function () {
	var db = document.getElementById('DateBeg').value;
  $.ajax({
    type: "POST",
    url: "scripts/save.php",
    data: { 
      pnid : glnac,
      pdb : db,
    },
    async: false,
    success: function(html1) {
      alert("Ваше желание исполненно!");
    }
  });
});
