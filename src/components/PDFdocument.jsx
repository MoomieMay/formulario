import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Definición de estilos
const styles = StyleSheet.create({
  page: {
    padding: '25 30 30',
  },
  logo: {
    height: 40,
    width: 25,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerTableContainer: {
    flexGrow: 1,
    marginLeft: 10,
  },
  headerTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  headerTableRow: {
    flexDirection: 'row',
  },
  headerTableColHeader: {
    flex: 1,
    borderColor: '#000',
    borderBottomWidth: 1,
    padding: '3 30 1 0',
    fontSize: 8,
    backgroundColor: '#f3f3f3', // Fondo gris
    textAlign: 'right', // Alineado a la derecha
    fontWeight: 700,
    fontStyle: 'italic',
  },
  headerTableCol: {
    flex: 1,
    //borderWidth: 1,
    borderColor: '#000',
    // borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 3,
    fontSize: 7,
    textAlign: 'center', // Centrado
    wordBreak: 'break-all',
    maxWidth: '100%',
  },
  headerTableColFixed: {
    //flex:1,
    //borderWidth: 1,
    borderColor: '#000',
    borderRightWidth: 1,
    //borderTopWidth: 0,
    flex: 1,
    padding: 1,
    fontSize: 7,
    backgroundColor: '#f3f3f3', // Fondo gris
    textTransform: 'uppercase',
    textAlign: 'center', // Centrado
  },
  lastRowCol: {
    borderRightWidth: 0,
  },

  //TABLA GENERAL
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  rotatedTextContainer: {
    height: 208, // Ajusta la altura del contenedor del texto rotado para cubrir todas las filas de la tabla
    marginRight: -1, // Espacio entre el texto rotado y la tabla
    marginTop: -2,

    borderColor: '#000',
    borderWidth: 1,
    display: 'flex',
    backgroundColor: '#f3f3f3',
  },
  rotatedText: {
    transform: 'rotate(-90deg)',
    transformOrigin: 'left top',
    fontSize: 7,
    padding: 10,
    marginTop: 195,
    width: '100%',
    whiteSpace: 'normal', // Permite que el texto se divida en varias líneas
    wordWrap: 'break-word', // Permite que las palabras se dividan si son demasiado largas
  },
  tableContainer: {
    flexGrow: 1,
    marginLeft: 0,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    width: '100%',
    marginTop: -2,
  },
  tableRow: {
    flexDirection: 'row',

  },
  tableCol: {
    flex: 1,
    borderColor: '#000',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 3,
    fontSize: 7,
    textAlign: 'center',
  },
  tableColFixed: {
    flex: 1,
    borderColor: '#000',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    flexGrow: 1,
    padding: 1,
    fontSize: 7,
    backgroundColor: '#f3f3f3',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

// Componente de documento
const PDFDocument = ({ data, selectedCheckboxes }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ENCABEZADO */}
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.headerTableContainer}>
          <View style={styles.headerTable}>
            {/* Encabezado combinado */}
            <View style={styles.headerTableRow}>
              <Text style={[styles.headerTableColHeader, { flex: 1, fontWeight: 'bold' }]}>
                SOLICITUD Y RENDICIÓN DE COMISIÓN DE SERVICIOS, VIÁTICOS Y PASAJES – PI – SECYT
              </Text>
            </View>
            {/* Fila de datos del formulario */}
            <View style={styles.headerTableRow}>
              <Text style={styles.headerTableCol}>{data.apellido}</Text>
              <Text style={styles.headerTableCol}>{data.nombre}</Text>
              <Text style={[styles.headerTableCol, styles.lastRowCol]}>{formatDate(data.fechaSolicitud)}</Text>
            </View>
            {/* Fila con textos fijos */}
            <View style={styles.headerTableRow}>
              <Text style={[styles.headerTableColFixed]}>Apellido/s</Text>
              <Text style={[styles.headerTableColFixed]}>Nombre (Completo)</Text>
              <Text style={[styles.headerTableColFixed, styles.lastRowCol]}>Fecha de Solicitud</Text>
            </View>
          </View>
        </View>
      </View>

      {/* SECCION 1 */}
      <View style={styles.container}>
        <View style={styles.rotatedTextContainer}>
          <Text style={styles.rotatedText}> 1. PARA SER COMPLETADO POR EL SOLICITANTE </Text>
        </View>
        <View style={[styles.tableContainer]}>
          <View style={styles.table}>
            {/* Solicitud */}
            <View style={[styles.tableRow, {}]}>
              <Text style={[styles.tableCol, { textAlign: 'right', paddingRight: 15, width: 50 }]}>Corresponde</Text>
              <Text style={[styles.tableColFixed, { paddingTop: 3 }]}>COMISION DE SERVICIOS</Text>
              <Text style={[styles.tableCol, { flex:1, width: 50}]}> {selectedCheckboxes.comision ? 'X' : ' '} </Text>
              <Text style={[styles.tableColFixed, { paddingTop: 3 }]}>RENDICIÓN POR LICENCIA</Text>
              <Text style={[styles.tableCol, styles.lastRowCol, { width: 25 }]}> {selectedCheckboxes.rendicion ? 'X' : ' '} </Text>
            </View>
            {/* Datos */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{data.legajo}</Text>
              <Text style={styles.tableCol}>{data.tipoDocumento}</Text>
              <Text style={styles.tableCol}>{data.documento}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}>PI29/B{data.proyecto}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>N° LEGAJO / CUIT</Text>
              <Text style={styles.tableColFixed}>TIPO DOCUMENTO</Text>
              <Text style={styles.tableColFixed}>NRO. DOCUMENTO</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>PROYECTO DE INVESTIGACION</Text>
            </View>
            {/* Motivo */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.lastRowCol]}>{data.motivo}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>MOTIVO DE LA COMISIÓN DE SERVICIOS</Text>
            </View>
            {/* Transporte */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{data.destino}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}>{data.tipoTransporte}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol, {height: 14}]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>DESTINO</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>TIPO DE TRANSPORTE</Text>
            </View>
            {/* Fecha y Hora de Salida y Llegada */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{formatDate(data.fechaPartida)}</Text>
              <Text style={styles.tableCol}>{data.horaPartida}</Text>
              <Text style={styles.tableCol}>{formatDate(data.fechaLlegada)}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}>{data.horaLlegada}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>FECHA ESTIMADA DE PARTIDA</Text>
              <Text style={styles.tableColFixed}>HORA ESTIMADA DE PARTIDA</Text>
              <Text style={styles.tableColFixed}>FECHA ESTIMADA DE LLEGADA</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>HORA ESTIMADA DE LLEGADA</Text>
            </View>
            {/* Observaciones */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.lastRowCol, {height: 15 }]}>{data.observacionesSolicitante}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10}]}>OBSERVACIONES</Text>
            </View>
            {/* Firma / Aclaración */}
            <View style={[styles.tableRow, { height: 40 }]}>
              <Text style={styles.tableCol}>{data.firmaSolicitante}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}>{data.aclaracionSolicitante}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>FIRMA DEL SOLICITANTE</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { borderBottomWidth: 0 }]}>SELLO / ACLARACIÓN</Text>
            </View>
          </View>
        </View>
      </View>


      {/* SECCION 2 */}
      <View style={styles.container}>
        <View style={[styles.rotatedTextContainer,{height: 115}]}>
          <Text style={[styles.rotatedText,{marginTop:110, paddingTop:2, paddingBottom:1}]}> 2. PARA SER COMPLETADO </Text>
          <Text style={[styles.rotatedText,{marginTop:-8, paddingTop:11}]}> POR EL AUTORIZANTE </Text>

        </View>
        <View style={[styles.tableContainer]}>
          <View style={styles.table}>
            {/* Titulo */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10 }]}>AUTORIZACIÓN DE COMISIÓN DE SERVICIOS</Text>
            </View>
            {/* Autorizacion */}
            <View style={[styles.tableRow, {height:16}]}>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}>{data.viaticos}</Text>
              <Text style={styles.tableCol}>{data.movilidad}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>CARGO</Text>
              <Text style={styles.tableColFixed}>VIÁTICOS</Text>
              <Text style={styles.tableColFixed}>MOVILIDAD</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>FECHA DE AUTORIZACIÓN</Text>
            </View>
            {/* Datos Autorizante */}
            <View style={[styles.tableRow, {height:16}]}>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>APELLIDO DEL AUTORIZANTE</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>NOMBRES DEL AUTORIZANTE</Text>
            </View>
            {/* Firma / Aclaracion */}
            <View style={[styles.tableRow, { height: 40 }]}>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>FIRMA DEL SOLICITANTE</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { borderBottomWidth: 0 }]}>SELLO / ACLARACIÓN</Text>
            </View>
          </View>
        </View>
      </View>


      {/* SECCION 3 */}
      <View style={styles.container}>
        <View style={[styles.rotatedTextContainer,{height: 62.5}]}>
          <Text style={[styles.rotatedText,{marginTop:65, paddingTop:2, paddingBottom:1}]}> 3. DESPACHO/ </Text>
          <Text style={[styles.rotatedText,{marginTop:-8, paddingTop:11}]}> DECANATO </Text>

        </View>
        <View style={[styles.tableContainer]}>
          <View style={styles.table}>
            {/* Titulo */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10 }]}>PROTOCOLIZACIÓN DE LA COMISIÓN DE SERVICIOS</Text>
            </View>
            {/* Firma */}
            <View style={[styles.tableRow, { height: 40 }]}>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>FIRMA DEPARTAMENTO DE DESPACHO</Text>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>UNIDAD DE GESTIÓN</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { borderBottomWidth: 0 }]}>SELLO / ACLARACIÓN</Text>
            </View>
          </View>
        </View>
      </View>


      {/* SECCION 4 */}
      <View style={styles.container}>
        <View style={[styles.rotatedTextContainer,{height: 141.5}]}>
          <Text style={[styles.rotatedText,{marginTop:140, paddingTop:2, paddingBottom:1}]}> 4. PARA SER COMPLETADO POR EL</Text>
          <Text style={[styles.rotatedText,{marginTop:-8, paddingTop:11}]}> RESPONSABLE ECONÓMICO </Text>

        </View>
        <View style={[styles.tableContainer]}>
          <View style={styles.table}>
            {/* Titulo */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10 }]}>PAGO DE VIÁTICOS Y PASAJES – RESPONSABLE ECONÓMICO DEL PROYECTO DE INVESTIGACIÓN</Text>
            </View>
            {/* Viaticos */}
            <View style={[styles.tableRow,{height:16}]}>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>TOTAL VIÁTICOS LIQUIDADOS ($)</Text>
              <Text style={styles.tableColFixed}>CANTIDAD DE DÍAS</Text>
              <Text style={styles.tableColFixed}>MONTO DIARIO DEL VIÁTICO ($)</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>FECHA DE PAGO</Text>
            </View>
            {/* Movilidad */}
            <View style={[styles.tableRow,{height:16}]}>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableColFixed}>TOTAL GASTOS DE MOVILIDAD ($)</Text>
              <Text style={styles.tableColFixed}>PASAJES AÉREOS ($)</Text>
              <Text style={styles.tableColFixed}>PASAJES TERRESTRES ($)</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>COMBUSTIBLE ($)</Text>
            </View>
            {/* Observaciones */}
            <View style={[styles.tableRow,{height:16}]}>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10 }]}>OBSERVACIONES</Text>
            </View>
            {/* Firma */}
            <View style={[styles.tableRow, { height: 40 }]}>
              <Text style={styles.tableCol}>RECIBÍ CONFORME</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>FIRMA DEL BENEFICIARIO</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { borderBottomWidth: 0 }]}>ACLARACIÓN</Text>
            </View>
          </View>
        </View>
      </View>


      {/* SECCION 5 */}
      <View style={styles.container}>
        <View style={[styles.rotatedTextContainer,{height: 62.5}]}>
          <Text style={[styles.rotatedText,{marginTop:65, paddingTop:2, paddingBottom:1}]}> 5. PERSONAL </Text>
        </View>
        <View style={[styles.tableContainer]}>
          <View style={styles.table}>
            {/* Titulo */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { textAlign: 'left', paddingLeft: 10 }]}>REGISTRO DE LA COMISIÓN DE SERVICIOS EN EL SIU - PAMPA</Text>
            </View>
            {/* Firma */}
            <View style={[styles.tableRow, { height: 40 }]}>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}></Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}></Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>FIRMA RESPONSABLE REGISTRO PERSONAL</Text>
              <Text style={[styles.tableColFixed, { borderBottomWidth: 0 }]}>ACLARACIÓN</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol, { borderBottomWidth: 0 }]}>FECHA REGISTRO SIU - PAMPA</Text>
            </View>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

export default PDFDocument;

