import { FastifyInstance, FastifyRequest } from 'fastify'

import { BaseErrors } from '@blockless/gateway-core'

import { REGEX_HOST_MATCH } from '../constants'
import { AttributeCreateIPNSRequest, AttributeCreateIPNSSchema } from '../schema/attributes'
import { createName } from '../utils/nameClient'
import { makeStorageClient } from '../utils/storageClient'

export const register = (server: FastifyInstance, opts, next) => {
	server.post(
		'/',
		{
			constraints: { host: REGEX_HOST_MATCH }
		},
		async (request: FastifyRequest) => {
			const f = await request.file()
			const files = [] as File[]

			if (!f) {
				throw new BaseErrors.ERR_ATTRIBUTE_FILE_MISSING()
			}

			const buf = await f.toBuffer()
			files.push(new File([buf], 'attributes.bin'))

			const storageClient = await makeStorageClient()
			if (!storageClient) throw new BaseErrors.ERR_ATTRIBUTE_FILE_MISSING()

			// Store file in web3 storage.
			const cid = await storageClient.uploadDirectory(files)

			return { cid: cid.toString() }
		}
	)

	server.post(
		'/ipns/name',
		{
			constraints: { host: REGEX_HOST_MATCH },
			schema: AttributeCreateIPNSSchema
		},
		async (request: AttributeCreateIPNSRequest) => {
			const { ipnsName, ipnsRecord } = request.body

			const id = await createName(ipnsName, ipnsRecord)
			if (!id) {
				throw new Error('IPNS name not created.')
			}

			return { id }
		}
	)

	next()
}
