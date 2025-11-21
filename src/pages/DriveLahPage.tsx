import React from 'react';
import { Header } from '../components/drivelah/Header';
import { Sidebar } from '../components/drivelah/Sidebar';
import { DeviceForm } from '../components/drivelah/DeviceForm';
import { SubscriptionForm } from '../components/drivelah/SubscriptionForm';
import { ChevronDown } from 'lucide-react';
import { useDriveLahStore, Step } from '../store/driveLahStore';

export const DriveLahPage: React.FC = () => {
  const { currentStep, setStep } = useDriveLahStore();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Mobile Step Selector */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <select 
              className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#009CA6]"
              value={currentStep}
              onChange={(e) => setStep(e.target.value as Step)}
            >
              <option value="Subscription">Subscription</option>
              <option value="Device">Device</option>
              <option value="Easy Access">Easy Access</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0">
            {currentStep === 'Subscription' && <SubscriptionForm />}
            {currentStep === 'Device' && <DeviceForm />}
            {/* Fallback for other steps not implemented in this demo */}
            {currentStep !== 'Subscription' && currentStep !== 'Device' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                Step content for {currentStep} is not implemented in this demo.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
