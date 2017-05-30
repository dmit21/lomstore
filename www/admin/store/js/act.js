window.onload = function () {
  $("#MySaveButton").attr('disabled',true);
  document.getElementById("MyZag").innerHTML = "Разукомплектация. Сегодня " + MySqlDateToStr(JournalDate(0));
  var de,db,mb,me;
  de = new Date();
  db = new Date();
  db.setDate(1);
  mb = MyDateToStrYMD(db);
  document.getElementById("DateBeg").value = mb;
  me = MyDateToStrYMD(de);
  document.getElementById("DateEnd").value = me;
  document.getElementById("MyActSel").length=0;
  document.getElementById("MyGoodTable").length=0;
  ActSearch();
  $.ajax({
      type: "POST",
      url: "scripts/store.php",
      data: { 
      },
//          async: false,
     success: function(html1) {
       store = JSON.parse(html1);
     }
  });
  $.ajax({
      type: "POST",
      url: "scripts/storecat.php",
      data: { 
      },
     async: false,
     success: function(html1) {
       storecat = JSON.parse(html1);

     }
  });
}

   

function ActSearch(){
     $("#MakeBut").removeAttr('disabled');
//     $("#MySaveButton").removeAttr('disabled');
     $("#MyPrintButton").css("visibility","hidden");
     $("#MyPrintSel").css("visibility","hidden");
      document.getElementById("MyActSel").removeAttribute("disabled");  
      var mb = document.getElementById("DateBeg").value;
      var me = document.getElementById("DateEnd").value;
      var actinfo = document.getElementById("MyActNum"); // название актаs
      $.ajax({
          type: "POST",
          url: "scripts/act.php",
          data: { 
            pdb: mb,
            pde: me,
          },
          async: false,
         success: function(html1) {
           actisp = JSON.parse(html1);
         }
      });
      var mtst = document.getElementById("MyGoodTable");
      var ntst = mtst.rows.length;
      var i = 1;
      while(ntst>1){
        mtst.deleteRow(i);
        ntst = ntst-1;
      }
      actinfo.innerHTML=" ";

      AddAct();
}
// добавление актов в SELECT
    function AddAct() { 
       var select = document.getElementById("MyActSel"); 
       select.length = 0;
       var i, lcount, opt;
       if(actisp != null){
       lcount=actisp.length;
       for (i = 0; i < lcount; i++) {
       	opt = document.createElement("option");
        switch (Number(actisp[i][4])){
          case 0 : opt.className += "sel0";
          break
          case 3 : opt.className += "sel1";
          break
          case 4 : opt.className += "sel2";
          break
        }
        opt.setAttribute("value", actisp[i][0]);
        opt.innerHTML=actisp[i][1]+" от "+MySqlDateToStr(actisp[i][2])+" сформировал "+actisp[i][3];
        select.appendChild(opt);
       }
     }
   }
// добавление актов в SELECT
$("#MyPrintButton").click(function () {
  var t = document.getElementById("MyGoodTable"); // это таблица товаров
  var tstrcount = t.rows.length-1;// кол-во строк в табл
  var i,j,n,done,k;
  var seltext, selnum;
  var garr = [];
  var mytabsel;
  k = 0;
  for (i=1;i<tstrcount;i++){
    mytabsel = t.rows[i].cells[7].childNodes[0];
    selnum = mytabsel.value;
    n = garr.length;
    j = 0;
    done = true;
    while ((done)&&(j<n)){
      if(garr[j][0]==selnum){
        done = false;
      }
      else{
        j = j+1;
      }
    }
    if(done==true){
      garr[k]=[];
      garr[k][0] = selnum;
      garr[k][1] = mytabsel.options[mytabsel.selectedIndex].text;
      k = k+1;
    }
  }
  var select = document.getElementById("MyPrintSel"); 
  select.length = 0;
  var i, lcount, opt;
  if(garr != null){
    lcount=garr.length;
    for (i = 0; i < lcount; i++) {
      opt = document.createElement("option");
      opt.setAttribute("value", garr[i][0]);
      opt.innerHTML=garr[i][1];
      select.appendChild(opt);
    }
  }
});
// формирование печати

$("#MyPrintSel").dblclick(function(){
  var actid = document.getElementById("MyActSel").value;
  var vitid = document.getElementById("MyPrintSel").value;
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
      pactid : actid,
      pvitid : vitid,
    },
    async : false,
    success: function(html1) {
      window.open("http://lomstore/admin/store/print/");
//        window.open("http://dm.btop.kz/lomstore/www/admin/store/print/");
    }
  });
});
// формирование печати

