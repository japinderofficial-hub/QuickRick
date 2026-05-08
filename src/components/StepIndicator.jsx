import React from 'react';
import { DONE_SYMBOL } from '../config';

function StepIndicator({ current, total }) {
  var circles = [];
  for (var i = 0; i < total; i++) {
    var className = "step-dot";
    if (i < current) {
      className = "step-dot done";
    }
    if (i === current) {
      className = "step-dot active";
    }

    var text = i + 1;
    if (i < current) {
      text = DONE_SYMBOL;
    }

    circles.push(
      <div key={i} className={className}>
        {text}
      </div>
    );
  }

  return (
    <div className="step-indicator">
      {circles}
    </div>
  );
}

export default StepIndicator;
