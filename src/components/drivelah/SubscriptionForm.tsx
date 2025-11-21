import React from "react";
import { useDriveLahStore } from "../../store/driveLahStore";
import { MapPin, Gauge, Lock, Key, CreditCard } from "lucide-react";
import clsx from "clsx";

const plans = [
  {
    id: "just-mates",
    name: "Just mates",
    price: "Free",
    features: [
      { icon: MapPin, text: "Bring your own GPS" },
      { icon: Gauge, text: "Mileage reporting to be done by you" },
      { icon: Lock, text: "In-person key handover to guests" },
    ],
  },
  {
    id: "good-mates",
    name: "Good mates",
    price: "$10/month",
    features: [
      { icon: MapPin, text: "Primary GPS included" },
      { icon: Gauge, text: "Automated mileage calculations" },
      { icon: Lock, text: "In-person key handover to guests" },
    ],
  },
  {
    id: "best-mates",
    name: "Best mates",
    price: "$30/month",
    features: [
      { icon: Key, text: "Keyless access technology" },
      { icon: MapPin, text: "Primary GPS included" },
      { icon: Gauge, text: "Automated mileage calculations" },
    ],
  },
];

const allAddons = [
  {
    id: "byo-secondary",
    name: "BYO secondary GPS",
    price: "$5/month",
  },
  {
    id: "byo-lockbox",
    name: "BYO lockbox",
    price: "$10/month",
  },
  {
    id: "between-trip-insurance",
    name: "Between trip insurance",
    price: "Coming soon",
  },
];

const planAddonsMap: Record<string, string[]> = {
  "just-mates": [],
  "good-mates": ["byo-secondary", "byo-lockbox"],
  "best-mates": ["byo-secondary", "between-trip-insurance"],
};

export const SubscriptionForm: React.FC = () => {
  const { selectedPlan, setPlan, setStep, selectedAddons, toggleAddon } =
    useDriveLahStore();

  // only compute visible addons if a plan is selected AND it has entries
  const visibleAddonIds = selectedPlan ? planAddonsMap[selectedPlan] ?? [] : [];
  const visibleAddons = allAddons.filter((a) => visibleAddonIds.includes(a.id));

  // Helper: whether the current plan is the free plan
  const isFreePlan = selectedPlan === "just-mates";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#009CA6]">Subscription plan</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select the ideal subscription plan for your listing.
        </p>
      </div>

      {/* Plan Selection */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select your plan</h3>
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setPlan(plan.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPlan(plan.id);
            }}
            className={clsx(
              "relative rounded-lg border p-6 cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedPlan === plan.id
                ? "border-[#009CA6] bg-teal-50/30 ring-1 ring-[#009CA6]"
                : "border-gray-200 hover:border-[#009CA6]/50"
            )}
          >
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-[#009CA6]">{plan.name}</h4>
              <div className="mt-2">
                <span className="text-2xl font-bold text-gray-900">
                  {plan.price.split("/")[0]}
                </span>
                {plan.price.includes("/") && (
                  <span className="text-sm text-gray-500">/{plan.price.split("/")[1]}</span>
                )}
              </div>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <feature.icon className="w-5 h-5 text-[#009CA6] flex-shrink-0 mr-3" />
                  <span className="text-sm text-gray-600">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Conditionally render Add-ons: only show when current plan has addons */}
      {visibleAddons.length > 0 && (
        <div className="border-t border-gray-100 pt-8 mb-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select add-ons for your subscription
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleAddons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);

              return (
                <div
                  key={addon.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleAddon(addon.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleAddon(addon.id);
                  }}
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all bg-white shadow-sm",
                    isSelected ? "border-[#01A2AD] ring-1 ring-[#01A2AD]" : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div>
                    <p className="text-[#017A84] font-medium">
                      {addon.name}{" "}
                      {addon.price !== "Coming soon" ? (
                        <span className="text-gray-600 font-normal"> - {addon.price}</span>
                      ) : (
                        <span className="text-gray-400 ml-2 text-xs">Coming soon</span>
                      )}
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "w-5 h-5 rounded-full border transition-all flex items-center justify-center",
                      isSelected ? "border-[#01A2AD] bg-[#01A2AD]" : "border-[#01A2AD]"
                    )}
                    aria-hidden
                  >
                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}

      {/* Card Details: HIDE when free plan is selected */}
      {!isFreePlan && (
        <div className="border-t border-gray-100 pt-8 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Add card details</h3>

          <div className="relative w-full sm:w-96">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <div className="flex items-center border border-gray-300 rounded-md bg-white pl-10 overflow-hidden h-11">
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 1234 5678"
                maxLength={19}
                className="flex-1 px-3 text-sm outline-none placeholder-gray-400"
              />

              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="w-20 px-3 text-sm border-l border-gray-200 outline-none placeholder-gray-400 text-center"
              />

              <input
                type="text"
                placeholder="CVC"
                maxLength={4}
                inputMode="numeric"
                className="w-20 px-3 text-sm border-l border-gray-200 outline-none placeholder-gray-400 text-center"
              />
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            You will not be charged right now. Subscription will only start once your listing is published and live.
          </p>
        </div>
      )}

      {/* Info box */}
      <div className="border-t border-gray-100 pt-8 mb-8">
        <div className="bg-gray-100 rounded-md p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-gray-800">Learn more about plans here</p>
            <a href="#" className="text-sm font-medium" style={{ color: "#01A2AD" }}>
              What is the right plan for me?
            </a>
          </div>

          <p className="text-sm text-gray-600">
            You will be able to switch between plans easily later as well. Speak to our host success team if you need any clarification.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep("Device")}
          className="bg-[#FCD34D] text-gray-900 px-12 py-3 rounded-md font-semibold hover:bg-[#fbbf24] transition-colors shadow-sm w-full md:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
