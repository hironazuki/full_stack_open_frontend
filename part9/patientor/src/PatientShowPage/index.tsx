import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Header, Icon, Button } from 'semantic-ui-react';

import { Patient, NewEntry, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showPatient, addPatientEntry } from '../state';
import AddEntryModal from '../AddEntryModal';

import EntryDetails from './entryDetails';

const PatientShowPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: NewEntry) => {
    try {
      const { data: newPatient } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addPatientEntry(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFindId } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // dispatch({ type: 'SHOW_PATIENT', payload: patientFindId });
        dispatch(showPatient(patientFindId));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient.id !== id) {
      fetchPatient();
    }
  }, [dispatch, patient.id, id]);

  return (
    <div>
      <Header as="h2">
        {patient.name}
        {patient.gender === 'male' ? (
          <Icon name="mars" />
        ) : (
          <Icon name="venus" />
        )}
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Header as="h3">entries</Header>
      {patient.entries &&
        patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientShowPage;
