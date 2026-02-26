import getContentAnalysis from '@/server/action/getContentAnalysis'
import ContentAnalysis from './_components/ContentAnalysis'

type ContentAnalysisType = {
	id: string
	primary_audience: string
	secondary_audience: []
	objective_optimizes: string
	asset: string
	email: string
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params
	const data: ContentAnalysisType = await getContentAnalysis(params)
	if (data && Object.keys(data).length === 0 && data.constructor === Object) {
		return (
			<div className="h-full flex flex-col items-center justify-center">
				{/* <NoUserFound height={280} width={280} /> */}
				<h2 className="mt-4">No Content Analysis found!</h2>
			</div>
		)
	}

	return (
		<ContentAnalysis data={data} />
	)
}