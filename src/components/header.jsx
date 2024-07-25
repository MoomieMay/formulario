import React from 'react';

const Header = () => {
  return (
    <nav class="navbar w-100 p-2 border-bottom">
      <div class="container-fluid">
        <div class="row w-100">
          <div class="col-auto ">
            <a class="navbar-brand" href="https://www.uaco.unpa.edu.ar">
              <img src="/logo.png" height="60" class="d-inline-block align-top my-2" alt="" />
            </a>
          </div>
          <div class="col text-start d-flex align-items-center">
            <p class="mb-0 fs-5 header-title">
              Solicitud Y Rendición de Comisión de Servicios, Viáticos y Pasajes – PI – SECYT
            </p>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Header;