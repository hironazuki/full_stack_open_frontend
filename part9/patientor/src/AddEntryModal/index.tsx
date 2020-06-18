import React from 'react';
import { Modal, Segment, Select, DropdownProps } from 'semantic-ui-react';

import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import { NewEntry, EntryType } from '../types';

import { TypeOption } from './FormField';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const typeOptions: TypeOption[] = [
  { key: 'Hospital', value: EntryType.Hospital, text: 'Hospital' },
  {
    key: 'OccupationalHealthcare',
    value: EntryType.OccupationalHealthcare,
    text: 'OccupationalHealthcare'
  },
  { key: 'HealthCheck', value: EntryType.HealthCheck, text: 'HealthCheck' }
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = React.useState<
    'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'
  >('Hospital');

  const handleType = (
    _e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    // console.log(data.value);
    if (
      data.value === 'Hospital' ||
      data.value === 'OccupationalHealthcare' ||
      data.value === 'HealthCheck'
    ) {
      setType(data.value);
    }
  };
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <label>Type: </label>
        <Select
          value={type}
          placeholder="Select Entry Type"
          options={typeOptions}
          onChange={handleType}
        />
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {(() => {
          switch (type) {
            case 'Hospital':
              return (
                <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
              );
            case 'OccupationalHealthcare':
              return (
                <AddOccupationalHealthcareEntryForm
                  onSubmit={onSubmit}
                  onCancel={onClose}
                />
              );
            case 'HealthCheck':
              return (
                <AddHealthCheckEntryForm
                  onSubmit={onSubmit}
                  onCancel={onClose}
                />
              );
          }
        })()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
