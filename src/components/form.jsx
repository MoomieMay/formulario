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
            viaticosOptions: viaticosEnabled ? 'SI' : 'NO',
            cantDias: viaticosEnabled ? cantDias : undefined,
            montoDiario: viaticosEnabled ? Number(montoDiario).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            totalViaticos: viaticosEnabled ? Number(totalViaticos).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            movilidadOptions: movilidadEnabled ? 'SI' : 'NO',
            totalMovilidad: movilidadEnabled ? Number(totalMovilidad).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            aereos: (movilidadEnabled && aereos != 0) ? Number(aereos).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            terrestres: (movilidadEnabled && terrestres != 0) ? Number(terrestres).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
            combustible: (movilidadEnabled && combustible != 0) ? Number(combustible).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : undefined,
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
      <div className="container text-start">
        <div className="row">
          <p className='requisitos'>Requisitos establecidos en el Art. 7 Ordenanza 069/04 CS-UNPA</p>
          <ul>
            <li>
              Mantener la condición de Alumno Sistemático
            </li>
            <li>
              Cumplir con el requisito de tener aprobado el 20 % de la carrera que realiza.
            </li>
            <li>
              Tener aprobada la asignatura y cumplir con requisitos específicos de la asignatura según convocatoria publicada en portales institucionales.
            </li>
          </ul>
        </div>
      </div>


      {/* 1 - Tarjeta Solicitante */}
      <div className="card">
        <h5 className="card-header fs-6">Datos Personales</h5>
        <div className="card-body">

          {/* Datos */}
          <div className="row mx-3">
            <div className="col-12 col-md-3 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="legajo"> Nombre  </label>
              </div>
            </div>

            <div className="col-12 col-md-3 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="legajo"> Apellido </label>
              </div>
            </div>

            <div className="col-12 col-md-2 col-lg-3 mb-3">
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

            <div className="col-12 col-md-4 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="documento" placeholder="" {...register('documento', { required: true })} />
                <label className="col-form-label-sm" htmlFor="documento">N° Documento</label>
              </div>
            </div>
          </div>


          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="legajo"> Número de teléfono </label>
              </div>
            </div>


            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="legajo"> Correo Electrónico </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DATOS ACADEMICOS */}
      <div className="card">
        <h5 className="card-header fs-6">Datos Académicos</h5>
        <div className="card-body">

          {/* Datos */}
          <div className="row mx-3">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="text" className="form-control" id="legajo" placeholder="" {...register('legajo', { required: true })} />
                <label className="col-form-label-sm" htmlFor="legajo"> N° Legajo </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div className="form-floating">
                <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option value="ingenieria_sistemas">Ingeniería en Sistemas</option>
                  <option value="lic_administracion">Licenciatura en Administración</option>
                  <option value="lic_higiene_seguridad_trabajo">Licenciatura en Higiene y Seguridad en el Trabajo</option>
                  <option value="ingenieria_electromecanica">Ingeniería Electromecánica</option>
                  <option value="profesorado_matematica">Profesorado en Matemática</option>
                  <option value="lic_comunicacion_audiovisual">Licenciatura en Comunicación Audiovisual</option>
                  <option value="tecnicatura_turismo">Tecnicatura en Turismo</option>
                  <option value="lic_turismo">Licenciatura en Turismo</option>
                  <option value="lic_trabajo_social">Licenciatura en Trabajo Social</option>
                  <option value="profesorado_ciencias_educacion_universitario">Profesorado Universitario en Ciencias de la Educación</option>
                  <option value="tecnicatura_gestion_organizaciones">Tecnicatura Universitaria en Gestión de las Organizaciones</option>
                  <option value="profesorado_ciencias_educacion">Profesorado en Ciencias de la Educación</option>
                  <option value="profesorado_educacion_primaria">Profesorado para la Educación Primaria</option>
                  <option value="tecnicatura_redes_computadoras">Tecnicatura Universitaria en Redes en Computadoras</option>
                  <option value="tecnicatura_desarrollo_web">Tecnicatura Universitaria en Desarrollo Web</option>
                  <option value="analista_sistemas">Analista en Sistemas</option>
                  <option value="tecnicatura_seguridad_higiene_trabajo">Tecnicatura Universitaria en Seguridad e Higiene en el Trabajo</option>
                  <option value="lic_higiene_seguridad_trabajo_universitaria">Licenciatura Universitaria en Higiene y Seguridad en el Trabajo</option>
                  <option value="Libreta de Enrolamiento">Libreta de Enrolamiento</option>
                </select>
                <label className="col-form-label-sm" htmlFor="tipoDocumento"> Carrera </label>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <div className="form-floating">
                <input type="number" className="form-control" id="documento" placeholder="" {...register('documento', { required: true })} />
                <label className="col-form-label-sm" htmlFor="documento">Porcentaje Aprobación</label>
              </div>
            </div>

            
          </div>
          {/* Motivo */}
          <div className="row mx-3">
          <div className="col-12 mb-3 col-lg-4">
              <div className="form-floating">
              <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option value="" defaultValue>Seleccione una opción</option>
                  <option value="Terrestre">Wifi</option>
                  <option value="Pasaporte">Datos Móviles</option>
                  <option value="Vehiculo Particular">Ambas</option>
                  <option value="Vehiculo Particular">Ninguna</option>
                </select>
                <label className="col-form-label-sm" htmlFor="motivo">Conectividad</label>
              </div>
            </div>
            <div className="col-12 mb-3 col-lg-5">
              <div className="form-floating">
              <select className="form-select" id="tipoDocumento" {...register('tipoDocumento', { required: true })}>
                  <option value="" defaultValue>Seleccione una opción</option>
                  <option value="Terrestre">Dispositivo Móvil (Teléfono, tablet)</option>
                  <option value="Pasaporte">Computadora Portátil (Netbook, Notebook)</option>
                  <option value="Vehiculo Particular">PC de escritorio  </option>
                  <option value="Vehiculo Particular">Ninguna</option>
                </select>
                <label className="col-form-label-sm" htmlFor="motivo">Dispositivos</label>
              </div>
            </div>
          <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-start" >
              <div className="row justify-content-start align-items-center mx-1 mb-0">
                <div className="col-auto mb-0">
                  <label className="col-form-label-sm mb-0"> Beneficiario de Beca: </label>
                </div>

                <div className="row mb-0" >
                  <div className="col-auto mb-0 ">
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

            
          </div>
          
          
        </div>
      </div>

      {/* DOCUMENTACION */}
      <div className="card">
        <h5 className="card-header fs-6">Documentación</h5>
        <div className="card-body">

        <h5 className="card-title fw-semibold text-start px-4 py-2">&nbsp;Toda la documentación debe ser cargada en formato PDF</h5>
          {/* Firma */}
          <div className="row mx-3">

            <div className="col-12 col-md-4 col-lg-4 mb-3 ">

              <div className="form d-flex justify-content-center align-items-center custom-file-upload pt-2">
                                <input type='file' className='btn btn-firma ms-3' onChange={handleImageChange} accept='image/*' id='imageUpload' style={{ display: 'none' }} />
                <button type="button" className="btn btn-firma" onClick={() => document.getElementById('imageUpload').click()}>
                  Cargar DNI
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 mb-3 ">

              <div className="form d-flex justify-content-center align-items-center custom-file-upload pt-2">
                                <input type='file' className='btn btn-firma ms-3' onChange={handleImageChange} accept='image/*' id='imageUpload' style={{ display: 'none' }} />
                <button type="button" className="btn btn-firma" onClick={() => document.getElementById('imageUpload').click()}>
                  Cargar CUIT / CUIL
                </button>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 mb-3 ">

              <div className="form d-flex justify-content-center align-items-center custom-file-upload pt-2">
                                <input type='file' className='btn btn-firma ms-3' onChange={handleImageChange} accept='image/*' id='imageUpload' style={{ display: 'none' }} />
                <button type="button" className="btn btn-firma" onClick={() => document.getElementById('imageUpload').click()}>
                  Cargar Curriculum
                </button>
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
          {formData ? 'Nueva Solicitud' : (loading ? 'Generando PDF...' : 'Enviar Inscripción')}
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
