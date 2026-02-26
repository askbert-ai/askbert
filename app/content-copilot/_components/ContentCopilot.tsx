'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProgressSteps from "@/components/ui/progress-step";
import { MoveLeft, MoveRight } from 'lucide-react';
import StepPage from './StepPage';
import { useContentCopilot } from '../_store/ContentCopilotStore';
import { createClient } from '@/utils/supabase/client';

// Define types for steps
interface Step {
	url: string;
	breadcrumb: string;
}

const STEPS: Step[] = [
	{ url: 'upload', breadcrumb: 'Upload An Asset' },
	{ url: 'segment', breadcrumb: 'Audience Segment' },
	{ url: 'sub-segment', breadcrumb: 'Sub Audience Segment' },
	{ url: 'platform-placement', breadcrumb: 'Platform and Placement' },
	{ url: 'goal', breadcrumb: 'Set a Goal' },
	{ url: 'analyzing', breadcrumb: 'Analyzing Asset' },
];

export default function ContentCopilot() {
	const supabase = createClient();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Pastikan interface di store Anda sudah sesuai
	const {
		disabledNext, disabledPrev, updateDisabledNext,
		hideButton, updateHideButton, formData, updateData, reset
	} = useContentCopilot();

	const currentStepSlug = searchParams.get('step');
	const activeIndex = STEPS.findIndex((s) => s.url === currentStepSlug);
	// Default ke step pertama jika slug tidak ditemukan
	const activeStep = activeIndex !== -1 ? STEPS[activeIndex] : STEPS[0];

	// Handle initial redirect & reset jika user masuk tanpa query params
	// useEffect(() => {
	// 	if (!currentStepSlug) {
	// 		reset();
	// 		router.replace('/content-copilot?step=upload');
	// 	}
	// }, [currentStepSlug, reset, router]);
	useEffect(() => {
		if (currentStepSlug && currentStepSlug !== STEPS[0].url) {
			reset();
			router.replace('/content-copilot?step=upload');
		}
	}, []);

	useEffect(() => {
		const step = searchParams.get('step');
		if (!step) {
			reset()
			router.replace('/content-copilot?step=upload');
		}
	}, [searchParams, router]);
	// Validasi logic berdasarkan form data
	useEffect(() => {
		if (activeStep.url == 'sub-segment') {
			if (formData.primaryAudience !== '' && formData.secondaryAudience.length === 2) {
				updateDisabledNext(false)
			} else {
				updateDisabledNext(true)
			}
		}

		if (activeStep.url == 'analyzing') {
			saveCampaign()
		}
	}, [formData, activeStep.url])

	const saveCampaign = async () => {
		try {
			let publicUrl = '';

			if (formData.file) {
				// Gunakan nama file asli atau timestamp
				const fileExt = formData.file.name.split('.').pop();
				const filePath = `campaign-assets/${Date.now()}.${fileExt}`;

				const { error: uploadError } = await supabase.storage
					.from('askbert-bucket')
					.upload(filePath, formData.file);

				if (uploadError) throw uploadError;

				const { data: res } = supabase.storage
					.from('askbert-bucket')
					.getPublicUrl(filePath);

				publicUrl = res.publicUrl;
			}

			const { data, error } = await supabase
				.from('campaign')
				.insert({
					primary_audience: formData.primaryAudience,
					secondary_audience: JSON.stringify(formData.secondaryAudience),
					objective_optimizes: formData.primaryObjective,
					asset: publicUrl,
				})
				.select()
				.single();

			if (error) throw error;

			if (data) {
				setTimeout(() => {
					router.push(`/content-copilot/content-analysis/${data.id}`);
				}, 3000);
			}
		} catch (err) {
			console.error('Save error:', err instanceof Error ? err.message : err);
		}
	};

	const nextStep = () => {
		if (activeIndex < STEPS.length - 1) {
			const nextStep = STEPS[activeIndex + 1];
			router.push(`?step=${nextStep.url}`);
			updateHideButton(false)
			if (activeStep.url == 'upload') {
				updateHideButton(true)
			}
			if (activeStep.url == 'platform-placement' && formData.primaryObjective == '') {
				updateDisabledNext(true)
			}
			if (activeStep.url == 'platform-placement' && formData.primaryObjective != '') {
				updateDisabledNext(false)
			}
			if (activeStep.url == 'goal') {
				updateHideButton(true)
			}
		}
	};

	const prevStep = () => {
		router.back();
		updateHideButton(false)
		updateDisabledNext(false)
		if (activeStep.url == 'sub-segment') {
			updateDisabledNext(true)
			updateData({ primaryAudience: '', secondaryAudience: [] })
			updateHideButton(true)
		}
		if (activeStep.url == 'segment') {
			updateDisabledNext(false)
			updateHideButton(false)
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-[#FDFDFE]">
			<div className="min-h-screen p-6 md:p-9 bg-white justify-items-center sm:p-16 flex-1 rounded-xl md:min-h-min shadow-[0_4px_24px_0_rgba(0,0,0,0.05)]">
				<ProgressSteps steps={STEPS} currentStep={activeStep.url} />
				<StepPage steps={STEPS} currentStep={activeStep.url} />
				<div className={`flex justify-between min-w-full`}>
					{
						activeStep.url !== 'analyzing' && activeStep.url !== 'upload' ?
							<Button onClick={prevStep} variant="outline" disabled={disabledPrev} className={`mt-16 ${disabledPrev ? 'bg-[#E8ECF3]' : ''} px-4 md:px-6 py-3 place-self-end`}>
								<MoveLeft className='mr-2 md:mr-6' /> Back
							</Button>
							: <div></div>
					}
					{
						!hideButton ?
							<Button onClick={nextStep} variant="secondary" disabled={disabledNext} className={`mt-16 ${disabledNext ? 'bg-[#E8ECF3]' : 'bg-[#C1FF72] hover:bg-[#C1FF72]/70'} px-4 md:px-6 py-3 place-self-end`}>
								{activeStep.url == 'goal' ? 'Start Analyzing' : 'Next'} <MoveRight className='ml-2 md:ml-6' />
							</Button>
							: <></>
					}
				</div>
			</div>
		</div>
	);
}
