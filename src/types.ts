export type Role = 'admin' | 'user';

export interface User {
  uid: string;
  email: string;
  role: Role;
  displayName?: string;
  photoURL?: string;
  createdAt: any; // Firestore Timestamp
  isProfileComplete?: boolean;
  language?: 'es' | 'en';
  country?: string;
  specialty?: string;
  licenseNumber?: string;
  legalAcceptedAt?: any;
  weightUnit?: 'kg' | 'lbs';
  heightUnit?: 'cm' | 'ft';
}

export interface Protocol {
  id: string;
  title: string;
  issuingEntity?: string;
  date?: string;
  version?: string;
  theme?: string;
  keywords?: string[];
  priorityLevel?: 'alta' | 'media' | 'baja';
  isActive: boolean;
  content: string;
  fileUrl?: string;
  fileName?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Leaflet {
  id: string;
  commercialName: string;
  activeIngredient: string;
  pharmacologicalCategory?: string;
  date?: string;
  version?: string;
  lab?: string;
  drugType?: string;
  keywords?: string[];
  isActive: boolean;
  content: string;
  fileUrl?: string;
  fileName?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface ClinicalCase {
  id: string;
  userId: string;
  patientData: string; // JSON string
  recommendation: string;
  protocolsUsed?: string[];
  leafletsUsed?: string[];
  createdAt: any;
}

export interface PatientData {
  age: number;
  weight: number;
  height: number;
  sex: 'M' | 'F' | 'O';
  medicalHistory: string;
  currentPathologies: string;
  medication: string;
  allergies: string;
  procedure: string;
  attachedDocumentsText?: string;
}
