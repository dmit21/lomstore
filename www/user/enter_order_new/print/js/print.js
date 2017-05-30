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
      document.getElementById("MName").innerHTML = 'ТОО "Ломбардия" витрина № ' + ord[8];
      document.getElementById("MAdres").innerHTML = "Адрес: " + ord[0];
      document.getElementById("MPhone").innerHTML = "Телефон: " + ord[1];
      document.getElementById("Prih").innerHTML = "Служебный приход №" + ord[2] + " от " + MySqlDateToStr(ord[3]);
      document.getElementById("MySum").innerHTML = ord[4];
      document.getElementById("FunSum").innerHTML = "Сумма " + MoneyToString(Number(ord[5]));
      document.getElementById("UserName").innerHTML = ord[7];
      window.open("http://lomstore/user/"); 
    }
  });
}

// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ
