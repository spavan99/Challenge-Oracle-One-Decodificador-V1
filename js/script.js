const inputTexto = document.querySelector('#texto_dig');
const img = document.querySelector('.img1');
const msg1 = document.querySelector('.mensagem_1');
const msg2 = document.querySelector('.mensagem_2');
const msgSecreta = document.querySelector('.texto_secreto');
const btnCopia = document.querySelector('.button_copia');

const chaves = ['a', 'e', 'i', 'o', 'u'];
const codigos = ['ai', 'enter', 'imes', 'ober', 'ufat'];

var page_descriptar = false;

inputTexto.onclick = function () {
  inputTexto.value = '';
  msgSecreta.value = '';
  // usando visible
  img.style.visibility = 'visible';
  msg1.style.visibility = 'visible';
  msg2.style.visibility = 'visible';
  msgSecreta.style.visibility = 'hidden';
  btnCopia.style.visibility = 'hidden';
};

// verificar digitaçao e não permitir caracters especiais
inputTexto.addEventListener('keypress', function (e) {
  if (!chekChar(e)) {
    alert(
      'Digiaçao de caracter especial não permitido   <<  ' + e.key + '  >>'
    );
    e.preventDefault();
  }
});

function chekChar(caracter) {
  const char = String.fromCharCode(caracter.keyCode);
  const padrao = '[a-zA-Z0-9 .,:()@*!?]';

  if (char.match(padrao)) {
    return true;
  }
}

// funcao criptografar
function criptar(nTexto) {
  var nret = '';
  var naux = '';
  var tam = nTexto.length;
  var tam2 = chaves.length;

  for (var i = 0; i < tam; i++) {
    naux = nTexto[i];
    // pesquisa vetor chaves
    for (var n = 0; n < tam2; n++) {
      if (naux == chaves[n]) {
        naux = codigos[n];
        break;
      }
    }
    nret = nret + naux;
  }
  return nret;
}

// funcao criptografar
function descriptar(nTexto) {
  var nret = '';
  var naux = '';
  var tam = nTexto.length;
  var tam2 = codigos.length;
  var letras = 0;

  for (var i = 0; i < tam; i++) {
    naux = nTexto[i];
    // pesquisa vetor codigos
    for (var n = 0; n < tam2; n++) {
      letras = codigos[n].length;
      if (nTexto.substring(i, i + letras) == codigos[n]) {
        naux = chaves[n];
        i = i + letras - 1;
        break;
      }
    }
    nret = nret + naux;
  }
  return nret;
}

//precionado botao criptografar paramento 1 criptografar  2 descriptografar
function geraCripto(npar) {
  var msg = inputTexto.value.trim();
  if (msg.length == 0) {
    alert('Não há mensagem para criptografar ou descriptofragar');
  } else {
    if (npar == '1') {
      msg = criptar(msg);
    } else {
      msg = descriptar(msg);
    }
    page_descriptar = true;
    msgSecreta.value = msg;
    // usando visible
    img.style.visibility = 'hidden';
    msg1.style.visibility = 'hidden';
    msg2.style.visibility = 'hidden';
    msgSecreta.style.visibility = 'visible';
    btnCopia.style.visibility = 'visible';
  }
  // msg1.claslist.add('.desativo');

  //console.log(msg);
}

function copiarTexto() {
  var msg = msgSecreta.value.trim();

  navigator.clipboard
    .writeText(msg)
    .then(() => {
      alert('Texto copia para area de tranferencia');
    })
    .catch(err => {
      alert('Texto não copiado ocorreu um erro: >> ', err);
    });
}
