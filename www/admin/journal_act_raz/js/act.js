window.onload = function () {
  $("#MyActNum").css({'color': 'green'});  
  var de,db;  
  var db = JournalDate(10);
  var de = JournalDate(0);
  document.getElementById("DateBeg").value=db;
  document.getElementById("DateEnd").value=de;
  document.getElementById("MyActSel").length=0;
  document.getElementById("MyGoodTable").length=0;
  ActSearch();
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
//    async: false,
    success: function(html1) {
      store = JSON.parse(html1);
    }
  });
  $.ajax({
    type: "POST",
    url: "scripts/storecat.php",
    data: { 
    },
//          async: false,
    success: function(html1) {
      storecat = JSON.parse(html1);
    }
  });
}

   

function ActSearch(){
//     $("#MyPrintButton").css("visibility","hidden");
  $("#MyPrintSel").css("visibility","hidden");
  $("#MakeBut").css("visibility","visible");
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
        opt.setAttribute("value", actisp[i][0]);
        opt.innerHTML="Акт исполнения № " + actisp[i][5]+" с пункта № " +actisp[i][4] + " от "+MySqlDateToStr(actisp[i][6]);
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
    mytabsel = t.rows[i].cells[8].childNodes[0];
    selnum = t.rows[i].cells[8].childNodes[0].value;
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
    $("#MyPrintSel").css("visibility","visible");
  }
});
// формирование печати

$("#MyPrintSel").dblclick(function(){
  var nid = document.getElementById('MyActSel').value;
  var pid = document.getElementById("MyPrintSel").value; 
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
      pnid : nid,
      ppid : pid,
    },
    async : false,
    success: function(html1) {
      window.open("http://lomstore/admin/journal_act_raz/print/");
//        window.open("http://dm.btop.kz/lomstore/www/admin/store/print/");
    }
  });
});
// формирование печати

// добавление товаров  акта в таблицу
$("#MyActSel").dblclick(function () {
  var actid = document.getElementById("MyActSel").value;
  $.ajax({
    type: "POST",
    url: "scripts/goods.php",
    data: { 
      pactid: actid,
    },
    async: false,
    success: function(html1) {
      actgoods = JSON.parse(html1);
    }
  });
      
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
      actinfo.innerHTML = "Разукомплектация № " +  actisp[iact][1]+" от "+ MySqlDateToStr(actisp[iact][2]) + " акта "+actisp[iact][3];
    }
  }
  var n = actgoods.length;
  var i;
  var t = document.getElementById("MyGoodTable");
  var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10;
  var row;
  var wcommon = 0;
  var catpr; // цена за грамм
  var summ; // стоимость
  var sw = 0; // общий вес
  for (i=0;i<n;i++){
    row = t.insertRow(t.rows.length); // Добавляем строку
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    cell3 = row.insertCell(3);
    cell4 = row.insertCell(4);
    cell5 = row.insertCell(5);
    cell6 = row.insertCell(6);
    cell7 = row.insertCell(7);
    cell8 = row.insertCell(8);
    cell9 = row.insertCell(9);
    cell10 = row.insertCell(10);
    cell11 = row.insertCell(11);
    
    cell0.innerHTML = i+1;
    cell0.className += "td2";    
    cell1.innerHTML = actgoods[i][2]; //номер билета
    cell1.className += "td3";    
    cell2.innerHTML = actgoods[i][1]; //номер товара
    cell2.className += "td3";    
    cell3.innerHTML = actgoods[i][3]; //наименование товара
    cell3.className += "td3";    
    cell4.innerHTML = actgoods[i][4]; //категория товара
    cell4.className += "td3";    
    cell5.innerHTML = MyFormat(actgoods[i][5]); //вес товара
    cell5.className += "td4";    
    sw = Number(sw)+Number(actgoods[i][5]);
    cell6.innerHTML = actgoods[i][12]; // ст. за г. при разукомп.
    cell6.className += "td4";
    var stcat = document.createElement("select"); // выбор категории
    stcat.className += "sel2";
    stcat.setAttribute("onChange", "MyRetSum(this)");
    var ic,nc;
    nc = storecat.length;
    for (ic = 0; ic < nc; ic++){ 
      if(storecat[ic][0]==actgoods[i][7]){
        var opt = document.createElement("option");
        opt.setAttribute("value", storecat[ic][1]);
        opt.innerHTML='За г '+storecat[ic][2];
        stcat.appendChild(opt);
      }
    }
    stcat.value = actgoods[i][6];

    cell7.appendChild(stcat);
    cell7.className += "td5";
    var vit = document.createElement("select"); // выбор магазина
    vit.setAttribute("onChange", "MyVitChoose(this)");
    vit.className += "sel2";
    var iv,nv;
    nv = store.length;
    for (iv = 0; iv < nv; iv++) {
      var opt = document.createElement("option");
      opt.setAttribute("value", store[iv][0]);
      opt.innerHTML=store[iv][2];
      vit.appendChild(opt);
    };
    vit.value = actgoods[i][7];
    cell8.appendChild(vit);
    cell8.className += "td3";    
    summ = Math.round(actgoods[i][5]*actgoods[i][12]/100)*100;
    cell9.innerHTML = summ; //стоимость товара
    cell9.className += "td4";    
    cell10.innerHTML = actgoods[i][8]; //себестоимость товара
    cell10.className += "td4";    
    cell11.innerHTML = actgoods[i][0]; //id товара
    cell11.className +='td1';
    t.appendChild(row);
  }
  row = t.insertRow(t.rows.length); // Добавляем строку
  cell0 = row.insertCell(0);
  cell0.setAttribute("colspan", "5");
  cell0.innerHTML = "Итого:";
  cell0.className += "td7";  
  cell1 = row.insertCell(1);         
  cell1.innerHTML = MyFormat(sw);
  cell1.className += "td8";
  cell2 = row.insertCell(2);
  cell2.setAttribute("colspan", "5");
  document.getElementById("MyActSel").setAttribute("disabled", "disabled");
});
// добавление товаров  акта в таблицу

