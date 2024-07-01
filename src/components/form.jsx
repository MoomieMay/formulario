// src/components/Form.js
import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form class="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Encabezado */}
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <label class="col-form-label-sm">Apellido/s</label>
            <input class="form-control" {...register('apellido', { required: true })} />
          </div>
          <div class="col">
            <label class="col-form-label-sm">Nombres (Completo)</label>
            <input class="form-control" {...register('nombre', { required: true })} />
          </div>
          <div class="col">
            <label class="col-form-label-sm">Fecha de Solicitud</label>
            <input class="form-control" type='date' {...register('fechaSolicitud', { required: true })} />
          </div>
        </div>
      </div>
      {/* Tarjeta Solicitante */}
      <div class="card">
        <h5 class="card-header fs-6">1. Para ser completado por el Solicitante</h5>
        <div class="card-body">
          {/* Selección de Pedido */}
          <div class="row justify-content-end align-items-center mx-3">
            <div class="col-auto">
              <label class="col-form-label-sm"> Corresponde: </label>
            </div>
            <div class="col-auto">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Comisión" id="flexCheckDefault" {...register('comision')}/>
                <label class="form-check-label col-form-label-sm" for="flexCheckDefault">
                  Comisión de Servicios
                </label>
              </div>
            </div>
            <div class="col-auto">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="Rendición" id="flexCheckChecked" {...register('rendicion')}/>
                <label class="form-check-label col-form-label-sm" for="flexCheckChecked">
                  Rendición por licencia
                </label>
              </div>
            </div>
          </div>
          {/* Datos */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="" {...register('legajo')}/>
                <label class="col-form-label-sm" for="floatingInput"> N° Legajo/CUIT </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Seleccione una opción</option>
                  <option value="1">DNI</option>
                  <option value="2">Libreta Civica</option>
                  <option value="3">Libreta de Enrolamiento</option>
                </select>

                <label class="col-form-label-sm" for="floatingPassword"> Tipo Documento </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="number" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword">N° Documento</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword">Proyecto de Investigación</label>
              </div>
            </div>
          </div>
          {/* Motivo */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword">Motivo de la Comisión de Servicios</label>
              </div>
            </div>
          </div>
          {/* Destino - Transporte */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Destino </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Tipo de Transporte </label>
              </div>
            </div>
          </div>
          {/* Fecha y Hora */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="date" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Fecha Estimada de Partida </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="time" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Hora Estimada de Partida </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="date" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Fecha Estimada de Llegada </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="time" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Hora Estimada de Llegada </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword">Observaciones</label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Firma del Solicitante </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tarjeta Autorizante */}
      <div class="card">
        <h5 class="card-header fs-6">2. Para ser completado por el Autorizante</h5>
        <div class="card-body">
          <h5 class="card-title fs-6 fw-semibold text-start ps-4 pb-2">&nbsp;Autorización de Comisión de Servicios</h5>
          {/* Datos Pedido */}
          <div class="row mx-3">
            <div class="col-5">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Cargo </label>
              </div>
            </div>

            <div class="col-2 d-flex justify-content-start">
              <div class="row justify-content-start align-items-center mx-1 mb-0">
                <div class="col-auto mb-0">
                  <label class="col-form-label-sm mb-0"> Viáticos: </label>
                </div>

              <div class="row mb-0">
              <div class="col-auto mb-0">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label class="form-check-label col-form-label-sm" for="inlineRadio1">
                      Si
                    </label>
                  </div>
                </div>
                <div class="col-auto mb-0">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label class="form-check-label col-form-label-sm" for="inlineRadio2">
                      No
                    </label>
                  </div>
                </div>
              </div>
                
              </div>
            </div>
            
            <div class="col-2 d-flex justify-content-start">
              <div class="row justify-content-start align-items-center mx-1 mb-0">
                <div class="col-auto mb-0">
                  <label class="col-form-label-sm mb-0"> Movilidad: </label>
                </div>

              <div class="row mb-0">
              <div class="col-auto mb-0">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="MovilidadRadioOptions" id="MovilidadRadio3" value="option1"/>
                    <label class="form-check-label col-form-label-sm" for="MovilidadRadio3">
                      Si
                    </label>
                  </div>
                </div>
                <div class="col-auto mb-0">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="MovilidadRadioOptions" id="MovilidadRadio4" value="option2"/>
                    <label class="form-check-label col-form-label-sm" for="MovilidadRadio4">
                      No
                    </label>
                  </div>
                </div>
              </div>
                
              </div>
            </div>

            <div class="col-3">
              <div class="form-floating">
                <input type="date" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Fecha de Autorización </label>
              </div>
            </div>
          </div>
          {/* Datos Personales */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Apellido del Autorizante </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Nombres del Autorizante </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Firma del Autorizante </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tarjeta Despacho/Decanato */}
      <div class="card">
        <h5 class="card-header fs-6">3. Despacho/Decanato</h5>
        <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold text-start ps-4 pb-2">&nbsp;Protocolización de la Comisión de Servicios</h5>
          {/* Firma */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Firma Departamento de Despacho </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Unidad de Gestión </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Responsable Económico */}
      <div class="card">
        <h5 class="card-header fs-6">4. Para ser completado por el responsable económico</h5>
        <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold text-start ps-4 pb-2">&nbsp;Pago de Viáticos y Pasajes - Responsable Económico del Proyecto de Investigación</h5>
          {/* Viáticos */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Total Viáticos Liquidados ($) </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Cantidad de Días </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Monto Diario del Viático ($) </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="date" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Fecha de Pago </label>
              </div>
            </div>
          </div>
          {/* Movilidad */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Total Gastos de Movilidad </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Pasajes Aereos ($) </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Pasajes Terrestres ($) </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Combustible ($) </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Observaciones </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Firma del Beneficiario </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Personal */}
      <div class="card">
        <h5 class="card-header fs-6">5. Personal</h5>
        <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold text-start ps-4 pb-2">&nbsp;Registro de la Comisión de Servicios en el SIU-PAMPA</h5>
          {/* Firma */}
          <div class="row mx-3">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                <label class="col-form-label-sm" for="floatingInput"> Firma Responsable Registro Personal </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input type="date" class="form-control" id="floatingPassword" placeholder="Password" />
                <label class="col-form-label-sm" for="floatingPassword"> Fecha Registro SIU-PAMPA </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit">Generar PDF</button>
    </form>
  );
};

export default Form;
