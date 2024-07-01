import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Header from './components/header';
import Form from './components/form';
import PDFDocument from './components/PDFdocument.jsx';
import './App.css'

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <Header />
      <Form onSubmit={handleFormSubmit} />
      {formData && (
        <PDFDownloadLink document={<PDFDocument data={formData} />} fileName="form.pdf">
          {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default App;