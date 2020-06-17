import React from 'react';
import { useStateValue } from '../../state';

const DiagnosisComponent: React.FC<{ code: string }> = ({ code }) => {
  const [{ diagnoses }] = useStateValue();
  if (!diagnoses) {
    return null;
  }

  const diagnoise = diagnoses.find(d => d.code === code);
  return (
    <li>
      {code} {diagnoise && diagnoise.name}
    </li>
  );
};

export default DiagnosisComponent;
