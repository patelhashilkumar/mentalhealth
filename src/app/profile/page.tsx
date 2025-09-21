
'use client';
import {
  User,
  Pencil,
  Download,
  Trash2,
  Calendar,
  BarChart2,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const TagButton = ({
  label,
  variant = 'default',
}: {
  label: string;
  variant?: 'default' | 'destructive';
}) => (
  <Badge
    variant={variant === 'destructive' ? 'destructive' : 'secondary'}
    className={`cursor-pointer rounded-full px-4 py-1 text-sm font-normal ${
      variant === 'destructive'
        ? 'bg-red-100 text-red-700 border border-red-200'
        : 'bg-blue-100 text-blue-700 border border-blue-200'
    }`}
  >
    {label}
  </Badge>
);

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="text-right">
          <p className="text-gray-600">Good morning, Anvesha! 👋</p>
        </div>
      </header>

      {/* Main Profile Card */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                <AvatarFallback className="bg-pink-100 text-pink-500 text-4xl">
                  🌸
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Anvesha</h2>
                <p className="text-gray-500">21 years old</p>
                <p className="text-xs text-gray-400 mt-1">
                  Member since 9/21/2025
                </p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-md rounded-full">
              <Pencil className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <StatCard value="1" label="Days Logged" icon={Calendar} />
            <StatCard value="3.7/10" label="Average Mood" icon={BarChart2} />
            <StatCard
              value="2"
              label="Activities Completed"
              icon={ThumbsUp}
            />
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
            <InfoRow label="Age" value="21 years old" />
            <InfoRow label="Gender" value="Female" />
            <InfoRow label="Country" value="India" />
            <InfoRow label="Sleep Hours" value="Not specified" />
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
            <TagButton label="Reading" />
            <TagButton label="Music" />
            <TagButton label="Exercise" />
            <TagButton label="Cooking" />
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
            <TagButton label="Deadlines" variant="destructive" />
            <TagButton label="Work" variant="destructive" />
            <TagButton label="School" variant="destructive" />
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
            <Button variant="destructive" className="w-full justify-start bg-red-500 text-white hover:bg-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
