"use client"
import React from 'react';

interface StepProps {
	label: string;
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

type Step = {
	url: string,
	breadcrumb: string
}
interface ProgressStepsProps {
	steps: Step[];
	currentStep: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
	return (
		<div className={`flex gap-4 ${currentStep == 'analyzing' ? 'opacity-0 overflow-hidden' : ''}`}>
			{steps.map((step, index) => (
				<Step
					key={index}
					label={step.url}
					index={index}
					isActive={step.url === currentStep}
				/>
			))}
		</div>
	);
};

export default ProgressSteps;
