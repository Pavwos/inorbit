import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'
import { db } from '../db'
import { number } from 'zod/v4'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals-created-up-to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompletedInWeek = db.$with('goal_completion_counts').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql /*sql*/`
          DATE(${goalCompletions.createdAt})
        `.as('completedAtDate'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .orderBy(desc(goalCompletions.createdAt))
      .groupBy(goals.id, goals.title, goalCompletions.createdAt)
  )

  const goalsCompleteByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql /*sql*/`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )
        `.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  )

  type GoalsPerDay = Record<
    string,
    {
      id: string
      title: string
      goalsPerDay: string
    }[]
  >

  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompleteByWeekDay)
    .select({
      completed:
        sql /**/`(SELECT COUNT(*) from ${goalsCompletedInWeek})`.mapWith(
          Number
        ),
      total:
        sql /**/`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql /*sql*/<GoalsPerDay>`JSON_OBJECT_AGG(
        ${goalsCompleteByWeekDay.completedAtDate},${goalsCompleteByWeekDay.completions}
      )`,
    })
    .from(goalsCompleteByWeekDay)
  return {
    summary: result[0],
  }
}
