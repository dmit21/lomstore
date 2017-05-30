// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ 

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var ord = JSON.parse(html1);
      document.getElementById("MName").innerHTML = ord[0];
      document.getElementById("MAdres").innerHTML = "Адрес: " + ord[1];
      document.getElementById("MPhone").innerHTML = "Телефон: " + ord[2];
      document.getElementById("Ras").innerHTML = "Служебный расход № " + ord[3] + " от " + MySqlDateToStr(ord[5]);
      document.getElementById("MySum").innerHTML = ord[6];
      document.getElementById("FunSum").innerHTML ="Сумма " + MoneyToString(Number(ord[6]));
      document.getElementById("UserName").innerHTML = ord[4];
      window.open("http://lomstore/admin/"); 
    }
  });
}

// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ
