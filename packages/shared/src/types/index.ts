// Core data models for Mental Wellness App
// Based on architecture document specifications

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  created_at: string;
  last_active: string;
  subscription_tier: 'free' | 'premium' | 'clinical_plus';
  crisis_contacts: CrisisContact[];
  provider_id?: string;
  privacy_settings: PrivacySettings;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  timezone: string;
  avatar_url?: string;
  onboarding_completed: boolean;
  wellness_goals: WellnessGoal[];
  preferred_language: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_value: number;
  mood_type: 'numeric' | 'emoji' | 'color' | 'binary';
  context_tags: string[];
  notes?: string;
  recorded_at: string;
  location_data?: {
    city?: string;
    weather?: string;
    timezone: string;
  };
  ai_insights?: string[];
}

export interface ClinicalAssessment {
  id: string;
  user_id: string;
  assessment_type: 'PHQ9' | 'GAD7' | 'CUSTOM';
  responses: Record<string, number | string>;
  total_score: number;
  risk_level: 'low' | 'moderate' | 'high' | 'severe';
  clinical_interpretation: string;
  administered_at: string;
  administered_by?: string;
  follow_up_required: boolean;
  provider_notified: boolean;
}

export interface HealthcareProvider {
  id: string;
  email: string;
  professional_info: ProviderProfile;
  license_info: LicenseInfo;
  patients: string[]; // User IDs
  organization_id?: string;
  crisis_availability: {
    emergency_phone: string;
    available_hours: TimeRange[];
    backup_provider_id?: string;
  };
  verified_at: string;
}

export interface ProviderProfile {
  first_name: string;
  last_name: string;
  title: string;
  specializations: string[];
  bio: string;
  profile_image_url?: string;
}

export interface CrisisIntervention {
  id: string;
  user_id: string;
  trigger_type: 'manual' | 'assessment' | 'provider' | 'ai_detection';
  severity_level: 'low' | 'medium' | 'high' | 'emergency';
  intervention_actions: InterventionAction[];
  created_at: string;
  resolved_at?: string;
  follow_up_required: boolean;
  provider_notified: boolean;
  emergency_services_contacted: boolean;
}

export interface InterventionAction {
  action_type: 'coping_tools' | 'crisis_hotline' | 'emergency_contact' | 'provider_call';
  timestamp: string;
  details: Record<string, any>;
  effective: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: 'healthcare' | 'employer' | 'insurer' | 'research';
  subscription_plan: 'basic' | 'professional' | 'enterprise';
  admin_users: string[];
  patient_capacity: number;
  compliance_features: {
    hipaa_required: boolean;
    audit_retention_days: number;
    data_residency: string;
    custom_branding: boolean;
  };
  billing_info: BillingInfo;
  created_at: string;
}

// Supporting types
export interface CrisisContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  primary: boolean;
}

export interface WellnessGoal {
  id: string;
  type: 'mood_tracking' | 'meditation' | 'exercise' | 'sleep' | 'custom';
  target_value: number;
  target_frequency: 'daily' | 'weekly' | 'monthly';
  created_at: string;
  achieved_at?: string;
}

export interface PrivacySettings {
  data_sharing_consent: boolean;
  analytics_consent: boolean;
  location_tracking: boolean;
  provider_data_sharing: boolean;
  emergency_contact_consent: boolean;
}

export interface LicenseInfo {
  license_number: string;
  license_state: string;
  license_type: string;
  expiration_date: string;
  verified: boolean;
}

export interface TimeRange {
  start: string; // HH:MM format
  end: string;   // HH:MM format
  timezone: string;
}

export interface BillingInfo {
  stripe_customer_id?: string;
  billing_email: string;
  billing_address: Address;
  payment_method_id?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  meta?: {
    pagination?: Pagination;
    timestamp: string;
    request_id: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  request_id: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}