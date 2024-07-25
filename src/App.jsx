import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Header from './components/header';
import Form from './components/form';
import PDFDocument from './components/PDFdocument.jsx';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleLinkLoading = (loading) => {
    setLoading(loading);
  };

  const handleResetForm = () => {
    setFormData(null);
  };

  return (
    <div>
      <Header />
      <Form
        onSubmit={handleFormSubmit}
        formData={formData}
        loading={loading}
        handleLinkLoading={handleLinkLoading}
        handleResetForm={handleResetForm}
      />
    </div>
  );
};

export default App;
