import { normalize, schema, denormalize } from 'normalizr';
import util from 'util'


export function normalizeMessages(data) {

	const newObj = {
		id: '999',
		messages: data
	}

	const user = new schema.Entity('users');
	const message = new schema.Entity('messages', {
		author: user
	});
	const chat = new schema.Entity('chat', {
		messages: [message]
	})
	const normalizedData = normalize(newObj, chat);

	// console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
	// const denormalizedData = denormalize(normalizedData.result, chat, normalizedData.entities);
	// print(denormalizedData)
	// console.log(JSON.stringify(denormalizedData).length)

	return normalizedData;
}

export function denormalizeMessages(data){
	const user = new schema.Entity('users');
	const message = new schema.Entity('messages', {
		author: user
	});
	const chat = new schema.Entity('chat', {
		messages: [message]
	})

	const denormalizedData = denormalize(data.result, chat, data.entities);

	console.log(denormalizedData.messages);

	return denormalizedData.messages
}