'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// Define the shape of the profile data
type ProfileData = {
  name: string;
  age: number;
  gender: string;
  country: string;
  sleepHours: number;
  interests: string[];
  stressors: string[];
};

type ProfileContextType = {
  profileData: ProfileData;
  setProfileData: (profileData: ProfileData) => void;
  resetProfile: () => void;
};

const initialProfileData: ProfileData = {
  name: 'Anvesha',
  age: 21,
  gender: 'Female',
  country: 'India',
  sleepHours: 7,
  interests: ['Reading', 'Music', 'Exercise'],
  stressors: ['Deadlines', 'Work', 'School'],
};

// Create the context with a default value
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Define the provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  const resetProfile = useCallback(() => {
    setProfileData({
      name: 'User',
      age: 0,
      gender: 'Prefer not to say',
      country: '',
      sleepHours: 8,
      interests: [],
      stressors: [],
    });
  }, []);

  const value = useMemo(
    () => ({ profileData, setProfileData, resetProfile }),
    [profileData, resetProfile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

// Create a custom hook for using the context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
