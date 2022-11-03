const productos = []

const getAll = (req, res) => {
    res.json('getAll')
}
const getById = (req, res) => {
    res.json('getById')
}
const save = (req, res) => {
    console.log(req)
    productos.push(req.body)
    res.json(productos)
}
const updateById = (req, res) => {
    res.json('updateById')
}
const deleteById = (req, res) => {
    res.json('deleteById')
}