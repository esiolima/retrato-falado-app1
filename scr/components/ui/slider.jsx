import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

export function Slider({ min = 0, max = 100, step = 1, value, onValueChange }) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none h-5"
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-4 h-4 bg-blue-600 rounded-full shadow" />
    </SliderPrimitive.Root>
  );
}
