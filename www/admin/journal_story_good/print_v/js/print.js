// ЗАПОЛНЯМ ПЕЧАТНУЮ ФОРМУ
window.onload = function () {
  $.ajax({
    type: "POST",
    url: "scripts/print.php",
    data: { 
    },
    async: false,
    success: function(html1) {
      var zal = JSON.parse(html1);
      var forprint = zal[29];
      document.getElementById("MyAdresPrint").innerHTML = 'ТОО "Ломбардия" ' + zal[3];
      document.getElementById("MyBon").innerHTML = zal[28];
      document.getElementById("DateCur").innerHTML = MySqlDateToStr(zal[25]);
      document.getElementById("NumTic").innerHTML = '№ ' + zal[2];
      document.getElementById("OrgAdres").innerHTML = 'Организация: ТОО "Ломбардия"<br>'+
                                                       zal[3]+'<br>'+
                                                      'Телефон: ' + zal[4]; 
      document.getElementById("Dogovor").innerHTML =  'Стороны: ТОО "Ломбардия", в лице ' + zal[5] + ', действующий на основании доверенности ' + zal[6] + 
                                                       ' года, именуемое в дальнейшем "Товарищество" и';
      document.getElementById("ClientIIN").innerHTML = zal[8] + " (ИИН " + zal[7] + ")"
      document.getElementById("ClientDate").innerHTML =  zal[9] + " " + zal[10] + " от " + MySqlDateToStr(zal[11]) +", выданного " + zal[12] + ", проживающий(ая) по адресу: город " +
                                                        zal[13] + ", улица " + zal[14] + ", дом " + zal[15] + ", квартира " + zal[16]+ 
                                                        ", тел: " + zal[17] + ", сотовый: " + zal[18] + ', именуемый в дальнейшем "Заемщик/Залогодатель" договорились и подписали следующее:'; 
      var table = document.getElementById("MyZalogTab"); // Получаем ссылку на таблицу
      var n = forprint.length;
      var i;
      var wcom = 0;
      var row, cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8; 

      for (i=0;i<n;i++){
        row = table.insertRow(table.rows.length); // Добавляем строку
        cell0 = row.insertCell(0);
        cell1 = row.insertCell(1);
        cell2 = row.insertCell(2);
        cell3 = row.insertCell(3);
        cell4 = row.insertCell(4);
        cell5 = row.insertCell(5);
        cell6 = row.insertCell(6);
        cell7 = row.insertCell(7);
        cell8 = row.insertCell(8);
        k = i+1;
        cell0.innerHTML = k;
        cell0.className += "td1";
        cell1.innerHTML = forprint[i][0];
        cell1.className += "td2";
        cell2.innerHTML = forprint[i][1];
        cell2.className += "td1";
        cell3.innerHTML = MyFormat(forprint[i][2]);
        cell3.className += "td5";
        wcom = Number(wcom) + Number(forprint[i][2]);
        cell4.innerHTML = forprint[i][3];
        cell4.className += "td5";
        cell5.innerHTML = forprint[i][4];
        cell5.className += "td5";
        cell6.innerHTML = forprint[i][5];
        cell6.className += "td5";
        cell7.innerHTML = forprint[i][6];
        cell7.className += "td5";
        cell8.innerHTML = forprint[i][7];
        cell8.className += "td5";
      }
      row = table.insertRow(table.rows.length); // Добавляем строку
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell2 = row.insertCell(2);
      cell3 = row.insertCell(3);
      cell4 = row.insertCell(4);
      cell5 = row.insertCell(5);
      cell6 = row.insertCell(6);
      cell7 = row.insertCell(7);
      cell8 = row.insertCell(8);
      cell0.innerHTML = '';
      cell1.innerHTML = '';
      cell2.innerHTML = 'Итого';
      cell2.className += "td6";
      cell3.innerHTML = MyFormat(wcom);
      cell3.className += "td5";
      cell4.innerHTML = zal[19];
      cell4.className += "td5";
      cell5.innerHTML = zal[20];
      cell5.className += "td5";
      cell6.innerHTML = zal[21];
      cell6.className += "td5";
      cell7.innerHTML = zal[22];
      cell7.className += "td5";
      cell8.innerHTML = zal[23];
      cell8.className += "td5";
      document.getElementById("MySrok").innerHTML = zal[24]+" дней";      
      document.getElementById("MyDate").innerHTML = MySqlDateToStr(zal[25]);
      document.getElementById("MyDateEnd").innerHTML = MySqlDateToStr(zal[27]);
      document.getElementById("MyDateLg").innerHTML = MySqlDateToStr(zal[26]);
      document.getElementById("MyUser").innerHTML = zal[5];
      document.getElementById("MyClPod").innerHTML = 'Своей подписью я, '+zal[8]+', ставлю в известность, что с вышеуказанными условиями ознакомлен(а) и согласен(согласна),'+
        'а также даю согласие на внесудебную реализацию данного мною залогового имущества,'+
        'указанного в столбце 2 и 3б в случае если я не выплачу образовавшуюся задолжность в срок до '+MySqlDateToStr(zal[26]);
    }
  });
  window.open("http://lomstore/admin/journal_story_good/print_v/code/");
}

// ЗАПОЛНЯЕМ ПЕЧАТНУЮ ФОРМУ
