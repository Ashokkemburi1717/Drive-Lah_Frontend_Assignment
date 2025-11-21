import React, { useRef } from 'react';
import { useDriveLahStore, Device } from '../../store/driveLahStore';
import {  X } from 'lucide-react';
import clsx from 'clsx';

const DeviceItem: React.FC<{ device: Device; index: number }> = ({ device, index }) => {
  const updateDevice = useDriveLahStore((state) => state.updateDevice);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateDevice(device.id, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if fields should be hidden (Device 1 and Device 3 -> index 0 and 2)
  const hideDetails = index === 0 || index === 2;

  return (
    <div className="mb-12 border-b border-gray-100 pb-12 last:border-0">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Device {index + 1}</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Device type</label>
            <input
              type="text"
              value={device.type}
              onChange={(e) => updateDevice(device.id, { type: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009CA6] focus:ring-[#009CA6] sm:text-sm py-3 px-4 bg-gray-50 border"
              placeholder="Enter device type"
            />
          </div>

          {!hideDetails && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Serial number</label>
              <input
                type="text"
                value={device.serialNumber}
                onChange={(e) => updateDevice(device.id, { serialNumber: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009CA6] focus:ring-[#009CA6] sm:text-sm py-3 px-4 bg-gray-50 border"
                placeholder="Enter the serial number of the device"
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-900">Bringing your own device?</label>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Toggle this on if you're bringing your own device. Leave it off if Drive mate is to provide the device.
              </p>
            </div>
            <button
              onClick={() => updateDevice(device.id, { isBringingOwn: !device.isBringingOwn })}
              className={clsx(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                device.isBringingOwn ? 'bg-[#009CA6]' : 'bg-gray-200'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  device.isBringingOwn ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {!hideDetails && (
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Upload an image of the device</label>
              <div 
                className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:bg-gray-50 transition-colors cursor-pointer bg-white h-40 items-center relative"
                onClick={() => fileInputRef.current?.click()}
              >
                {device.image ? (
                  <div className="relative w-full h-full">
                    <img src={device.image} alt="Device" className="w-full h-full object-contain" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updateDevice(device.id, { image: null });
                      }}
                      className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-[#009CA6] justify-center">
                      <span className="font-medium underline">Click to upload</span>
                    </div>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const DeviceForm: React.FC = () => {
  const devices = useDriveLahStore((state) => state.devices);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#009CA6]">Device management</h2>
        <p className="mt-2 text-sm text-gray-600">
          Add details of the device, if any already installed on your car. If none, then continue to next step.
        </p>
      </div>

      <div className="space-y-8">
        {devices.map((device, index) => (
          <DeviceItem key={device.id} device={device} index={index} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
        <button className="bg-[#FCD34D] text-gray-900 px-12 py-3 rounded-md font-semibold hover:bg-[#fbbf24] transition-colors shadow-sm">
          Next
        </button>
      </div>
    </div>
  );
};
