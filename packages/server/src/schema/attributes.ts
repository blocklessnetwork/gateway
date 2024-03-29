import { FastifyRequest } from 'fastify'

export type AttributeCreateIPNSRequest = FastifyRequest<{
	Body: {
		ipnsName: string
		ipnsRecord: string
	}
}>

export const AttributeCreateIPNSSchema = {
	body: {
		type: 'object',
		required: ['ipnsName', 'ipnsRecord'],
		properties: {
			ipnsName: {
				type: 'string'
			},
			ipnsRecord: {
				type: 'string'
			}
		},
		additionalProperties: false
	}
}
