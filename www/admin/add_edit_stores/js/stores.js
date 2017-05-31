window.onload = function () {
  $("#MyEdit").attr('disabled',true);
  $("#MyEdit").css('color','gray');
  StoreSel();
}

// заполнение селекта с магазинами

function StoreSel(){
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      glstore = JSON.parse(html1);
    }
  });
  var i,n;
  var sel = document.getElementById("MySelStores");
  var opt;
  sel.length = 0;
  n = glstore.length;
  for(i=0;i<n;i++){
    opt = document.createElement("option");
    opt.setAttribute("value", glstore[i][0]);
    opt.innerHTML=glstore[i][2];
    sel.appendChild(opt);
  }
}

// заполнение селекта с магазинами

// привязка магазина

$("#MyConnect").click(function () {
  var sel = document.getElementById("MySelStores").value;
  var si = document.getElementById("MySelStores").selectedIndex;
  $.ajax({
    type: "POST",
    url: "scripts/priv.php",
    data: { 
      psel : sel,
    },
    async: false,
    success: function(html1) {
      if (sel==3) {
        document.getElementById("MyPriv").innerHTML = "Привязаны " + document.getElementById("MySelStores").options[si].innerHTML
        $(".paragraph2").css({"color" : "green"});
      }
      else {
        document.getElementById("MyPriv").innerHTML = "Привязана " + document.getElementById("MySelStores").options[si].innerHTML 
        $(".paragraph2").css({"color" : "green"});
      }
    }
  });
});

// привязка магазина

// заполнение формы добавления редактирования магазина
// 1 - добавление магазина
// 2 - редактирование магазина

function MyAddEdStor(par){ 
  $(".block1").css({"visibility" : "visible"});
  $(".block4").css({"visibility" : "hidden"});
  gladded = par;
  switch (gladded){
    case 1:
      document.getElementById('MyNumber').value = '';
      document.getElementById('MyName').value = '';
      document.getElementById('MyAdres').value = '';
      document.getElementById('MyPhone').value = '';
    break;
    case 2:
      glsnum = document.getElementById('MySelStores').value;
      var i,n;
      n = glstore.length;
      for(i=0;i<n;i++){
        if(glstore[i][0]==glsnum){
          document.getElementById('MyNumber').value = glstore[i][1];
          document.getElementById('MyName').value = glstore[i][2];
          document.getElementById('MyAdres').value = glstore[i][3];
          document.getElementById('MyPhone').value = glstore[i][4];
        }
      }
    break;
  }
}

// заполнение формы добавления редактирования магазина

//добавить магазин

$("#MyAdd").click(function () {
  $("#ListBlock").css('visibility','hidden');
  MyAddEdStor(1);
});

//добавить магазин

//редактировать магазин

$("#MyEdit").click(function () {
  $("#ListBlock").css('visibility','hidden');
  MyAddEdStor(2);
});

//редактировать магазин

// закрыть форму редактирования. дообавления

$("#MyClose").click(function () {
  $("#ListBlock").css('visibility','visible');
  $(".block1").css({"visibility" : "hidden"});
  $(".block4").css({"visibility" : "visible"});
  document.getElementById('MyNumber').value = '';
  document.getElementById('MyName').value = '';
  document.getElementById('MyAdres').value = '';
  document.getElementById('MyPhone').value = '';
});

// закрыть форму редактирования. дообавления

// сохранить данные редактирования. дообавления

$("#MySave").click(function () {
  $("#ListBlock").css('visibility','visible');
  $.ajax({
    type: "POST",
    url: "scripts/savestore.php",
    data: { 
      pidnum : glsnum,
      padded : gladded,
      psnum : document.getElementById('MyNumber').value,
      psname : document.getElementById('MyName').value,
      psadres : document.getElementById('MyAdres').value,
      psphone : document.getElementById('MyPhone').value,
    },
    async: false,
    success: function(html1) {
    }
  });
  document.getElementById('MyNumber').value = '';
  document.getElementById('MyName').value = '';
  document.getElementById('MyAdres').value = '';
  document.getElementById('MyPhone').value = '';
  StoreSel();
});

// сохранить данные редактирования. дообавления

// ВЫБОР ВИТРИНЫ ИЗ СПИСКА ВИТРИН

$("#MySelStores").dblclick(function () {
  $("#MyEdit").removeAttr('disabled');
  $("#MyEdit").css('color','black');
  var sid = document.getElementById('MySelStores').value;
  var si = document.getElementById('MySelStores').selectedIndex;
  if (sid == 3) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны '+document.getElementById('MySelStores').options[si].innerHTML;
    $(".paragraph2").css({"color" : "green"});
  }
  else {
    document.getElementById('MyStoreName').innerHTML = 'Выбрана '+document.getElementById('MySelStores').options[si].innerHTML;
    $(".paragraph2").css({"color" : "green"});
  } 
});

// ВЫБОР ВИТРИНЫ ИЗ СПИСКА ВИТРИН