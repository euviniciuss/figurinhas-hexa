let register = document.getElementById("btn-adicionarjogador");
register.addEventListener("click", fnClick);
let th = document.getElementsByTagName("th");
for (let c = 0; c < th.length; c++) {
  th[c].addEventListener("click", item(c));
}
function CreateID() {
  const ID = Date.now();
  return ID;
}
function fnClick(event) {
  var ID = CreateID();
  var nome = document.getElementById("name").value;
  var selecao = document.getElementById("selecao").value;
  var altura = document.getElementById("altura").value;
  var peso = document.getElementById("peso").value;

  var btneditId = "btnedit" + ID;
  var btndeleteId = "btndelete" + ID;

  var tablerow = `
  <tr Id="${ID}"  data-ID="${ID}" data-nome="${nome}" data-selecao="${selecao}" data-altura="${altura}" data-peso="${peso}" >
  <td class="td-data">${ID}</td>
  <td class="td-data">${nome}</td>
  <td class="td-data">${selecao}</td>
  <td class="td-data">${altura}</td>
  <td class="td-data">${peso}</td>
  <td class="td-data">
  <button id=${btneditId} class='btn btn-info btn-xs' type='button' onclick='showeditrow("${ID}")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>
  <button id=${btndeleteId} class='btn btn-danger btn-xs' type='button' onclick='deleterow("${ID}")'><i class='fa fa-trash' aria-hidden='true'></i>Delete</button>
  </td>
  </tr>
  `;

  document.getElementById("tblbody").innerHTML += tablerow;
  document.getElementById("name").value = "";
  document.getElementById("selecao").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("peso").value = "";
}
function showeditrow(ID) {
  var linha = document.getElementById(ID);
  var data = linha.querySelectorAll(".td-data");

  var ID = data[0].innerHTML;
  var nome = data[1].innerHTML;
  var selecao = data[2].innerHTML;
  var altura = data[3].innerHTML;
  var peso = data[4].innerHTML;

  var btneditId = "btnedit" + ID;

  data[0].innerHTML = `<input name="txtupdate_id"  disabled id="txtupdate_id" value="${ID}"/>`;
  data[1].innerHTML = `<input name="txtupdate_nome" id="txtupdate_nome" value="${nome}"/>`;
  data[2].innerHTML = `<input name="txtupdate_selecao" id="txtupdate_selecao" value="${selecao}"/>`;
  data[3].innerHTML = `<input name="txtupdate_altura" id="txtupdate_altura" value="${altura}"/>`;
  data[4].innerHTML = `<input name="txtupdate_peso" id="txtupdate_peso" value="${peso}"/>`;
  data[5].innerHTML = `
  <button class='btn btn-primary btn-xs btn-updateEmployee' onclick='updateemployees("${ID}")'>
  <i class='fa fa-pencil' aria-hidden='true'></i>Update
  </button>
  
  <button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancelupdate("${ID}")'>
  <i class='fa fa-times' aria-hidden='true'></i>Cancel
  </button>

  <button class='btn btn-danger btn-xs btn-deleteEmployee' onclick='deleterow("${ID}")'>
  <i class='fa fa-trash' aria-hidden='true'></i>Delete
  </button>
  `;
}
function cancelupdate(ID) {
  var btneditId = "btnedit" + ID;
  var btndeleteId = "btndelete" + ID;

  var linha = document.getElementById(ID);
  var data = linha.querySelectorAll(".td-data");

  var nome = linha.getAttribute("data-nome");
  var selecao = linha.getAttribute("data-selecao");
  var altura = linha.getAttribute("data-altura");
  var peso = linha.getAttribute("data-peso");

  data[0].innerHTML = ID;
  data[1].innerHTML = nome;
  data[2].innerHTML = selecao;
  data[3].innerHTML = altura;
  data[4].innerHTML = peso;

  var actionbtn = `
    <button id='${btneditId}' class='btn btn-info btn-xs btn-editcustomer' onclick='showeditrow("${ID}")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>
    <button id='${btndeleteId}' class='btn btn-danger btn-xs btn-deleteEmployee' onclick='deleterow("${ID}")'><i class='fa fa-trash' aria-hidden='true'></i>Delete</button>`;
  data[5].innerHTML = actionbtn;
}
function updateemployees(ID) {
  var btneditId = "btnedit" + ID;
  var btndeleteId = "btndelete" + ID;

  var linha = document.getElementById(ID);
  var data = linha.querySelectorAll(".td-data");

  var nome = data[1].querySelector("#txtupdate_nome").value;
  var selecao = data[2].querySelector("#txtupdate_selecao").value;
  var altura = data[3].querySelector("#txtupdate_altura").value;
  var peso = data[4].querySelector("#txtupdate_peso").value;

  linha.setAttribute("data-nome", nome);
  linha.setAttribute("data-selecao", selecao);
  linha.setAttribute("data-altura", altura);
  linha.setAttribute("data-peso", peso);

  data[0].innerHTML = ID;
  data[1].innerHTML = nome;
  data[2].innerHTML = selecao;
  data[3].innerHTML = altura;
  data[4].innerHTML = peso;

  var actionbtn = `
    <button id='${btneditId}' class='btn btn-info btn-xs btn-editcustomer' onclick='showeditrow("${ID}")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>    
    <button id='${btndeleteId}' class='btn btn-danger btn-xs btn-deleteEmployee' onclick='deleterow("${ID}")'><i class='fa fa-trash' aria-hidden='true'></i>Delete</button>`;
  data[5].innerHTML = actionbtn;
}
function deleterow(ID) {
  document.getElementById(ID).remove();
}
function item(c) {
  return function () {
    sortTable();
  };
}

function sortTable(c) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("jogadores");
  switching = true;

  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;
    console.log(rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("td")[c];
      y = rows[i + 1].getElementsByTagName("td")[c];

      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}