// src/components/Form.js
import React from 'react';
import { useForm } from 'react-hook-form';

const Form = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  // Estado para habilitar o deshabilitar las tarjetas
  const [isDisabled, setIsDisabled] = React.useState(true);



  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Encabezado */}
      <div className="container text-center">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <label className="col-form-label-sm">Apellido/s</label>
            <input className="form-control" {...register('apellido', { required: true })} />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <label className="col-form-label-sm">Nombres (Completo)</label>
            <input className="form-control" {...register('nombre', { required: true })} />
          </div>
          <div className="col-12 col-md-4 mb-3">
            <label className="col-form-label-sm">Fecha de Solicitud</label>
            <input className="form-control" type='date' {...register('fechaSolicitud', { required: true })} />
          </div>
        </div>
      </div>
      {/* Tarjeta Solicitante */}
      <div className="card">
        <h5 className="card-header fs-6">1. Para ser completado por el Solicitante</h5>
        <div className="card-body">
          {/* Selección de Pedido */}
          <div className="row justify-content-end align-items-center mx-3">
            <div className="col-auto">
              <label className="col-form-label-sm"> Corresponde: </label>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Comisión" id="flexCheckDefault" {...register('comision')} />
                <label className="form-check-label col-form-label-sm" for="flexCheckDefault">
                  Comisión de Servicios
                </label>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Rendición" id="flexCheckChecked" {...register('rendicion')} />
                <label className="form-check-label col-form-label-sm" for="flexCheckChecked">
                  Rendición por licencia
                </label>
              </div>
            </div>
          </div>
          {/* Datos */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="" {...register('legajo')} />
                <label className="col-form-label-sm" for="floatingInput"> N° Legajo/CUIT </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Seleccione una opción</option>
                  <option value="1">DNI</option>
                  <option value="2">Libreta Civica</option>
                  <option value="3">Libreta de Enrolamiento</option>
                </select>

                <label className="col-form-label-sm" for="floatingPassword"> Tipo Documento </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword">N° Documento</label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword">Proyecto de Investigación</label>
              </div>
            </div>
          </div>
          {/* Motivo */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword">Motivo de la Comisión de Servicios</label>
              </div>
            </div>
          </div>
          {/* Destino - Transporte */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Destino </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Tipo de Transporte </label>
              </div>
            </div>
          </div>
          {/* Fecha y Hora */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Fecha Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Hora Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Fecha Estimada de Llegada </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Hora Estimada de Llegada </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword">Observaciones</label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Firma del Solicitante </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tarjeta Autorizante */}
      <div className="card">
        <h5 className="card-header fs-6">2. Para ser completado por el Autorizante</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">&nbsp;Autorización de Comisión de Servicios</h5>
          {/* Datos Pedido */}
          <div className="row mx-3">
            <div className="col-12 col-md-12 col-lg-5">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Cargo </label>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-2 d-flex justify-content-start">
              <div className="row justify-content-start align-items-center mx-1 mb-0">
                <div className="col-auto mb-0">
                  <label className="col-form-label-sm mb-0"> Viáticos: </label>
                </div>

                <div className="row mb-0">
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                      <label className="form-check-label col-form-label-sm" for="inlineRadio1">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                      <label className="form-check-label col-form-label-sm" for="inlineRadio2">
                        No
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-2 d-flex justify-content-start">
              <div className="row justify-content-start align-items-center mx-1 mb-0">
                <div className="col-auto mb-0">
                  <label className="col-form-label-sm mb-0"> Movilidad: </label>
                </div>

                <div className="row mb-0">
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="MovilidadRadioOptions" id="MovilidadRadio3" value="option1" />
                      <label className="form-check-label col-form-label-sm" for="MovilidadRadio3">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="MovilidadRadioOptions" id="MovilidadRadio4" value="option2" />
                      <label className="form-check-label col-form-label-sm" for="MovilidadRadio4">
                        No
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha de Autorización </label>
              </div>
            </div>
          </div>
          {/* Datos Personales */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Apellido del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Nombres del Autorizante </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Firma del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* Tarjeta Despacho/Decanato */}
      <div className={`card ${isDisabled ? 'card-disabled' : ''}`}>
        <h5 className="card-header fs-6">3. Despacho/Decanato</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Protocolización de la Comisión de Servicios</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Firma Departamento de Despacho </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Unidad de Gestión </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Responsable Económico */}
      <div className="card">
        <h5 className="card-header fs-6">4. Para ser completado por el responsable económico</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Pago de Viáticos y Pasajes - Responsable Económico del Proyecto de Investigación</h5>
          {/* Viáticos */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Total Viáticos Liquidados ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Cantidad de Días </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Monto Diario del Viático ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha de Pago </label>
              </div>
            </div>
          </div>
          {/* Movilidad */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Total Gastos de Movilidad </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Pasajes Aereos ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Pasajes Terrestres ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Combustible ($) </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Observaciones </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Firma del Beneficiario </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Personal */}
      <div className={`card ${isDisabled ? 'card-disabled' : ''}`}>
        <h5 className="card-header fs-6">5. Personal</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Registro de la Comisión de Servicios en el SIU-PAMPA</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label className="col-form-label-sm" for="floatingInput"> Firma Responsable Registro Personal </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" placeholder="Password" />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha Registro SIU-PAMPA </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-secondary me-3">Generar PDF</button>
        <a hidden href="mailto:?subject=Presentación de Comisión de Servicios&body=Adjunto%20el%20PDF%20generado." class="btn btn-primary">Enviar Email</a>
      </div>
    </form>
  );
};

export default Form;
