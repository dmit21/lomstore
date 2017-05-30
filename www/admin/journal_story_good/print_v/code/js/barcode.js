// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ

window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/code.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var bar = JSON.parse(html1);
      var forprint = bar[4];
      document.getElementById("NumTic").innerHTML = 'Упаковочный талон к КЗБ № ' + bar[0] + ' от ' + MySqlDateToStr(bar[1]);
      var table = document.getElementById("MyBarTab"); // Получаем ссылку на таблицу
      var n = forprint.length;
      var i;
      var row, cell0, cell1, cell2, cell3; 
      var k, k1, k2, code,mid, block;
      for (i=0;i<n;i++){
        row = table.insertRow(table.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell0.innerHTML = forprint[i][0];
        cell0.className += "td2";
        cell1.innerHTML = forprint[i][1];
        cell1.className += "td2";
        cell2.innerHTML = MyFormat(forprint[i][2]);
        cell2.className += "td3";
        mid = "MyBarcode"+String(i);
        block = document.createElement("div"); // Ввод файла
        block.setAttribute("id", mid);
        cell3.appendChild(block);
        k=bar[5].length;
        k1 = forprint[i][8];
        k1=String(k1).length;
        k2=12-Number(k)-Number(k1);
        code=String(bar[5]) + InSymToStr('0', k2) + String(forprint[i][8]);
        $("#"+mid).barcode(code, "ean13",{barWidth:1, barHeight:10});

      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell1.setAttribute("colspan", "3");
      cell0.innerHTML = "От имени Товарищества";
      cell1.innerHTML = bar[2];
      cell1.className += "td3";
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell1.setAttribute("colspan", "3");
      cell0.innerHTML = "Заемщик/Залогодатель";
      cell1.innerHTML = bar[3];
      cell1.className += "td3";
    }

  });
}

