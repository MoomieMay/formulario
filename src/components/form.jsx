import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFdocument.jsx';
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";

const Form = ({ onSubmit, formData, loading, handleLinkLoading, handleResetForm }) => {
  const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({ comision: false, rendicion: false });
  const [fieldDisabled, setfieldDisabled] = React.useState(true);
  const [viaticosEnabled, setViaticosEnabled] = useState(false);
  const [movilidadEnabled, setMovilidadEnabled] = useState(false);
  const [cantDias, setCantDias] = useState('');
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
      setCantDias('');
      setMontoDiario('');
      setAereos('');
      setTerrestres('');
      setCombustible('');
      setSelectedCheckboxes({ comision: false, rendicion: false });
      clearErrors('checkboxGroup');
      clearErrors('firmaSolicitante');
      setImageURL(null);
      setSelectedImage(null);
    } else {
      handleSubmit((data) => {
        if (selectedCheckboxes.comision || selectedCheckboxes.rendicion) {
          if (!imageURL && !selectedImage) {
            setError('firmaSolicitante', { type: 'manual', message: 'Debe firmar o cargar una imagen.' });
            return;
          }
          // Preparar los datos para el envío
          const finalData = {
            ...data,
            selectedCheckboxes,
            imageURL,
            viaticosOptions: viaticosEnabled ? 'SI': 'NO',
            cantDias: viaticosEnabled ? cantDias : undefined,
            montoDiario: viaticosEnabled ? Number(montoDiario).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            totalViaticos: viaticosEnabled ? Number(totalViaticos).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            movilidadOptions: movilidadEnabled ? 'SI': 'NO',
            totalMovilidad: movilidadEnabled ? Number(totalMovilidad).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            aereos: (movilidadEnabled && aereos!=0) ? Number(aereos).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            terrestres: (movilidadEnabled && terrestres!=0) ? Number(terrestres).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            combustible: (movilidadEnabled && combustible!=0) ? Number(combustible).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
          };
          console.log(finalData); 
          onSubmit(finalData);
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
    if (viaticosEnabled && cantDias) {
      setTotalViaticos(cantDias * montoDiario);
    } else {
      setTotalViaticos('');
    }
  }, [cantDias, viaticosEnabled, montoDiario]);

  const handleViaticosRadioChange = (event) => {
    const isEnabled = event.target.value === 'SI';
    setViaticosEnabled(isEnabled);
    if (isEnabled) {
      setMontoDiario(25000);
    } else {
      setCantDias('');
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
    const isEnabled = event.target.value === 'SI';
    setMovilidadEnabled(isEnabled);
    if (!isEnabled) {
      setAereos('');
      setTerrestres('');
      setCombustible('');
    }
  };


  /* POPUP PARA FIRMA */
  const [imageURL, setImageURL] = useState(null); // contiene url de imagen
  const [selectedImage, setSelectedImage] = useState(null); //imagen cargada desde local
  const sigCanvas = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setImageURL(null);
        clearErrors('firmaSolicitante');
      };
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    const image = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setImageURL(image);
    setSelectedImage(null);
    clearErrors('firmaSolicitante');
  };

  const clear = () => {
    sigCanvas.current.clear();
    setImageURL(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageURL(null);
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
                <label className="form-check-label col-form-label-sm" htmlFor="flexCheckComision">
                  Comisión de Servicios
                </label>
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Rendición" id="flexCheckRendicion" name='rendicion' {...register('rendicion')} checked={selectedCheckboxes.rendicion} onChange={handleCheckboxChange} />
                <label className="form-check-label col-form-label-sm" htmlFor="flexCheckRendicion">
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
                <label className="col-form-label-sm" htmlFor="legajo"> N° Legajo/CUIT </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-2 mb-3">
              <div className="form-floating">
                <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option value="" defaultValue>Seleccione una opción</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Libreta Civica">Libreta Civica</option>
                  <option value="Libreta de Enrolamiento">Libreta de Enrolamiento</option>
                </select>
                <label className="col-form-label-sm" htmlFor="tipoDocumento"> Tipo Documento </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="documento" placeholder="" {...register('documento', { required: true })} />
                <label className="col-form-label-sm" htmlFor="documento">N° Documento</label>
              </div>
            </div>
            <div className="col-3 col-md-2 col-lg-1 mt-4 px-0 text-end">
              <span className="align-middle">PI29/B</span>
            </div>
            <div className="col-9 col-md-4 col-lg-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="proyecto" placeholder="" {...register('proyecto', { required: true })} />
                <label className="col-form-label-sm" htmlFor="proyecto">Proyecto de Investigación</label>
              </div>
            </div>
          </div>
          {/* Motivo */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="motivo" placeholder="" {...register('motivo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="motivo">Motivo de la Comisión de Servicios</label>
              </div>
            </div>
          </div>
          {/* Destino - Transporte */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="destino" placeholder="" {...register('destino', { required: true })} />
                <label className="col-form-label-sm" htmlFor="destino"> Destino </label>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="form-floating">
              <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option value="" defaultValue>Seleccione una opción</option>
                  <option value="Terrestre">Terrestre</option>
                  <option value="Pasaporte">Aéreo</option>
                  <option value="Vehiculo Particular">Vehículo Particular</option>
                </select>
                <label className="col-form-label-sm" htmlFor="tipoTransporte"> Tipo de Transporte </label>
              </div>
            </div>
          </div>
          {/* Fecha y Hora */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="fechaPartida" placeholder="" {...register('fechaPartida', { required: true })} />
                <label className="col-form-label-sm" htmlFor="fechaPartida"> Fecha Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="horaPartida" placeholder="" {...register('horaPartida', { required: true })} />
                <label className="col-form-label-sm" htmlFor="horaPartida"> Hora Estimada de Partida </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="date" className="form-control" id="fechaLlegada" placeholder="" {...register('fechaLlegada', { required: true })} />
                <label className="col-form-label-sm" htmlFor="fechaLlegada"> Fecha Estimada de Llegada </label>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="time" className="form-control" id="horaLlegada" placeholder="" {...register('horaLlegada', { required: true })} />
                <label className="col-form-label-sm" htmlFor="horaLlegada"> Hora Estimada de Llegada </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="observacionesSolicitante" placeholder="" {...register('observacionesSolicitante')} />
                <label className="col-form-label-sm" htmlFor="observacionesSolicitante">Observaciones</label>
              </div>
            </div>

          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-4 col-lg-2 pb-0">
              <label className="col-form-label-sm text-start ms-2 pb-0" htmlFor="firmaSolicitante"> Firma del Solicitante <br></br>(Firme mediante el panel o cargue la imagen de su firma desde su dispositivo)</label>
            </div>

            <div className="col-12 col-md-4 col-lg-2 pb-0 ms-0">
              {imageURL && (
                <div className="position-relative marcoFirma">
                  <img
                    src={imageURL}
                    alt="firma_solicitante"
                    style={{
                      display: 'block',
                      width: '150px'
                    }}
                  />
                  <button className="btn btn-danger position-absolute top-0 end-0 py-1 px-2" onClick={removeImage}>x</button>
                </div>
              )}

              {selectedImage && (
                <div className="position-relative marcoFirma">
                  <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                  <button className="btn btn-danger position-absolute top-0 end-0 py-1 px-2" onClick={removeImage}>x</button>
                </div>
              )}
            </div>


            <div className="col-12 col-md-4 col-lg-2 mb-3 ">
              <div className="form d-flex justify-content-center align-items-center custom-file-upload pt-2">
                <Popup
                  modal
                  trigger={<button type='button' className='btn btn-firma'>Firmar</button>}
                  closeOnDocumentClick={false}
                >
                  {close => (
                    <>
                      <SignaturePad
                        ref={sigCanvas}
                        canvasProps={{
                          className: "signatureCanvas"
                        }}
                        penColor='black'
                        penWidth={20}
                      />
                      {/* Button to trigger save canvas image */}
                      <div className='signatureBtnGroup d-flex justify-content-center'>
                        <button className="btn signatureBtn" onClick={() => { save(); close(); }}>Cargar</button>
                        <button className="btn signatureBtn" onClick={clear}>Borrar</button>
                        <button className="btn signatureBtn" onClick={close}>Cerrar</button>
                      </div>

                    </>
                  )}
                </Popup>
                <input type='file' className='btn btn-firma ms-3' onChange={handleImageChange} accept='image/*' id='imageUpload' style={{ display: 'none' }} />
                <button type="button" className="btn btn-firma" onClick={() => document.getElementById('imageUpload').click()}>
                  Cargar Firma
                </button>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="aclaracionSolicitante" placeholder="" {...register('aclaracionSolicitante', { required: true })} />
                <label className="col-form-label-sm" htmlFor="aclaracionSolicitante"> Sello/Aclaración </label>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2 - Tarjeta Autorizante */}
      <div className="card" >
        <h5 className="card-header fs-6">2. Para ser completado por el Autorizante</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">&nbsp;Autorización de Comisión de Servicios</h5>
          {/* Datos Pedido */}
          <div className="row mx-3">
            <div className="col-12 col-md-12 col-lg-5">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Cargo </label>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-2 d-flex justify-content-start" >
              <div className="row justify-content-start align-items-center mx-1 mb-0">
                <div className="col-auto mb-0">
                  <label className="col-form-label-sm mb-0"> Viáticos: </label>
                </div>

                <div className="row mb-0" >
                  <div className="col-auto mb-0">
                    <div className="form-check" >
                      <input className="form-check-input" type="radio" name="viaticosOptions" id="viaticosSI" value="SI" onChange={handleViaticosRadioChange}/>
                      <label className="form-check-label col-form-label-sm" htmlFor="viaticosSi">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="viaticosOptions" id="viaticosNO" value="NO" onChange={handleViaticosRadioChange} />
                      <label className="form-check-label col-form-label-sm" htmlFor="viaticosNo">
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
                      <input className="form-check-input" type="radio" name="movilidadOptions" id="MovilidadSi" value="SI" onChange={handleMovilidadRadioChange}/>
                      <label className="form-check-label col-form-label-sm" htmlFor="MovilidadSi">
                        Si
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mb-0">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="movilidadOptions" id="MovilidadNo" value="NO" onChange={handleMovilidadRadioChange}/>
                      <label className="form-check-label col-form-label-sm" htmlFor="MovilidadNo">
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
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Fecha de Autorización </label>
              </div>
            </div>
          </div>
          {/* Datos Personales */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Apellido del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Nombres del Autorizante </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Firma del Autorizante </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3 - Tarjeta Despacho/Decanato */}
      <div className="card" >
        <h5 className="card-header fs-6">3. Despacho/Decanato</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Protocolización de la Comisión de Servicios</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Firma Departamento de Despacho </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Unidad de Gestión </label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Sello/Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 - Tarjeta Responsable Económico */}
      <div className="card" >
        <h5 className="card-header fs-6">4. Para ser completado por el responsable económico</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Pago de Viáticos y Pasajes - Responsable Económico del Proyecto de Investigación</h5>
          {/* Viáticos */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="totalViaticos" value={totalViaticos} disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="totalViaticos"> Total Viáticos Liquidados ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="cantDias" value={cantDias} onChange={(e) => setCantDias(Number(e.target.value))} disabled={!viaticosEnabled} />
                <label className="col-form-label-sm" htmlFor="cantDias"> Cantidad de Días </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="montoDiario" value={montoDiario} disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="montoDiario"> Monto Diario del Viático ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Fecha de Pago </label>
              </div>
            </div>
          </div>
          {/* Movilidad */}
          <div className="row mx-3">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="totalMovilidad" value={totalMovilidad} disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="totalMovilidad"> Total Gastos de Movilidad </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="aereos" value={aereos} onChange={(e) => setAereos(Number(e.target.value))} disabled={!movilidadEnabled} />
                <label className="col-form-label-sm" htmlFor="aereos"> Pasajes Aereos ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="terrestres" value={terrestres} onChange={(e) => setTerrestres(Number(e.target.value))} disabled={!movilidadEnabled}  />
                <label className="col-form-label-sm" htmlFor="terrestres"> Pasajes Terrestres ($) </label>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="form-floating">
                <input type="number" className="form-control" id="combustible" value={combustible} onChange={(e) => setCombustible(Number(e.target.value))} disabled={!movilidadEnabled}  />
                <label className="col-form-label-sm" htmlFor="combustible"> Combustible ($) </label>
              </div>
            </div>
          </div>
          {/* Observaciones */}
          <div className="row mx-3">
            <div className="col-12">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Observaciones </label>
              </div>
            </div>
          </div>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Firma del Beneficiario </label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Aclaración </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 - Tarjeta Personal */}
      <div className="card" >
        <h5 className="card-header fs-6">5. Personal</h5>
        <div className="card-body">
          <h5 className="card-title fw-semibold text-start px-4 py-2">Registro de la Comisión de Servicios en el SIU-PAMPA</h5>
          {/* Firma */}
          <div className="row mx-3">
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingInput"> Firma Responsable Registro Personal </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Aclaración </label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating">
                <input type="date" className="form-control" id="floatingPassword" disabled={fieldDisabled} />
                <label className="col-form-label-sm" htmlFor="floatingPassword"> Fecha Registro SIU-PAMPA </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ERRORES */}
      {errors.firmaSolicitante && <p className="text-danger fst-italic fw-lighter">{errors.firmaSolicitante.message}</p>}
      {errors.checkboxGroup && <p className="text-danger fst-italic fw-lighter">{errors.checkboxGroup.message}</p>}
      {errors.viaticosOptions && (<div className="text-danger mt-2">{errors.viaticosOptions.message}</div>)}
      {errors.movilidadOptions && (<div className="text-danger mt-2">{errors.movilidadOptions.message}</div>)}


      {/* Botón generación PDF */}
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
            document={<PDFDocument data={formData} selectedCheckboxes={selectedCheckboxes} imageUrl={imageURL || selectedImage} />}
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
    </form >
  );
};

export default Form;
