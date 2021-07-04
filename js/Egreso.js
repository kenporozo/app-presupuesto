class Egreso extends Dato{
    
    static idContador = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this.id = ++Ingreso.idContador;
    }

    get getId(){
        return this.id;
    }
}