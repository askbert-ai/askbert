import { createClient } from '@/utils/supabase/server';

const getContentAnalysis = async (_queryParams: {
	[key: string]: string | string[] | undefined
}) => {
	const queryParams = _queryParams

	const { id } = queryParams
	const supabase = await createClient();
	const { data: campaign, error, status } = await supabase
		.from('campaign')
		.select('*')
		.eq('id', id)
		.single()
		
	if (!campaign) {
		return {}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const res = {
		id: campaign.id,
		primary_audience: campaign.primary_audience,
		secondary_audience: JSON.parse(campaign.secondary_audience),
		objective_optimizes: campaign.objective_optimizes,
		asset: campaign.asset,
		email: campaign.email,

	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return res as any
}

export default getContentAnalysis
