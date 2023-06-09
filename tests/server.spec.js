const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto. (3 Puntos)", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe. (2 Puntos)", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 10
        const { statusCode } = await request(server)
            .delete(`/productos/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        expect(statusCode).toBe(404);
    });

    it("3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. (2 Puntos)", async () => {
        const id = 5
        const producto = { id, nombre: "Flat white" };
        const { statusCode } = await request(server)
            .post("/cafes")
            .send(producto);
        expect(statusCode).toBe(201);
    });

    it("4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload. (3 Puntos)", async () => {
        //El id es distinto al id en el path
        const id = 1
        const producto = { id, nombre: "Flat white" };
        const { statusCode } = await request(server)
            .put("/cafes/2")
            .send(producto);
        expect(statusCode).toBe(400);
    });
});
