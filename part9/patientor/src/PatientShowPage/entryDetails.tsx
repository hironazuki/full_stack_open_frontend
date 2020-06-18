import React from 'react';
// import { Header, Icon } from 'semantic-ui-react';

import { Entry } from '../types';
// import { useStateValue } from '../state';
import HospitalEntryPage from './entries/HospitalEntry';
import OccupationalHealthcareEntryPage from './entries/OccupationalHealthcareEntry';
import HealthCheckEntryPage from './entries/HealthCheckEntry';

const Entrydetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryPage entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryPage entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryPage entry={entry} />;
    default:
      return null;
  }
};

export default Entrydetails;
