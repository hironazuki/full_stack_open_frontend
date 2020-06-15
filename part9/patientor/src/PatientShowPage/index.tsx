import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showPatient } from '../state';

import EntryDetails from './entryDetails';

const PatientShowPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

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
    <>
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
        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
};

export default PatientShowPage;
