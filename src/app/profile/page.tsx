
'use client';
import { useState } from 'react';
import {
  User,
  Pencil,
  Download,
  Trash2,
  Calendar,
  BarChart2,
  ThumbsUp,
  Save,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useProfile } from '@/context/profile-context';
import { useAuth } from '@/context/auth-context';
import AuthGuard from '@/components/auth-guard';

const StatCard = ({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative">
      <Icon className="w-8 h-8 mb-2 text-primary" />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const allInterests = ['Reading', 'Music', 'Exercise', 'Cooking', 'Gaming', 'Art', 'Travel'];
const allStressors = ['Deadlines', 'Work', 'School', 'Health', 'Money', 'Family', 'Social'];

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <p className="text-gray-500">{label}</p>
    <div className="font-medium text-gray-800 text-right">{value}</div>
  </div>
);

const EditableInfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
    <p className="text-gray-500">{label}</p>
    <div className="w-1/2">{children}</div>
  </div>
);

const TagButton = ({
  label,
  variant = 'default',
  isSelected,
  onClick,
  isEditing,
}: {
  label: string;
  variant?: 'default' | 'destructive';
  isSelected?: boolean;
  onClick?: () => void;
  isEditing?: boolean;
}) => (
  <Badge
    onClick={onClick}
    className={cn(
      'rounded-full px-4 py-1 text-sm font-normal border',
      isEditing && 'cursor-pointer',
      isSelected
        ? variant === 'destructive'
          ? 'bg-red-500 text-white border-red-600'
          : 'bg-blue-500 text-white border-blue-600'
        : variant === 'destructive'
        ? 'bg-red-100 text-red-700 border-red-200'
        : 'bg-blue-100 text-blue-700 border-blue-200',
      isEditing && 'hover:opacity-80 transition-opacity'
    )}
  >
    {label}
  </Badge>
);

function ProfilePageContent() {
  const { profileData, setProfileData } = useProfile();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfileData(tempProfileData);
    } else {
      // Start editing
      setTempProfileData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setTempProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (
    field: 'interests' | 'stressors',
    tag: string
  ) => {
    const currentTags = tempProfileData[field];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setTempProfileData(prev => ({ ...prev, [field]: newTags }));
  };

  const currentData = isEditing ? tempProfileData : profileData;
  const displayName = user?.name || profileData.name;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing && (
          <div className="text-right">
            <p className="text-gray-600">Good morning, {displayName}! 👋</p>
          </div>
        )}
      </header>

      {/* Main Profile Card */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                <AvatarFallback className="bg-pink-100 text-pink-500 text-4xl">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                {isEditing ? (
                  <Input
                    value={tempProfileData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-gray-900 h-10 w-48"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">
                    {displayName}
                  </h2>
                )}
                <p className="text-gray-500">{profileData.age} years old</p>
                <p className="text-xs text-gray-400 mt-1">
                  Member since 9/21/2025
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing && (
                <Button variant="outline" onClick={handleCancel}>
                  <X /> Cancel
                </Button>
              )}
              <Button
                onClick={handleEditToggle}
                className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md rounded-full"
              >
                {isEditing ? <Save /> : <Pencil />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
               <Button
                onClick={logout}
                variant="destructive"
                className="rounded-full"
              >
                <LogOut />
                Logout
              </Button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <StatCard value="1" label="Days Logged" icon={Calendar} />
            <StatCard value="3.7/10" label="Average Mood" icon={BarChart2} />
            <StatCard value="2" label="Activities Completed" icon={ThumbsUp} />
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <>
                <EditableInfoRow label="Age">
                  <Input
                    type="number"
                    value={tempProfileData.age}
                    onChange={e =>
                      handleInputChange('age', parseInt(e.target.value) || 0)
                    }
                  />
                </EditableInfoRow>
                <EditableInfoRow label="Gender">
                  <Select
                    value={tempProfileData.gender}
                    onValueChange={value => handleInputChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Non-binary">Non-binary</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </EditableInfoRow>
                <EditableInfoRow label="Country">
                  <Input
                    value={tempProfileData.country}
                    onChange={e =>
                      handleInputChange('country', e.target.value)
                    }
                  />
                </EditableInfoRow>
                <EditableInfoRow label="Sleep Hours">
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[tempProfileData.sleepHours]}
                      onValueChange={([value]) =>
                        handleInputChange('sleepHours', value)
                      }
                      max={12}
                      step={1}
                    />
                    <span className="w-12 text-right">
                      {tempProfileData.sleepHours}h
                    </span>
                  </div>
                </EditableInfoRow>
              </>
            ) : (
              <>
                <InfoRow label="Age" value={`${profileData.age} years old`} />
                <InfoRow label="Gender" value={profileData.gender} />
                <InfoRow label="Country" value={profileData.country} />
                <InfoRow
                  label="Sleep Hours"
                  value={`${profileData.sleepHours} hours / night`}
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Interests
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {allInterests.map(interest => (
              <TagButton
                key={interest}
                label={interest}
                isEditing={isEditing}
                isSelected={currentData.interests.includes(interest)}
                onClick={
                  isEditing
                    ? () => handleTagToggle('interests', interest)
                    : undefined
                }
              />
            ))}
          </CardContent>
        </Card>

        {/* Common Stressors */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Common Stressors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {allStressors.map(stressor => (
              <TagButton
                key={stressor}
                label={stressor}
                variant="destructive"
                isEditing={isEditing}
                isSelected={currentData.stressors.includes(stressor)}
                onClick={
                  isEditing
                    ? () => handleTagToggle('stressors', stressor)
                    : undefined
                }
              />
            ))}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" /> Export My Data (JSON)
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}
