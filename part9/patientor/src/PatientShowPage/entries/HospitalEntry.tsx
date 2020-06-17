import React from 'react';
import { Header, Icon, Message } from 'semantic-ui-react';

import { HospitalEntry } from '../../types';

import DiagnosisComponent from './Diagnosis';

const HospitalEntryPage: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Message>
      <Message.Header as="h3">
        {entry.date} <Icon name="hospital" />
      </Message.Header>
      <p>{entry.description}</p>
      <Header as="h4">{`diacharge: date[${entry.discharge.date}] criteria[${entry.discharge.criteria}]`}</Header>
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code, index) => (
          <DiagnosisComponent code={code} key={index} />
        ))}
    </Message>
  );
};

export default HospitalEntryPage;
