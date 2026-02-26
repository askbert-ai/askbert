'use client'
import { create } from 'zustand'

type FormData = {
	file: File | null,
	primaryAudience: string
	secondaryAudience: string[]
	primaryObjective: string
	campaignId: string
	emailCampaign: string
	asset: string
}

const initialState: FormData = {
	file: null,
	primaryAudience: '',
	secondaryAudience: [],
	primaryObjective: '',
	campaignId: '',
	emailCampaign: '',
	asset: ''
};

type ContentAnalysisState = {
	formData: FormData;
	updateData: (newData: Partial<FormData>) => void;
	reset: () => void;
}
export const useContentAnalysis = create<ContentAnalysisState>((set) => ({
	formData: initialState,
	updateData: (newData) =>
		set((state) => ({
			formData: { ...state.formData, ...newData },
		})),
	reset: () => set({ formData: initialState }),
}))