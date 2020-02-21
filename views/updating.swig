<DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <title>Atualização em progresso</title>
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <style>
      body {
        background-color: #f2f2f2;
      }

      p {
        margin: 0;
      }

      .h-100vh {
        min-height: 100vh;
      }

      .message-box {
        padding: 2rem;
        max-width: 380px;
        background-color: #fff;
        border-radius: 0.2rem;
        -webkit-box-shadow: 0px 0px 42px -24px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 42px -24px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 42px -24px rgba(0,0,0,0.75);
      }

      .message-box .title {
        margin-bottom: 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
      }

      .message-box .description {
        font-size: 0.9rem;
        color: #a1a1a1;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row align-items-center justify-content-center h-100vh">
        <div class="col message-box">
          <p class="title">Atualização em progresso</p>
          <p class="description">O recurso solicitado está sendo atualizado. Por favor, aguarde alguns instantes.</p>
        </div>
      </div>
    </div>
    <script>
      setInterval(() => {
        document.getElementsByClassName('title')[0].innerText += '.';
      }, 800);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    </script>
  </body>
</html>
