import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFdocument.jsx';

const Form = ({ onSubmit, formData, loading, handleLinkLoading, handleResetForm }) => {
  const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({ comision: false, rendicion: false });
  const [fieldDisabled, setfieldDisabled] = React.useState(true);
  const [viaticosEnabled, setViaticosEnabled] = useState(false);
  const [movilidadEnabled, setMovilidadEnabled] = useState(false);
  const [dias, setDias] = useState('');
  const [montoDiario, setMontoDiario] = useState('');
  const [totalViaticos, setTotalViaticos] = useState('');
  const [aereos, setAereos] = useState('');
  const [terrestres, setTerrestres] = useState('');
  const [combustible, setCombustible] = useState('');
  const [totalMovilidad, setTotalMovilidad] = useState('');


  const handleButtonClick = () => {
    if (formData) {
      reset();
      handleResetForm();
      setfieldDisabled(true);
      setViaticosEnabled(false);
      setMovilidadEnabled(false);
      setDias('');
      setMontoDiario('');
      setAereos('');
      setTerrestres('');
      setCombustible('');
      setSelectedCheckboxes({ comision: false, rendicion: false });
      clearErrors('checkboxGroup');
    } else {
      handleSubmit((data) => {
        if (selectedCheckboxes.comision || selectedCheckboxes.rendicion) {
          onSubmit({ ...data, selectedCheckboxes });
          setfieldDisabled(true);
          clearErrors('checkboxGroup');
        } else {
          setError('checkboxGroup', { type: 'manual', message: 'Debe seleccionar al menos una opción entre Comisión de Servicios y Rendición por licencia.' });
          setfieldDisabled(true);
        }
      })();
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCheckboxes((prevState) => {
      const newState = {
        ...prevState,
        [name]: checked,
      };

      if (newState.comision || newState.rendicion) {
        clearErrors('checkboxGroup');
      }
      return newState;
    });
  };

  useEffect(() => {
    if (viaticosEnabled && dias) {
      setTotalViaticos(dias * montoDiario);
    } else {
      setTotalViaticos('');
    }
  }, [dias, viaticosEnabled]);

  const handleViaticosRadioChange = (event) => {
    const isEnabled = event.target.value === 'option1';
    setViaticosEnabled(isEnabled);
    if (isEnabled) {
      setMontoDiario(25000);
    } else {
      setDias('');
      setTotalViaticos('');
      setMontoDiario('');
    }
  };

  useEffect(() => {
    if (movilidadEnabled && (aereos || terrestres || combustible)) {
      setTotalMovilidad(aereos + terrestres + combustible);
    } else {
      setTotalMovilidad('');
    }
  }, [aereos, terrestres, combustible, movilidadEnabled]);


  const handleMovilidadRadioChange = (event) => {
    const isEnabled = event.target.value === 'option1';
    setMovilidadEnabled(isEnabled);
    if (!isEnabled) {
      setAereos('');
      setTerrestres('');
      setCombustible('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit((data) => {
      if (selectedCheckboxes.comision || selectedCheckboxes.rendicion) {
        onSubmit({ ...data, selectedCheckboxes });
      } else {
        setError('checkboxGroup', { type: 'manual', message: 'Debe seleccionar al menos una opción entre Comisión de Servicios y Rendición por licencia.' });
      }
    })}>
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
      {/* 1 - Tarjeta Solicitante */}
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
                <input className="form-check-input" type="checkbox" value="Comisión" id="flexCheckComision" name='comision' {...register('comision')} checked={selectedCheckboxes.comision} onChange={handleCheckboxChange} />
                <label className="form-check-label col-form-label-sm" for="flexCheckComision">
                  Comisión de Servicios
                </label>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Rendición" id="flexCheckRendicion" name='rendicion' {...register('rendicion')} checked={selectedCheckboxes.rendicion} onChange={handleCheckboxChange} />
                <label className="form-check-label col-form-label-sm" for="flexCheckRendicion">
                  Rendición por licencia
                </label>
              </div>
            </div>
          </div>
          {/* Datos */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" for="legajo"> N° Legajo/CUIT </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-2 mb-3">
              <div className="form-floating">
                <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option selected>Seleccione una opción</option>
                  <option value="DNI">DNI</option>
                  <option value="Libreta Civica">Libreta Civica</option>
                  <option value="Libreta de Enrolamiento">Libreta de Enrolamiento</option>
                </select>
                <label className="col-form-label-sm" for="tipoDocumento"> Tipo Documento </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="documento" placeholder="" {...register('documento', { required: true })} />
                <label className="col-form-label-sm" for="documento">N° Documento</label>
              </div>
            </div>
            <div className="col-3 col-md-2 col-lg-1 mt-4 px-0 |text-end">
              <span className="align-middle text-end">PI29/B</span>
            </div>
            <div className="col-9 col-md-4 col-lg-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="proyecto" placeholder="" {...register('proyecto', { required: true })} />
                <label className="col-form-label-sm" for="proyecto">Proyecto de Investigación</label>
              </div>
            </div>
          </div>
          {/* Motivo */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="motivo" placeholder="" {...register('motivo', { required: true })} />
                <label className="col-form-label-sm" for="motivo">Motivo de la Comisión de Servicios</label>
              </div>
            </div>
          </div>
          {/* Destino - Transporte */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="destino" placeholder="" {...register('destino', { required: true })} />
                <label className="col-form-label-sm" for="destino"> Destino </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="tipoTransporte" placeholder="" {...register('tipoTransporte', { required: true })} />
                <label className="col-form-label-sm" for="tipoTransporte"> Tipo de Transporte </label>
              </div>
            </div>
          </div>
          {/* Fecha y Hora */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="fechaPartida" placeholder="" {...register('fechaPartida', { required: true })} />
                <label className="col-form-label-sm" for="fechaPartida"> Fecha Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="horaPartida" placeholder="" {...register('horaPartida', { required: true })} />
                <label className="col-form-label-sm" for="horaPartida"> Hora Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="fechaLlegada" placeholder="" {...register('fechaLlegada', { required: true })} />
                <label className="col-form-label-sm" for="fechaLlegada"> Fecha Estimada de Llegada </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="horaLlegada" placeholder="" {...register('horaLlegada', { required: true })} />
                <label className="col-form-label-sm" for="horaLlegada"> Hora Estimada de Llegada </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="observacionesSolicitante" placeholder="" {...register('observacionesSolicitante')} />
                <label className="col-form-label-sm" for="observacionesSolicitante">Observaciones</label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="firmaSolicitante" placeholder="" {...register('firmaSolicitante', { required: true })} />
                <label className="col-form-label-sm" for="firmaSolicitante"> Firma del Solicitante </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="aclaracionSolicitante" placeholder="" {...register('aclaracionSolicitante', { required: true })} />
                <label className="col-form-label-sm" for="aclaracionSolicitante"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2 - Tarjeta Autorizante */}
      <div className="card">
        <h5 className="card-header fs-6">2. Para ser completado por el Autorizante</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">&nbsp;Autorización de Comisión de Servicios</h5>
          {/* Datos Pedido */}
          <div className="row mx-3">
            <div className="col-12 col-md-12 col-lg-5">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
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
                      <input className="form-check-input" type="radio" name="viaticosOptions" id="viaticosSi" value="option1" onChange={handleViaticosRadioChange} />
                      <label className="form-check-label col-form-label-sm" for="viaticosSi">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="viaticosOptions" id="viaticosNo" value="option2" onChange={handleViaticosRadioChange} />
                      <label className="form-check-label col-form-label-sm" for="viaticosNo">
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
                      <input className="form-check-input" type="radio" name="MovilidadOptions" id="MovilidadSi" value="option1" onChange={handleMovilidadRadioChange} />
                      <label className="form-check-label col-form-label-sm" for="MovilidadSi">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="MovilidadOptions" id="MovilidadNo" value="option2" onChange={handleMovilidadRadioChange} />
                      <label className="form-check-label col-form-label-sm" for="MovilidadNo">
                        No
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha de Autorización </label>
              </div>
            </div>
          </div>
          {/* Datos Personales */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Apellido del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Nombres del Autorizante </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Firma del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3 - Tarjeta Despacho/Decanato */}
      <div className="card">
        <h5 className="card-header fs-6">3. Despacho/Decanato</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Protocolización de la Comisión de Servicios</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Firma Departamento de Despacho </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Unidad de Gestión </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 - Tarjeta Responsable Económico */}
      <div className="card">
        <h5 className="card-header fs-6">4. Para ser completado por el responsable económico</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Pago de Viáticos y Pasajes - Responsable Económico del Proyecto de Investigación</h5>
          {/* Viáticos */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="totalViaticos" value={totalViaticos} disabled={fieldDisabled} readOnly />
                <label className="col-form-label-sm" for="totalViaticos"> Total Viáticos Liquidados ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="cantDias" value={dias} onChange={(e) => setDias(Number(e.target.value))} disabled={!viaticosEnabled} />
                <label className="col-form-label-sm" for="cantDias"> Cantidad de Días </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="montoDiario" value={montoDiario} readOnly disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="montoDiario"> Monto Diario del Viático ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha de Pago </label>
              </div>
            </div>
          </div>
          {/* Movilidad */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="totalMovilidad" value={totalMovilidad} disabled={fieldDisabled} readOnly />
                <label className="col-form-label-sm" for="totalMovilidad"> Total Gastos de Movilidad </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="aereos" value={aereos} onChange={(e) => setAereos(Number(e.target.value))} disabled={!movilidadEnabled} />
                <label className="col-form-label-sm" for="aereos"> Pasajes Aereos ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="terrestres" value={terrestres} onChange={(e) => setTerrestres(Number(e.target.value))} disabled={!movilidadEnabled} />
                <label className="col-form-label-sm" for="terrestres"> Pasajes Terrestres ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="combustible" value={combustible} onChange={(e) => setCombustible(Number(e.target.value))} disabled={!movilidadEnabled} />
                <label className="col-form-label-sm" for="combustible"> Combustible ($) </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Observaciones </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Firma del Beneficiario </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 - Tarjeta Personal */}
      <div className="card">
        <h5 className="card-header fs-6">5. Personal</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Registro de la Comisión de Servicios en el SIU-PAMPA</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingInput"> Firma Responsable Registro Personal </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Aclaración </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" for="floatingPassword"> Fecha Registro SIU-PAMPA </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón generación PDF */}
      {errors.checkboxGroup && <p className="text-danger fst-italic fw-lighter">{errors.checkboxGroup.message}</p>}

      <div className="d-flex justify-content-center mt-3">
        <button
          type="button"
          className="btn btn-secondary me-3"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {formData ? 'Nueva Solicitud' : (loading ? 'Generando PDF...' : 'Generar PDF')}
        </button>
        {formData && (
          <PDFDownloadLink
            document={<PDFDocument data={formData} selectedCheckboxes={selectedCheckboxes} />}
            fileName="cs_uaco.pdf"
          >
            {({ loading: pdfLoading }) => {
              handleLinkLoading(pdfLoading);
              return (
                <button type="button" className="btn btn-secondary me-3">
                  {pdfLoading ? 'Generando PDF...' : 'Descargar PDF'}
                </button>
              );
            }}
          </PDFDownloadLink>
        )}
      </div>
    </form>
  );
};

export default Form;
