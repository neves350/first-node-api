/**
 * Definir as tabelas da DB
 */
import {
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	pgEnum,
} from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', ['student', 'manager'])

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
	role: userRole().notNull().default('student'),
})

export const courses = pgTable('courses', {
	id: uuid().primaryKey().defaultRandom(),
	title: text().notNull().unique(),
	description: text(),
	// Forma de contornar o enum
	// category: text().$type<'frontend' | 'backend'>(),
})

export const enrollments = pgTable(
	'enrollments',
	{
		id: uuid().primaryKey().defaultRandom(),
		userId: uuid()
			.notNull()
			.references(() => users.id),
		courseId: uuid()
			.notNull()
			.references(() => courses.id),
		createdAt: timestamp().notNull().defaultNow(),
	},
	(table) => [uniqueIndex().on(table.userId, table.courseId)],
)
