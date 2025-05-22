// Valida y envía el login
function checkLogin() {
  var pwd = $('#password').val();
  if (!pwdRegExp.test(pwd)) {
    alert(JSLocale.pwd_error);
    return;
  }
  $('#formulario').submit();
}

// Actualiza tiempo disponible vía AJAX
function updateAvailableTime() {
  var params = $.param({
    op: 'getLeftTime',
    ATTRIBUTE_UUID: '71A1AD565C969AD68AFE8652D0440375',
    CSRFHW: $('input[name=CSRFHW]').val(),
    wlanuserip: $('input[name=wlanuserip]').val(),
    username: $('#username').val()
  });
  $.post('/EtecsaQueryServlet', params, function(res){
    $('#availableTime').text(res);
  });
}

// Logout seguro
function userSubmitLogout() {
  if (!confirm('¿Seguro que quieres cerrar sesión?')) return;
  // igual impl de Etecsa: pageOnunload, XMLHttpRequest a /LogoutServlet…
  // copia aquí el código original de logoutImpl() del portal.
}

// Contador de tiempo online
var startTime = new Date();
function set() {
  var elapsed = Math.floor((new Date() - startTime) / 1000);
  var h = String(Math.floor(elapsed / 3600)).padStart(2,'0');
  var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2,'0');
  var s = String(elapsed % 60).padStart(2,'0');
  $('#onlineTime').text(`${h}:${m}:${s}`);
}
setInterval(set, 1000);
