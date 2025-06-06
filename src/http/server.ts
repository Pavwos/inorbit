import fastify from 'fastify'
import { createGoal } from '../functions/create-goals'
import z from 'zod'

const app = fastify()

app.post('/goals', async request => {
  const creatGoalSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  })

  const body = creatGoalSchema.parse(request.body)

  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running...') //That's much too vulgar a display of power, Karras
  })
