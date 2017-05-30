// ЗАГРУЗКА ФОРМЫ АВАНСОВОГО ОТЧЕТА

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/checkdate.php",
    data: {
    },
    success: function(html1) {
      var mydate = html1;
      document.getElementById('MyDate').value = mydate;
    }
  });
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
      },
      success: function(html1) {
        window.location.assign("http://lomstore/admin/opt_report/print/");
      }
    });
});


// КНОПКА СФОРМИРОВАТЬ