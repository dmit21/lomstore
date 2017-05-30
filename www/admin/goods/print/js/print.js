// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  var tt;
  var prnarr;
  var tarr;
  var vname;
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      tarr = JSON.parse(html1);
      var ruc = tarr[0];
      prnarr = tarr[1];
      vname = tarr[2];

      var cd ="Инвентаризация от " + MySqlDateToStr(tarr[3]);
      var zag = document.getElementById('MyPrintZag');
      zag.innerHTML = cd;
      document.getElementById('MyShop').innerHTML = vname;
      var myruc = document.getElementById('MyRuc');
      myruc.innerHTML = ruc;
      // заполнение таблицы
      var sumw, sumst1, sumst2;
      var n = prnarr.length;
      var i;
      var t = document.getElementById("MyGoodTab");
      var cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9;
      var row;
      var msum;
      var numshop;
      var stoim;
      sumw = 0;
      sumst1 = 0;
      sumst2 = 0;
      sumwv = 0;
      sumst1v = 0;
      sumst2v = 0;
      numshop = prnarr[0][5];
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "9");
      cell0.className += "td1";
      cell0.innerHTML = numshop;
      t.appendChild(row);
      k = 1;
      for (i=0;i<n;i++){
        if(numshop!=prnarr[i][5]){
          row = t.insertRow(t.rows.length); // Добавляем строку
          cell0 = row.insertCell(0);
          cell0.setAttribute("colspan", "5");
          cell0.innerHTML = "ИТОГО по "+numshop;
          cell0.className += "td1";
          cell1 = row.insertCell(1);         
          cell1.innerHTML = MyFormat(sumwv);
          cell2 = row.insertCell(2);         
          cell2.innerHTML = '';
          cell3 = row.insertCell(3);         
          cell3.innerHTML = sumst1v;
          cell4 = row.insertCell(4);         
          cell4.innerHTML = sumst2v;
          t.appendChild(row);
          numshop = prnarr[i][5];
          row = t.insertRow(t.rows.length); // Добавляем строку
          cell0 = row.insertCell(0);
          cell0.setAttribute("colspan", "9");
          cell0.className += "td1";
          cell0.innerHTML = numshop;
          t.appendChild(row);
          sumwv = 0;
          sumst1v = 0;
          sumst2v = 0;
          k=1;
        }
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell0.innerHTML = k;
        k = k+1;

        cell1 = row.insertCell(1);
        cell1.className += "td2";
        cell1.innerHTML = prnarr[i][7];

        cell2 = row.insertCell(2);
        cell2.className += "td2";
        cell2.innerHTML = prnarr[i][2];

        cell3 = row.insertCell(3);
        cell3.innerHTML = prnarr[i][1];

        cell4 = row.insertCell(4);
        cell4.innerHTML = prnarr[i][6];

        cell5 = row.insertCell(5);
        cell5.innerHTML = prnarr[i][4];
        sumw = Number(sumw)+Number(prnarr[i][4]);
        sumwv = Number(sumwv)+Number(prnarr[i][4]);

        cell6 = row.insertCell(6);
        cell6.innerHTML = prnarr[i][3];

        stoim = Math.round(prnarr[i][3]*prnarr[i][4]/100)*100;
        cell7 = row.insertCell(7);
        cell7.innerHTML = stoim;
        sumst1 = Number(sumst1)+Number(stoim);
        sumst1v = Number(sumst1v)+Number(stoim);

        cell8 = row.insertCell(8);
        cell8.innerHTML = prnarr[i][8];
        sumst2 = Number(sumst2)+Number(prnarr[i][8]);
        sumst2v = Number(sumst2v)+Number(prnarr[i][8]);

        t.appendChild(row);
      }
      // заполнение таблицы
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "5");
      cell0.innerHTML = "ИТОГО по "+numshop;
      cell0.className += "td1";
      cell1 = row.insertCell(1);         
      cell1.innerHTML = MyFormat(sumwv);
      cell2 = row.insertCell(2);         
      cell2.innerHTML = '';
      cell3 = row.insertCell(3);         
      cell3.innerHTML = sumst1v;
      cell4 = row.insertCell(4);         
      cell4.innerHTML = sumst2v;
      t.appendChild(row);
      row = t.insertRow(t.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell0.setAttribute("colspan", "5");
      cell0.innerHTML = "ИТОГО ";
      cell0.className += "td1";
      cell1 = row.insertCell(1);         
      cell1.innerHTML = MyFormat(sumw);
      cell2 = row.insertCell(2);         
      cell2.innerHTML = '';
      cell3 = row.insertCell(3);         
      cell3.innerHTML = sumst1;
      cell4 = row.insertCell(4);         
      cell4.innerHTML = sumst2;
      t.appendChild(row);
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