// добавление товаров  акта в таблицу
$("#MyActSel").dblclick(function () {
  var actid = document.getElementById("MyActSel").value;
  var i, lcount, acpr;
  lcount=actisp.length;
  for (i = 0; i < lcount; i++) {
    if(actisp[i][0]==actid){
      acpr = Number(actisp[i][4]);
    }
  }
  $.ajax({
    type: "POST",
    url: "scripts/goods.php",
    data: { 
      pactid: actid,
      pacpr: acpr,
    },
    async: false,
    success: function(html1) {
      actgoods = JSON.parse(html1);
      var mtst = document.getElementById("MyGoodTable");
      var ntst = mtst.rows.length;
      var i = 1;
      while(ntst>1){
        mtst.deleteRow(i);
        ntst = ntst-1;
      }
      var actinfo = document.getElementById("MyActNum"); // название акта
      var nact = actisp.length;
      var iact;
      for (iact=0; iact<nact; iact++){
        if (actisp[iact][0]==actid){
          actinfo.innerHTML = "Разукомплектация акта № " +  actisp[iact][1]+" от "+ MySqlDateToStr(actisp[iact][2]);
        }
      }
      var n = actgoods.length;
      var i;
      var t = document.getElementById("MyGoodTable");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
      var row;
      var wcommon = 0;
      var catpr; // цена за грамм
      var catdis; // скидка
      var summ; // стоимость
      var storenow; // текущин ID витрины
      var sw = 0; // общий вес
      var ss = 0; // общая себестоимось
      var sc = 0; // общая цена
      for (i=0;i<n;i++){
        catpr  = 0;
        catdis = 0;
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0); // № пп
        cell0.className +='td2';
        cell1 = row.insertCell(1); // КЗБ
        cell1.className +='td3';
        cell2 = row.insertCell(2); // идентификатор
        cell2.className +='td3';    
        cell3 = row.insertCell(3); // наименование
        cell3.className +='td3';    
        cell4 = row.insertCell(4); // категория
        cell4.className +='td3';    
        cell5 = row.insertCell(5); // вес
        cell5.className +='td4';    
        cell6 = row.insertCell(6); // шаблон
        cell7 = row.insertCell(7); //витрина
        cell7.className +='td4';    
        cell8 = row.insertCell(8); //скидка
        cell8.className +='td4';    
        cell9 = row.insertCell(9); //цена
        cell9.className +='td4';    
        cell10 = row.insertCell(10); // себестоимость
        cell10.className +='td3';    
        cell11 = row.insertCell(11);// id товара
        
        cell0.innerHTML = i+1;
        cell1.innerHTML = actgoods[i][2]; //номер билета
        cell2.innerHTML = actgoods[i][1]; //номер товара
        cell3.innerHTML = actgoods[i][3]; //наименование товара
        cell4.innerHTML = actgoods[i][4]; //категория товара
        cell5.innerHTML = MyFormat(actgoods[i][5]); //вес товара
        sw = Number(sw)+Number(actgoods[i][5]);
        var stcat = document.createElement("select"); // выбор шаблона
        stcat.className += "sel2";
        stcat.setAttribute("onChange", "MyRetSum(this)");
        var ic,nc;
        nc = storecat.length;
        catpr = 0;
        for (ic = 0; ic < nc; ic++){ 
          if(acpr>0) storenow = actgoods[i][7];
          else storenow = glstore;
          if(storecat[ic][1] == storenow){
            var opt = document.createElement("option");
            opt.setAttribute("value", storecat[ic][0]);
            opt.innerHTML= storecat[ic][2];
            stcat.appendChild(opt);
            if (storecat[ic][0]==actgoods[i][6]){
              catpr = storecat[ic][2];
              catdis = storecat[ic][3];
            } 
          }
        };
        stcat.value = actgoods[i][6];
        cell6.appendChild(stcat);
        summ = Math.round(actgoods[i][5]*catpr/100)*100-Math.round(actgoods[i][5]*catpr*catdis/10000)*100;
        var vit = document.createElement("select"); // выбор магазина
        vit.className += "sel2";
        vit.setAttribute("onChange", "MyChangeVit(this)");
        var iv,nv;
        nv = store.length;
        for (iv = 0; iv < nv; iv++) {
          var opt = document.createElement("option");
          opt.setAttribute("value", store[iv][0]);
          opt.innerHTML=store[iv][2];
          vit.appendChild(opt);
        };
        if(acpr>0) vit.value = actgoods[i][7];
        else vit.value = glstore;
        vit.className += "sel4";
        cell7.appendChild(vit);
        cell8.innerHTML = catdis; //стоимость товара
        sc = Number(sc) + Number(summ);
        cell9.innerHTML = catpr; //стоимость товара
        cell10.innerHTML = actgoods[i][8]; //себестоимость товара
        ss = Number(ss) + Number(actgoods[i][8]);
        cell11.innerHTML = actgoods[i][0]; //id товара
        cell11.className +='td1';
        t.appendChild(row);
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "5");
      cell0.innerHTML = "ИТОГО";
      cell1 = row.insertCell(1);         
      cell1.innerHTML = MyFormat(sw);
      document.getElementById("MyActSel").setAttribute("disabled", "disabled");
      cell2 = row.insertCell(2);
      cell2.setAttribute("colspan", "4");      
    }
  });
});
// добавление товаров  акта в таблицу

