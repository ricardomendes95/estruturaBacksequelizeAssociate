<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <title>Playground | JARPI</title>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700&display=swap">
    <style>
      *:not(i) {
        font-family: 'Ubuntu Mono', monospace !important;
      }

      .request-details {
        position: absolute;
        top: 7px;
        right: 25px;
        text-align: right;
      }

      .response {
        max-height: 100vh;
        border-radius: 0px;
      }

      .server-connection {
        position: absolute;
        top: 11px;
        right: 15px;
        color: red;
      }

      .input-group-append .btn {
        min-width: 120px;
      }

      .params {
        max-height: calc(100vh - 180px);
      }

      .params-errors {
        position: absolute;
        bottom: 7px;
        left: 25px;
        color: red;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="container-fluid">
      <div class="row justify-content-center" style="min-height: 100vh;">
        <div class="col-8 p-0">
          <div class="row">
            <form class="col-12">
              <div class="form-row">
                <div class="col-12">
                  <p id="request-details" class="request-details"></p>
                  <textarea id="response" class="form-control response" rows="1000" readonly></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-4 pt-3">
          <div class="row">
            <form class="col-12">
              <div class="form-row">
                <div class="col-12">
                  <i id="server-connection" class="fas fa-circle server-connection"></i>
                  <input id="server-address" onblur="connect()" type="text" class="form-control mb-2" placeholder="127.0.0.1:5200" value="{{ currentAddress }}">
                  <div class="input-group">
                    <input id="listen-event-name" type="text" class="form-control" placeholder="internalError">
                    <div class="input-group-append">
                      <button onclick="subscribe()" type="button" class="btn btn-warning"><i class="fas fa-satellite-dish"></i> Ouvir</button>
                    </div>
                  </div>
                  <div class="my-2"></div>
                  <div class="input-group">
                    <input id="emit-event-name" type="text" class="form-control" placeholder="util::version">
                    <div class="input-group-append">
                      <button onclick="emit()" type="button" class="btn btn-primary"><i class="fas fa-play"></i> Emitir</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="row pt-3">
            <form class="col-12">
              <div class="form-row">
                <div class="col-12">
                  <p id="params-errors" class="params-errors"></p>
                  <textarea id="params" class="form-control params" rows="1000" placeholder="Objeto que será enviado com a requisição">{}</textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
  <script src="/assets/js/socket.io.js"></script>
  <script>
    const serverConnection = document.getElementById('server-connection');
    const serverAddress = document.getElementById('server-address');
    const listenEventName = document.getElementById('listen-event-name');
    const emitEventName = document.getElementById('emit-event-name');
    const paramsErrors = document.getElementById('params-errors');
    const params = document.getElementById('params');
    const requestDetails = document.getElementById('request-details');
    const response = document.getElementById('response');

    let socket;
    let subscriptions = [];

    setInterval(() => {
      if (socket.connected) {
        serverConnection.style.color = '#32CD32';
      } else {
        serverConnection.style.color = 'red';
      }

      if (params.value) {
        try {
          eval(`[${params.value || '{}'}]`)[0];
          paramsErrors.innerText = '';
        } catch (err) {
          paramsErrors.innerText = err.toString();
        }
      }
    }, 300);

    connect();

    function connect() {
      if (serverAddress.value) {
        socket = io(`${/^http:\/\/|^https:\/\//.test(serverAddress.value) ? '' : 'http://' }${serverAddress.value}`, {
          path: '/socket',
        });
      }
    }

    function emit() {
      if (!socket) {
        return serverAddress.focus();
      }

      if (!emitEventName.value) {
        return emitEventName.focus();
      }

      let args;

      try {
        args = eval(`[${params.value || '{}'}]`)[0];
      } catch (err) {
        paramsErrors.innerText = err.toString();
        return params.focus();
      }

      response.value = '';
      requestDetails.innerText = 'Aguardando execução do callback...';
      paramsErrors.innerText = '';

      const startTime = new Date();

      socket.emit(emitEventName.value, args, (err, data) => {
        const endTime = new Date();
        response.value = err ? (typeof err === 'object' ? JSON.stringify(err, null, 2) : err.toString()) : JSON.stringify(data, null, 2);
        requestDetails.innerHTML = `
          Processado em ${endTime - startTime}ms<br>
          ${response.value.length} caracteres em ${response.value.match(/\n/g) ? response.value.match(/\n/g).length + 1 : 1} linha(s)<br>
          ${err ? (typeof err === 'object' ? 'ERROR' : 'INTERNAL_ERROR') : 'SUCCESS'}
        `.replace(/\s\s+/g, ' ');
      });
    }

    function subscribe() {
      if (!socket) {
        return serverAddress.focus();
      }

      if (!listenEventName.value) {
        return listenEventName.focus();
      }

      socket.removeAllListeners(subscriptions[0]);
      subscriptions = [];

      subscriptions.push(listenEventName.value);

      socket.on(listenEventName.value, (...args) => {
        response.value = JSON.stringify(args);
        requestDetails.innerText = '';
      });
    }
  </script>
</html>
