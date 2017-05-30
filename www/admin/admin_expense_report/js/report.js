// ЗАГРУЗКА ФОРМЫ АВАНСОВОГО ОТЧЕТА

window.onload = function () {
  document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины.';
  $("#MyStoreName").css({'color': 'green'});
  StoreSearch();
}

// ЗАГРУЗКА ФОРМЫ АВАНСОВОГО ОТЧЕТА

// КНОПКА СФОРМИРОВАТЬ

$("#MyRepButton").click(function () {
  var mydate = document.getElementById('MyDate').value
  $.ajax({
    type: "POST",
    url: "scripts/report.php",
    data: {
      pmydate:mydate, 
      pvid : glvitid,
    },
    success: function(html1) {
      window.location.assign("http://lomstore/admin/admin_expense_report/print/");
    }
  });
});


// КНОПКА СФОРМИРОВАТЬ

// СОЗДАНИЕ СПИСКА ВИТРИН

function StoreSearch(){
  var sel = document.getElementById("MyGoodSel");
  sel.length=0;
  $.ajax({
    type: "POST",
    url: "scripts/store.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      var store = rez[0];
      glvitid = 100000;
      document.getElementById('MyDate').value = rez[1];
      var n = store.length;
      var i;
      opt = document.createElement("option");
      opt.setAttribute("value", 100000);
      opt.innerHTML="Все";
      sel.appendChild(opt);

      for (i = 0;i<n;i++){
        opt = document.createElement("option");
        opt.setAttribute("value", store[i][0]);
        opt.innerHTML=store[i][2];
        sel.appendChild(opt);
      }
    }
  });
}

// СОЗДАНИЕ СПИСКА ВИТРИН

// ВЫБОР ВИТРИНЫ
$("#MyGoodSel").dblclick(function () {
  var si = document.getElementById('MyGoodSel').selectedIndex;
  if (si == 0) {
    document.getElementById('MyStoreName').innerHTML = 'Выбраны все витрины';
  }
  else {
    document.getElementById('MyStoreName').innerHTML = document.getElementById('MyGoodSel').options[si].innerHTML;
  }
  glvitid = document.getElementById('MyGoodSel').value;
});
// ВЫБОР ВИТРИНЫ
