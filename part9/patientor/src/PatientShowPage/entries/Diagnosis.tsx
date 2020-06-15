import React from 'react';
import { useStateValue } from '../../state';

const DiagnosisComponent: React.FC<{ code: string; key: number }> = ({
  code,
  key
}) => {
  const [{ diagnoses }] = useStateValue();
  if (diagnoses) {
    return (
      <li key={key}>
        {code} {diagnoses[code].name}
      </li>
    );
  }

  return null;
};

export default DiagnosisComponent;