// функции для расчета
function MyCatStoim(catnum, vitnum) {
  // catnum - категория vitnum - витрина
  var i,sto = [];
  var la = storecat.length;
  for (i =0; i < la; i++) {
    if ((storecat[i][0]==catnum)&&(storecat[i][1]==vitnum)){
      sto[0] = storecat[i][2];// price
      sto[1] = storecat[i][3];// discount
    }
  }
  return sto;
}
// функции для расчета

//функция пересчета стоимости товара при изменении категории
function MyRetSum(sel) {// category
  var i,stoim, we,suma;
  var r = sel.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById("MyGoodTable");
  var mm = t.rows[r].cells[6].childNodes[0].value; // номер категории
  var mv = t.rows[r].cells[7].childNodes[0].value; // номер витрины
  var mig = t.rows[r].cells[11].innerHTML; // id товара
  var goodnum = t.rows[r].cells[2].innerHTML; // идентификатор товара
  var goodtic = t.rows[r].cells[1].innerHTML; // № КЗБ
  var gsumhand = t.rows[r].cells[10].innerHTML; // себестоимость
  var sel = document.getElementById("MyActSel").value; // id  акта исполнения  
  stoim = MyCatStoim(mm,mv);// определение стоимости категории
  we = t.rows[r].cells[5].innerHTML;// вес предмета
  suma=Math.round(Number(stoim[0])*Number(we)/100)*100-Math.round(Number(stoim[0])*Number(we)*Number(stoim[1])/10000)*100;
  t.rows[r].cells[8].innerHTML=stoim[1];
  t.rows[r].cells[9].innerHTML=suma;
  // запоминание изменений в БД
  $.ajax({
    type: "POST",
    url: "scripts/upgoodsave.php",
    data: { 
      pactid: sel,
      pprice : stoim[0],
      pdiscont : stoim[1],
      pstore : mv,
      pgoodnum : goodnum,
      pgoodtic : goodtic,
      pgsumhand : gsumhand,
      pidcatshop : mm,
      pgid : mig,
    },
    async: false,
    success: function(html1) {
    }
  });
  // запоминание изменений в БД
}
//функция пересчета стоимости товара при изменении категории

//функция изменения витрины
function MyChangeVit(sel) {// stores
  var i,n;
  var r = sel.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById("MyGoodTable");
  var mv = t.rows[r].cells[7].childNodes[0].value; // номер витрины
  var mm = t.rows[r].cells[6].childNodes[0]; // select categori's

  mm.length = 0;
  n = storecat.length;
  catpr = 0;
  for (i=0;i<n;i++){ 
    if(storecat[i][1] == mv){
      var opt = document.createElement("option");
      opt.setAttribute("value", storecat[i][0]);
      opt.innerHTML= storecat[i][2];
      mm.appendChild(opt);
    }
  };
  mm.value = 0;
  t.rows[r].cells[8].innerHTML=0;
  t.rows[r].cells[9].innerHTML=0;
}
//функция изменения витрины

// кнопка провести, добавление выбраных товаров в табл. 
$("#MakeBut").click(function () {
  $("#MakeBut").attr('disabled',true);
  $("#MySaveButton").attr('disabled',true);
  MySaveToBD(0);
});
// кнопка провести, добавление выбраных товаров в табл. 
// кнопка сохранить, сохранение данных формы.
$("#MySaveButton").click(function () {
  //MySaveToBD(2);
});
// кнопка сохранить, сохранение данных формы.

function MySaveToBD(mn){
  // mn 0 - если нажата кнопка провести, 2 - если сохранить
  var sel = document.getElementById("MyActSel").value; // id  акта исполнения
  var t = document.getElementById("MyGoodTable"); // это таблица товаров
  var tstrcount = t.rows.length-1;// кол-во строк в табл
  var i,n;
  var garr = [];
  var stgr;
  var done = true;
  // проверка на заполнение таблицы

  i = 1;
  while((done==true)&&(i<tstrcount)){
    if (t.rows[i].cells[8].innerHTML == 0) {
      done = false;
    }
    else{
    	i = i+1;
    }
  }
  // проверка на заполнение таблицы
  if (done == true) {
    $.ajax({
      type: "POST",
      url: "scripts/goodtostor.php",
      data: { 
        psel: sel,
        pmn : mn,
      },
      async: false,
      success: function(html1) {
      }
    });
    if (mn == 0) {
      $("#MyPrintButton").css("visibility","visible");
      $("#MyPrintSel").css("visibility","visible");
    };
  }
  else {
    alert("Заполните поле Стоимость за грамм");
  }

}
