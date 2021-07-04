class Dato{
    constructor(descripcion, valor){
        this.descripcion = descripcion;
        this.valor = valor;
    }

    get getDescripcion(){
        return this.descripcion;
    }

    set setDescripcion(descripcion){
        this.descripcion = descripcion;
    }

    get getValor(){
        return this.valor;
    }

    set setValor(valor){
        this.valor = valor;
    }
}