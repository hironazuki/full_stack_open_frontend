import React from 'react';
import { Icon, Message } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../../types';

import DiagnosisComponent from './Diagnosis';

const OccupationalHealthcareEntryPage: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Message>
      <Message.Header as="h3">
        {entry.date} <Icon name="stethoscope" /> {entry.employerName}
      </Message.Header>
      <p>{entry.description}</p>

      {entry.sickLeave ? (
        <p>{`sickLeave: ${entry.sickLeave.startDate}~${entry.sickLeave.endDate}`}</p>
      ) : null}

      {entry.diagnosisCodes
        ? entry.diagnosisCodes.map((code, key) => (
            <DiagnosisComponent code={code} key={key} />
          ))
        : null}
    </Message>
  );
};

export default OccupationalHealthcareEntryPage;
