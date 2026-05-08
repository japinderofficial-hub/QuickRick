import React from 'react';

export default function StepIndicator({ current, total }) {
  // Very basic array loop
  const steps = [];
  for (let i = 0; i < total; i++) {
    steps.push(i);
  }

  return (
    <div className="step-indicator">
      {steps.map(function(i) {
        let className = "step-dot";
        if (i < current) {
          className = className + " done";
        }
        if (i === current) {
          className = className + " active";
        }
        
        let label = "";
        if (i < current) {
          label = "✓";
        } else {
          label = i + 1;
        }

        return (
          <div key={i} className={className}>
            {label}
          </div>
        );
      })}
    </div>
  )
}
