import { z } from 'zod/v4'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'
import type { FastifyRequest } from 'fastify'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request: FastifyRequest<{ Body: { goalId: string } }>) => {
      const { goalId } = request.body

      const result = await createGoalCompletion({
        goalId,
      })
      return result
    }
  )
}
