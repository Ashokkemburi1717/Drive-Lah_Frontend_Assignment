import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { useDriveLahStore, Step } from '../../store/driveLahStore';

const steps: { name: Step }[] = [
  { name: 'Location' },
  { name: 'About' },
  { name: 'Features' },
  { name: 'Rules' },
  { name: 'Pricing' },
  { name: 'Promotion' },
  { name: 'Pictures' },
  { name: 'Insurance' },
  { name: 'Subscription' },
  { name: 'Device' },
  { name: 'Easy Access' },
];

export const Sidebar: React.FC = () => {
  const { currentStep, setStep } = useDriveLahStore();

  return (
    <aside className="w-48 hidden md:block py-6 pr-6">
      <nav className="space-y-1">

        {steps.map((step, index) => {
          const stepIndex = index;
          const currentIndex = steps.findIndex(s => s.name === currentStep);

          const isActive = currentStep === step.name;
          const isComplete = stepIndex < currentIndex;
          const isUpcoming = stepIndex > currentIndex;

          return (
            <div
              key={step.name}
              onClick={() => setStep(step.name)}
              className={clsx(
                "flex items-center justify-between px-3 py-2 text-[13px] cursor-pointer transition-colors border-l-4 rounded-sm",

                isActive && "bg-teal-50 border-[#016786] text-[#016786] font-semibold",

                isComplete &&
                  "border-transparent text-[#016786] font-semibold hover:bg-gray-50",

                isUpcoming &&
                  "text-gray-400 border-transparent hover:text-gray-500 font-normal"
              )}
            >
              <span>{step.name}</span>

              {isComplete && (
                <CheckCircle2 className="w-4 h-4 text-[#016786] font-semibold stroke-[3]" />
              )}
            </div>
          );
        })}

      </nav>
    </aside>
  );
};
