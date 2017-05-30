// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var rez = JSON.parse(html1);
      document.getElementById("Adres").innerHTML = 'Адрес: ' + rez[0];
      document.getElementById("Phone").innerHTML = 'Телефон: ' + rez[1];
      document.getElementById("MyZag").innerHTML = rez[2] + "<br> Авансовый отчет на дату " + MySqlDateToStr(rez[3]);
      document.getElementById("OsumDay").innerHTML = rez[4];
      document.getElementById("Prih").innerHTML = rez[5];
      document.getElementById("SumRas").innerHTML =  rez[6]; 
      document.getElementById("SumProd").innerHTML = rez[7];
      document.getElementById("OsumEnd").innerHTML = rez[8];
      document.getElementById("Name").innerHTML = rez[9];
      if (rez[10]>0) {
        document.getElementById("CorP").innerHTML = Math.abs(rez[10]);
      }
      else {
        document.getElementById("CorM").innerHTML = Math.abs(rez[10]);
      }
      document.getElementById("VozGood").innerHTML = rez[12];
      if( Math.round(rez[11] - rez[8])!=0) {
        document.getElementById("MyAlert").innerHTML = "Внимание! Расчетные базовые значения остатка не совпадают! Обратитесь к разработчикам.";  
      }
    }
  });
  window.open("http://lomstore/admin");
}

// ЗАПОЛНЯЕМ ПЕЧАТНУЮ ФОРМУ
