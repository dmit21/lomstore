// ЗАПОЛНЯМ ФОРМУ ПРИХОДНОГО ОРДЕРА

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/order.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      if (html1 == '1') {
        window.location.assign("http://lomstore/user/");  
      }
      else {
        var ord = JSON.parse(html1);
        document.getElementById("MyEntOrd").innerHTML = "Приходный кассовый ордер № " + ord[0] + " от " + MySqlDateToStr(ord[2]);
        document.getElementById("UserName").innerHTML = "Принял: " + ord[1];
      }
    }
  });
}


// ЗАПОЛНЯМ ФОРМУ ПРИХОДНОГО ОРДЕРА

// КНОПКА ПРОВЕСТИ

$("#ProvestiButton").click(function () {
  $("#ProvestiButton").attr('disabled',true);
  var mysum = document.getElementById("MySum").value;
  if (mysum!="0") {
    $.ajax({
      type: "POST",
      url: "scripts/provesti.php",
      data: {
        psum : mysum,
      },
      async: false,
      success: function(html1) {
        window.location.assign("http://lomstore/user/enter_order_new/print");
      }
    });
  }
  else {
    document.getElementById("NoSum").innerHTML = "Введите сумму!";
    $("#NoSum").css({"color" : "red"});
  }   
});

// КНОПКА ПРОВЕСТИ