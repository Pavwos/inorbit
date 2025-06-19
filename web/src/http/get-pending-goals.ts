type PedindingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPedindingGoals(): Promise<PedindingGoalsResponse> {
  const response = await fetch('http://localhost:3333/pending-goals')

  const data = await response.json()

  return data.pendingGoals
}
