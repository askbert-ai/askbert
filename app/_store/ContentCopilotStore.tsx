'use client'
import { create } from 'zustand'

type ContentCopilotState = {
	steps: string[];
	currentStep: number;
	updateCurrentStep: (payload: number) => void
	disabledNext: boolean
	disabledPrev: boolean
	updateDisabledNext: (payload: boolean) => void
	updateDisabledPrev: (payload: boolean) => void
	file: File | null
	updateFile: (payload: File | null) => void
	hideButton: boolean
	updateHideButton: (payload: boolean) => void
	primaryAudience: string
	secondaryAudience: string[]
	updatePrimaryAudience: (payload: string) => void
	updateSecondaryAudience: (payload: string) => void
	removeSecondaryAudience: (payload: string) => void
	clearSecondaryAudience: () => void
	primaryObjective: string
	updatePrimaryObjective: (payload: string) => void
	campaignId: string
	updateCampaignId: (payload: string) => void
	emailCampaign: string
	updateEmailCampaign: (payload: string) => void

}
export const useContentCopilot = create<ContentCopilotState>((set) => ({
	steps: ['Upload An Asset', 'Audience Segment', 'Sub Audience Segment', 'Platform and Placement', 'Set a Goal', 'Analyzing Asset', 'Content Analysis'],
	currentStep: 0,
	updateCurrentStep: (newStep) => set({ currentStep: newStep }),
	disabledNext: true,
	disabledPrev: false,
	updateDisabledNext: (isDisabled) => set({ disabledNext: isDisabled }),
	updateDisabledPrev: (isDisabled) => set({ disabledPrev: isDisabled }),
	file: null,
	updateFile: (newFile) => set({ file: newFile }),
	hideButton: false,
	updateHideButton: (value) => set({ hideButton: value }),
	primaryAudience: '',
	secondaryAudience: [],
	updatePrimaryAudience: (newPrimaryAudience) => set({ primaryAudience: newPrimaryAudience }),
	updateSecondaryAudience: (newSecondaryAudience) => set((state) => ({
		// Membuat array unik dari gabungan data lama dan baru
		secondaryAudience: [...new Set([...state.secondaryAudience, newSecondaryAudience])]
	})),
	removeSecondaryAudience: (oldSecondaryAudience) => set((state) => ({
		secondaryAudience: state.secondaryAudience.filter((item) => item !== oldSecondaryAudience)
	})),
	clearSecondaryAudience: () => set({ secondaryAudience: [] }),
	primaryObjective: '',
	updatePrimaryObjective: (newPrimaryObjective) => set({ primaryObjective: newPrimaryObjective }),
	campaignId: '',
	updateCampaignId : (newCampaignId) => set({ campaignId: newCampaignId }),
	emailCampaign: '',
	updateEmailCampaign : (newEmailCampaign) => set({ emailCampaign: newEmailCampaign }),
}))