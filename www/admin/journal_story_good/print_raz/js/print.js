// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  var tt;
  var prnarr;
  var tarr;
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      tarr = JSON.parse(html1);
      var ruc = tarr[0];
      prnarr = tarr[1];
      var myruc = document.getElementById('MyRuc');
      myruc.innerHTML = ruc;
      var cd ="Передача имущества на ответственное хранение от " + MySqlDateToStr(prnarr[0][12])+'<br>'+'по накладной перемещения № '+prnarr[0][11];
      var zag = document.getElementById('MyPrintZag');
      zag.innerHTML = cd;
      // заполнение таблицы
      var sumw,sumst, sumseb;
      var n = prnarr.length;
      var i;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11;
      var row;
      var msum;
      sumw = 0;
      sumst = 0;
      sumseb = 0;
      for (i=0;i<n;i++){
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.className += "td1";
        cell0.innerHTML = i+1;

        cell1 = row.insertCell(1);
        cell1.className += "td1";
        cell1.innerHTML = prnarr[i][0];

        cell2 = row.insertCell(2);
        cell2.className += "cell2";
        cell2.innerHTML = prnarr[i][1];

        cell3 = row.insertCell(3);
        cell3.className += "cell3";
        cell3.innerHTML = prnarr[i][2];

        cell4 = row.insertCell(4);
        cell4.className += "cell4";
        cell4.innerHTML = prnarr[i][3];

        cell5 = row.insertCell(5);
        cell5.className += "cell5";
        cell5.innerHTML = MyFormat(prnarr[i][4]);
        sumw = MyFormat(Number(sumw)+Number(prnarr[i][4]));

        cell6 = row.insertCell(6);
        cell6.className += "cell6";
        cell6.innerHTML = prnarr[i][5];
        msum = Math.round(Number(prnarr[i][4])*Number(prnarr[i][5])/100) * 100;
        cell7 = row.insertCell(7);
        cell7.className += "cell7";
        cell7.innerHTML = msum;
        sumst = Number(sumst) + Number(msum);
        cell8 = row.insertCell(8);
        cell8.className += "cell8";
        cell8.innerHTML = prnarr[i][6];
        sumseb = Number(sumseb) + Number(prnarr[i][6]);
        cell9 = row.insertCell(9);
        cell9.className += "cell9";
        cell9.innerHTML = prnarr[i][8]+' '+MyInit(prnarr[i][7]) + MyInit(prnarr[i][9]);
        cell10 = row.insertCell(9);
        cell10.className += "cell9";
        cell10.innerHTML = prnarr[i][10];

        t.appendChild(row);
      }
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.className += "cell0";
      cell0.setAttribute("colspan", "5");
      cell0.innerHTML = 'Итого';
      cell1=row.insertCell(1);
      cell1.innerHTML = sumw;
      cell2=row.insertCell(2);
      cell3 = row.insertCell(3);
      cell3.innerHTML = sumst;
      cell4=row.insertCell(4);
      cell4.innerHTML = sumseb;
      t.appendChild(row);
      // заполнение таблицы
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
