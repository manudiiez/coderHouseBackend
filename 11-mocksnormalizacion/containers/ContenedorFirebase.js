import { firestore } from '../config/clientFirestore.js'

export class ContenedorFirebase {
    constructor(collection) {
        this.collection = firestore.collection(collection)
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get()
            const results = []
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            })
            return results
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async save(item) {
        try {
            const ref = await this.collection.add(item)
            return { ...item, id: ref.id }
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    async getById(id) {
        try {
            const snapshot = await this.collection.doc(id).get();
            if (!snapshot.data()) {
                throw new Error('No se encotraron documentos con ese id')
            }
            
            return {id: snapshot.id,  ...snapshot.data()}
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, body) {
        try {
            await this.collection.doc(id).update(body);
            return this.getById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            await this.collection.doc(id).delete();
        } catch (error) {
            throw new Error(error)
        }
    }
}