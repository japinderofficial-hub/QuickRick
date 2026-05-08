// Progress dots dikhane wala component (jaise Step 1, 2, 3...)
import React from 'react';

export default function StepIndicator({ current, total }) {
  // Array.from se seedha array ban jayega — koi loop nahi chahiye
  return (
    <div className="step-indicator">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={"step-dot" + (i < current ? " done" : "") + (i === current ? " active" : "")}
        >
          {i < current ? "✓" : i + 1}
        </div>
      ))}
    </div>
  );
}
