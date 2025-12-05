import { faker } from '@faker-js/faker'
import { db } from '../../database/client.ts'
import { courses } from '../../database/schema.ts'

/**
 * Cria um curso real na DB
 */
export async function makeCourse(title?: string) {
	const result = await db
		.insert(courses)
		.values({
			title: title ?? faker.lorem.words(4), // Receber o title de cima senão vai ser gerado um title
		})
		.returning()

	return result[0]
}
