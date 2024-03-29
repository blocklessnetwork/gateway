import { FastifyRequest } from 'fastify'

import { FunctionStatuses, IFunctionRecord } from '@blockless/gateway-core'

export type FunctionCreateRequest = FastifyRequest<{
	Body: {
		functionId: string
		functionName: string
	}
}>

export type FunctionUpdateRequest = FastifyRequest<{
	Params: {
		id: string
	}
	Body: Partial<IFunctionRecord>
}>

export type FunctionUpdateEnvVarsRequest = FastifyRequest<{
	Params: {
		id: string
	}
	Body: {
		envVars: {
			[key: string]: string | null
		}
	}
}>

export type FunctionUpdateSecretsRequest = FastifyRequest<{
	Params: {
		id: string
	}
	Body: {
		secrets: {
			hashicorp: {
				[key: string]: string | null
			}
		}
		secretManagement: {
			hashicorp: {
				[key: string]: string | null
			}
		}
	}
}>

export type FunctionListRequest = FastifyRequest<{
	Querystring: {
		page: number
		limit: number
	}
}>

export type FunctionFetchRequest = FastifyRequest<{
	Params: {
		id: string
	}
}>

export type FunctionDeleteRequest = FastifyRequest<{
	Params: {
		id: string
	}
}>

export type FunctionDeployRequest = FastifyRequest<{
	Params: {
		id: string
	}
	Body: {
		functionId: string
	}
}>

export const FunctionCreateSchema = {
	body: {
		type: 'object',
		required: ['functionId', 'functionName'],
		properties: {
			functionId: {
				type: 'string'
			},
			functionName: {
				type: 'string'
			}
		},
		additionalProperties: false
	}
}

export const FunctionUpdateSchema = {
	params: { id: { type: 'string', minLength: 1 } },
	body: {
		type: 'object',
		properties: {
			functionId: {
				type: 'string'
			},
			functionName: {
				type: 'string'
			},
			status: {
				type: 'string',
				enum: FunctionStatuses
			}
		},
		additionalProperties: false
	}
}

export const FunctionUpdateEnvVarsSchema = {
	params: { id: { type: 'string', minLength: 1 } },
	body: {
		type: 'object',
		required: ['envVars'],
		properties: {
			envVars: {
				type: 'object'
			}
		},
		additionalProperties: false
	}
}

export const FunctionUpdateSecretsSchema = {
	params: { id: { type: 'string', minLength: 1 } },
	body: {
		type: 'object',
		anyOf: [
			{
				required: ['secrets'],
				properties: { secrets: { type: 'object' } }
			},
			{
				required: ['secretManagement'],
				properties: { secretManagement: { type: 'object' } }
			}
		],
		additionalProperties: false
	}
}

export const FunctionGetSchema = {
	params: { id: { type: 'string', minLength: 1 } }
}

export const FunctionDeleteSchema = {
	params: { id: { type: 'string', minLength: 1 } }
}

export const FunctionDeploySchema = {
	params: { id: { type: 'string', minLength: 1 } },
	body: {
		type: 'object',
		required: ['functionId'],
		properties: {
			functionId: { type: 'string' }
		},
		additionalProperties: false
	}
}
