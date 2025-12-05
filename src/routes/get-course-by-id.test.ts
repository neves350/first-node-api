import { expect, test } from 'vitest'
import request from 'supertest' // Permite requisições HTTP para os tests
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get a course by id', async () => {
	await server.ready()

	const course = await makeCourse()

	const response = await request(server.server).get(`/courses/${course.id}`)

	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	})
})

test('return 404 for non existing courses', async () => {
	await server.ready()

	const response = await request(server.server).get(
		`/courses/e636c47d-2b03-4167-8f92-9ef7599f1c9e`,
	)

	expect(response.status).toEqual(404)
})
