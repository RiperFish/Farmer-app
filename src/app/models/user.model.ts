export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  village: string;
  status: 'unverified' | 'pending' | 'verified';
  farmerId?: string;
  profileImageUrl?: string;
  registrationDate: Date;
  verificationDate?: Date;
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  district: string;
  village: string;
  totalAcres: number;
  plots: Plot[];
}

export interface Plot {
  id: string;
  name: string;
  acres: number;
  cropType: string;
  plantingDate?: Date;
  harvestDate?: Date;
  status: 'active' | 'fallow' | 'harvested';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'alert';
}

export interface ProfileUpdateRequest {
  id: string;
  farmerId: string;
  field: string;
  oldValue: string;
  newValue: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  reviewDate?: Date;
}
