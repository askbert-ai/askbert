"use client"
import React from 'react';

interface StepProps {
	label: string;
	isCompleted: boolean;
	isActive: boolean;
	index: number
}

const Step: React.FC<StepProps> = ({ isActive, index }) => {
	if (index == 2 || index > 4) {
		return <></>
	}
	return (
		<div className={`flex items-center justify-center h-3 rounded-full  ${isActive
			? 'w-[66] sm:w-[96] bg-primary '
			: 'w-[36] sm:w-[54] bg-[#E2E8F0] '
			}`}>
		</div>

	)
};

interface ProgressStepsProps {
	steps: string[];
	currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
	return (
		<div className={`flex gap-4 ${currentStep > 4 ? 'opacity-0 overflow-hidden' : ''}`}>
			{steps.map((step, index) => (
				<Step
					key={index}
					label={step}
					index={index}
					isCompleted={index < currentStep}
					isActive={index === currentStep}
				/>
			))}
		</div>
	);
};

export default ProgressSteps;
