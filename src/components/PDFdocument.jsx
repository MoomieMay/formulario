import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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
    padding: 30,
  },
  logo: {
    height: 50,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  tableContainer: {
    flexGrow: 1,
    marginLeft: 10,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexGrow: 1,
    padding: 5,
    fontWeight: 'bold',
    fontSize: 9,
    backgroundColor: '#E0E0E0', // Fondo gris
    textAlign: 'right', // Alineado a la derecha
  },
  tableCol: {
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexGrow: 1,
    padding: 5,
    fontSize: 8,
    textAlign: 'center', // Centrado
  },
  tableColFixed: {
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexGrow: 1,
    padding: 5,
    fontSize: 8,
    backgroundColor: '#E0E0E0', // Fondo gris
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center', // Centrado
  },
  lastRowCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
});

// Componente de documento
const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Encabezado combinado */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColHeader, { flex: 3 }]}>
                SOLICITUD Y RENDICIÓN DE COMISIÓN DE SERVICIOS, VIÁTICOS Y PASAJES – PI – SECYT
              </Text>
            </View>
            {/* Fila de datos del formulario */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>{data.apellido}</Text>
              <Text style={styles.tableCol}>{data.nombre}</Text>
              <Text style={[styles.tableCol, styles.lastRowCol]}>{formatDate(data.fechaSolicitud)}</Text>
            </View>
            {/* Fila con textos fijos */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableColFixed]}>Apellido/s</Text>
              <Text style={[styles.tableColFixed]}>Nombre (Completo)</Text>
              <Text style={[styles.tableColFixed, styles.lastRowCol]}>Fecha de Solicitud</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;

