import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import scalarAPIReference from '@scalar/fastify-api-reference'
import { createCourseRoute } from './routes/create-course.ts'
import { getCourseByIdRoute } from './routes/get-course-by-id.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import { loginRoute } from './routes/login.ts'

/**
 * Server
 */
const server = fastify({
	logger: {
		// Dá um log no terminal
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

/**
 * Docs
 */
if (process.env.NODE_ENV === 'development') {
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Desafio Node.js',
				version: '1.0.0',
			},
		},
		// Integrar o Swagger com o typeProvideZod
		transform: jsonSchemaTransform,
	})

	server.register(scalarAPIReference, {
		routePrefix: '/docs',
		configuration: {
			theme: 'deepSpace',
		},
	})
}

/**
 * Routes
 */
server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)
server.register(loginRoute)

export { server }
