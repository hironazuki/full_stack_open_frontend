import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT_ENTRY';
      payload: Entry;
    }
  | {
      type: 'SHOW_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_PATIENT_ENTRY':
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: [...state.patient.entries, action.payload]
        }
      };
    case 'SHOW_PATIENT':
      return {
        ...state,
        patient: {
          ...action.payload
        }
      };
    case 'SET_DIAGNOSES_LIST':
      return {
        ...state,
        // diagnoses: {
        //   ...action.payload.reduce(
        //     (memo, diagnoise) => ({ ...memo, [diagnoise.code]: diagnoise }),
        //     {}
        //   ),
        //   ...state.diagnoses
        // }
        diagnoses: [...action.payload]
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const addPatientEntry = (patient: Entry): Action => {
  return {
    type: 'ADD_PATIENT_ENTRY',
    payload: patient
  };
};

export const showPatient = (patient: Patient): Action => {
  return {
    type: 'SHOW_PATIENT',
    payload: patient
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnoses
  };
};
