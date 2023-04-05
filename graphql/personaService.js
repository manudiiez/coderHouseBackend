const unaPersona = {
    id: '1',
    nombre: 'pepito',
    edad: 50
};

export const personasService = {
    getById: id => unaPersona,
    getAll: () => [unaPersona, unaPersona, unaPersona, unaPersona, unaPersona]
}
