// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ  

window.onload = function MyPrint() {
  $.ajax({
    type: "POST",
    url: "scripts/forprn.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var arr = JSON.parse(html1);
      document.getElementById('StNum').innerHTML = arr[0]+'<br> Организация ТОО "Ломбардия"';
      var glgoods = arr[1];
      var t = document.getElementById('MyGoodTab');
      var cell0, cell1, cell2, cell3, cell4;
      var row;
      var n, i, j, k;
      var sumw, sums, sump, sumd;
      n = glgoods.length;
      i = 0;
      j = 0;
      k = 1;
      while (i<n) {
        store = glgoods[i][0];
        row = t.insertRow(t.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);// наименование магазина
        cell1 = row.insertCell(1);// дата
        cell2 = row.insertCell(2);// вес
        cell3 = row.insertCell(3);// себестоимость
        cell4 = row.insertCell(4);// цена
        cell5 = row.insertCell(5);// доход
        j = i+k;
        k = k+1;
        cell0.innerHTML = store;
        sumw = 0;
        sums = 0;
        sump = 0;
        sumd = 0;
        while ((i<n) && (store == glgoods[i][0])) {
          row = t.insertRow(t.rows.length); // Добавляем строку
          cell0 = row.insertCell(0);// наименование магазина
          cell1 = row.insertCell(1);// дата
          cell2 = row.insertCell(2);// вес
          cell3 = row.insertCell(3);// себестоимость
          cell4 = row.insertCell(4);// цена
          cell5 = row.insertCell(5);// цена
          cell0.innerHTML = glgoods[i][1];
          cell1.innerHTML = MySqlDateToStr(glgoods[i][2]);
          cell2.innerHTML = glgoods[i][3];
          cell3.innerHTML = glgoods[i][4];
          cell4.innerHTML = glgoods[i][5];
          cell5.innerHTML = Number(glgoods[i][5])-Number(glgoods[i][4]);
          sumw = Number(glgoods[i][3]) +Number(sumw);
          sums = Number(glgoods[i][4]) +Number(sums);
          sump = Number(glgoods[i][5]) +Number(sump);
          sumd = Number(glgoods[i][5]) - Number(glgoods[i][4]) +Number(sumd);
          i = i+1; 
        }
        t.rows[j].cells[2].innerHTML = sumw;
        t.rows[j].cells[3].innerHTML = sums;
        t.rows[j].cells[4].innerHTML = sump;
        t.rows[j].cells[5].innerHTML = sumd;
      } 
    }
  });
}
// ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ФОРМЫ ПЕЧАТИ
