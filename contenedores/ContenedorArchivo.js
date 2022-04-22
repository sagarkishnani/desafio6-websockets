const { promises: fs } = require("fs");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    try {
      const elements = await this.getAll();
      let element = elements.find((el) => el.id == id);
      element ? element : null;
    } catch {
      console.log("Error al buscar elemento por ID");
    }
  }

  async listarAll() {
    try {
      let messages = await fs.readFile(`${this.ruta}`, "utf-8");
      return JSON.parse(messages);
    } catch (err) {
      console.log(`Error al leer los mensajes: ${err}`);
      return [];
    }
  }

  async guardar({ username, message, fyh }) {
    try {
      let resultado = await this.listarAll();

      let ids = 1;
      if (resultado.length > 0) {
        ids = resultado[resultado.length - 1].id + 1;
      }

      resultado.push({ username, message, fyh, id: ids });

      await fs.writeFile(`${this.ruta}`, JSON.stringify(resultado));
      return console.log(resultado);
    } catch (err) {
      console.log(`Error al guardar el Item: ${err}`);
    }
  }

  async actualizar(elem, id) {}

  async borrar(id) {
    const elements = this.getAll().filter(
      (el) => parseInt(el.id) != parseInt(id)
    );
    this.deleteAll();
    this.save(elements);
  }

  async borrarAll() {}
}

module.exports = ContenedorArchivo;