// функции для расчета
function MyCatStoim(catnum,pval) {
  var i,sto;
  var la = storecat.length;
  for (i =0; i < la; i++) {
    if ((storecat[i][1]==catnum)&&(storecat[i][0]==pval)){
      sto = storecat[i][2];
    }
  }
  return sto;
}
// функции для расчета
function MyVitChoose(sel){ // витрины
  var nid = document.getElementById('MyActSel').value;
  var r = sel.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById("MyGoodTable");
  var oldcat = t.rows[r].cells[7].childNodes[0].value; // старая категория
  var newcat = oldcat;
  var mig = t.rows[r].cells[11].innerHTML; // id товара
  var newstore = t.rows[r].cells[8].childNodes[0].value; // новый магазин
  var stcat = t.rows[r].cells[7].childNodes[0];
  var we = t.rows[r].cells[5].innerHTML;
  stcat.length = 0;
  var ic,nc;

  nc = storecat.length;
  for (ic = 0; ic < nc; ic++){ 
    if(storecat[ic][0]==newstore){
      var opt = document.createElement("option");
      opt.setAttribute("value", storecat[ic][1]);
      opt.innerHTML='За г '+storecat[ic][2];
      stcat.appendChild(opt);
    }
  }
  stcat.value = oldcat;
  var newprice = MyCatStoim(newcat,newstore);
  t.rows[r].cells[6].innerHTML = newprice;
  var stoim = Math.round(newprice*we/100)*100;
  t.rows[r].cells[9].innerHTML = stoim;

  var n = actgoods.length;
  var done = true;
  i = 0;
  while ((done==true)&&(i<n)){
    if (actgoods[i][0]==mig){
      done = false;
      oldprice = actgoods[i][11];
      oldcat = actgoods[i][6];
      oldstore = actgoods[i][7];
    }
    else{
      i=i+1;
    }
  }
  // запись в БД изменений и фискалку
  $.ajax({
    type: "POST",
    url: "scripts/mysavefisc.php",
    data: { 
      poldprice : oldprice,
      pnewprice : newprice,
      poldcat : oldcat,
      pnewcat : newcat,
      poldstore : oldstore,
      pnewstore : newstore,
      pgid : mig,
      pnid : nid,
    },
    success: function(html1) {
    }
  });
  // запись в БД изменений и фискалку
  
}
//функция пересчета стоимости товара при изменении категории
function MyRetSum(sel) {// category
  var nid = document.getElementById('MyActSel').value;
  var i, we,suma;
  var newprice, newcat,oldprice,oldcat, oldstore, newstore;
  var r = sel.parentNode.parentNode.rowIndex; // номер строки
  var t = document.getElementById("MyGoodTable");
  var mm = t.rows[r].cells[7].childNodes[0].value; // номер категории
  var mig = t.rows[r].cells[11].innerHTML; // id товара
  var pid = t.rows[r].cells[8].childNodes[0].value; // идентификатор пункта
  // определение стоимости категории
  newprice = MyCatStoim(mm,pid);
  newcat = mm;
  newstore = pid;
  oldstore = pid;
  t.rows[r].cells[6].innerHTML = newprice; // новая стоимость

  // определение стоимости категории
  // запись в actgoods[11] цены категории
  var n = actgoods.length;
  var done = true;
  i = 0;
  while ((done==true)&&(i<n)){
    if (actgoods[i][0]==mig){
      done = false;
      oldprice = actgoods[i][11];
      oldcat = actgoods[i][6];
    }
    else{
      i=i+1;
    }
  }
  // запись в actgoods[11] цены категории
  we = t.rows[r].cells[5].innerHTML;
  suma=Math.round(Number(newprice)*Number(we)/100)*100;
  t.rows[r].cells[9].innerHTML=suma;
  
  // запись в БД изменений и фискалку
  $.ajax({
    type: "POST",
    url: "scripts/mysavefisc.php",
    data: { 
      poldprice : oldprice,
      pnewprice : newprice,
      poldcat : oldcat,
      pnewcat : newcat,
      poldstore : oldstore,
      pnewstore : newstore,
      pgid : mig,
      pnid : nid,
    },
    success: function(html1) {
    }
  });

  // запись в БД изменений и фискалку
}

