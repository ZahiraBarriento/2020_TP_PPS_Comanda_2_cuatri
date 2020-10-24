export class Usuario{
    public nombre;
    public apellido;
    public dni;
    public foto;
    public perfil;

    constructor(nombre, apellido, dni, foto, perfil){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.foto = foto;
        this.perfil = perfil;
    }
}
