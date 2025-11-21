import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Device {
  id: string;
  type: string;
  isBringingOwn: boolean;
  serialNumber: string;
  image: string | null; 
}

export type Step = 'Location' | 'About' | 'Features' | 'Rules' | 'Pricing' | 'Promotion' | 'Pictures' | 'Insurance' | 'Subscription' | 'Device' | 'Easy Access';

interface DriveLahState {
  devices: Device[];
  currentStep: Step;
  selectedPlan: string | null;
  selectedAddons: string[];
  updateDevice: (id: string, data: Partial<Device>) => void;
  addDevice: () => void;
  removeDevice: (id: string) => void;
  setStep: (step: Step) => void;
  setPlan: (plan: string) => void;
  toggleAddon: (addonId: string) => void;
}

export const useDriveLahStore = create<DriveLahState>()(
  persist(
    (set) => ({
      devices: [
        { id: '1', type: 'Primary GPS', isBringingOwn: true, serialNumber: '', image: null },
        { id: '2', type: 'Secondary GPS', isBringingOwn: true, serialNumber: '', image: null },
        { id: '3', type: 'Drive Mate GPS', isBringingOwn: false, serialNumber: '', image: null },
        { id: '4', type: 'Lock Box', isBringingOwn: false, serialNumber: '', image: null },
      ],
      currentStep: 'Device',
      selectedPlan: null,
      selectedAddons: [],
      updateDevice: (id, data) =>
        set((state) => ({
          devices: state.devices.map((device) =>
            device.id === id ? { ...device, ...data } : device
          ),
        })),
      addDevice: () =>
        set((state) => ({
          devices: [
            ...state.devices,
            {
              id: Math.random().toString(36).substr(2, 9),
              type: '',
              isBringingOwn: false,
              serialNumber: '',
              image: null,
            },
          ],
        })),
      removeDevice: (id) =>
        set((state) => ({
          devices: state.devices.filter((device) => device.id !== id),
        })),
      setStep: (step) => set({ currentStep: step }),
      setPlan: (plan) => set({ selectedPlan: plan }),
      toggleAddon: (addonId) =>
        set((state) => {
          const isSelected = state.selectedAddons.includes(addonId);
          return {
            selectedAddons: isSelected
              ? state.selectedAddons.filter((id) => id !== addonId)
              : [...state.selectedAddons, addonId],
          };
        }),
    }),
    {
      name: 'drivelah-storage',
    }
  )
);
