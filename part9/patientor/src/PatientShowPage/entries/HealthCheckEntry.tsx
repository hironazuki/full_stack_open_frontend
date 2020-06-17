import React from 'react';
import { Icon, Message } from 'semantic-ui-react';

import { HealthCheckEntry } from '../../types';

import DiagnosisComponent from './Diagnosis';
const HealthCheckEntryPage: React.FC<{ entry: HealthCheckEntry }> = ({
  entry
}) => {
  return (
    <Message>
      <Message.Header as="h3">
        {entry.date} <Icon name="user doctor" />
      </Message.Header>
      <p>{entry.description}</p>
      <Icon
        name="heart"
        color={(() => {
          switch (entry.healthCheckRating) {
            case 0:
              return 'green';
            case 1:
              return 'yellow';
            case 2:
              return 'orange';
            case 3:
              return 'red';
          }
        })()}
      />
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code, index) => (
          <DiagnosisComponent code={code} key={index} />
        ))}
    </Message>
  );
};

export default HealthCheckEntryPage;
