
export const cards = [{

    cliente: [
        { title: 'BIENVENIDO A COMSERVY', photo: '../../../assets/image/plato.png', message: 'Gracias por elegirnos una vez más', action: '' },
        { title: 'BUSCAR MESA', photo: '../../../assets/image/qr-home.png', message: 'Escanea el código QR de la entrada para anotarte en la lista de espera o busca tu mesa si ya tenias una reserva.', action: 'qr' },
        { title: 'TU MESA', photo: '../../../assets/image/menu.png', message: 'Escanea el código QR de tu mesa para acceder al menu.', action: 'mesa'},
        { title: 'RESERVA', photo: '../../../assets/image/calendario.png', message: 'Reserva una mesa cuando quieras.', action: 'reserva' },
        { title: 'DELIVERY', photo: '../../../assets/image/delivery.png', message: 'Pedí tu comida de donde quieras que estes.', action: 'reserva' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Nos interesa tu opinion.', action: 'encuestaCliente' },
        { title: 'MI PERFIL', photo: '../../../assets/image/user.png', message: '', action: 'perfil' }
    ],
    anonimo: [
        { title: 'BIENVENIDO A COMSERVY', photo: '../../../assets/image/plato.png', message: 'Gracias por elegirnos una vez más', action: '' },
        { title: 'BUSCAR MESA', photo: '../../../assets/image/qr-home.png', message: 'Escanea el código QR de la entrada para anotarte en la lista de espera.', action: 'qr' },
        { title: 'TU MESA', photo: '../../../assets/image/menu.png', message: 'Escanea el código QR de tu mesa para acceder al menu.', action: 'mesa'}
    ],
    duenio: [
        { title: 'ALTAS', photo: '../../../assets/image/add.png', message: 'Agrega nuevos dueños/supervisores, empleados o mesas.', action: 'altas' },
        { title: 'APROBACIONES PENDIENTES', photo: '../../../assets/image/user-add.png', message: 'Lista de clientes registrados sin ser aprobados.', action: 'aprobarUsuario' },
        { title: 'RESERVAS', photo: '../../../assets/image/calendario.png', message: 'Confirma reservas hechas por los clientes.', action: 'checkReserva' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Lista de todas las comandas realizadas.', action: 'listaComandas' },
        { title: 'MI PERFIL', photo: '../../../assets/image/supervisor.png', message: '', action: 'perfil' }
    ],
    supervisor: [
        { title: 'ALTAS', photo: '../../../assets/image/add.png', message: 'Agrega nuevos dueños/supervisores, empleados o mesas.', action: 'altas'  },
        { title: 'APROBACIONES PENDIENTES', photo: '../../../assets/image/user-add.png', message: 'Lista de clientes registrados sin ser aprobados.', action: 'aprobarUsuario' },
        { title: 'RESERVAS', photo: '../../../assets/image/calendario.png', message: 'Confirma reservas hechas por los clientes.', action: 'checkReserva' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Selecciona un empleado o un cliente y llena un formulario con datos referentes a la persona.', action: 'encuestaSupervisor' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Lista de todas las comandas realizadas.', action: 'listaComandas' },
        { title: 'MI PERFIL', photo: '../../../assets/image/supervisor.png', message: '', action: 'perfil' }
    ],
    metre: [
        { title: 'ALTA CLIENTE', photo: '../../../assets/image/user-add.png', message: 'Agrega nuevos clientes al restaurante.', action: 'altaCliente' },
        { title: 'LISTA DE ESPERA', photo: '../../../assets/image/lista-espera.png', message: 'Acepta el ingreso de clientes al restaurante.', action: 'listaEspera' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Lista de todas las comandas realizadas.', action: 'listaComandas' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Dinos como fue entregado el espacio de trabajo.', action: 'encuestaEmpleado' },
        { title: 'MI PERFIL', photo: '../../../assets/image/bartender.png', message: '', action: 'perfil' }
    ],
    mozo: [
        { title: 'COMANDAS', photo: '../../../assets/image/plato.png', message: 'Realiza o confirma nuevas comandas.', action: 'confirmarPedido' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Lista de todas las comandas realizadas.', action: 'listaComandas' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Dinos como fue entregado el espacio de trabajo.', action: 'encuestaEmpleado' },
        { title: 'MI PERFIL', photo: '../../../assets/image/bartender.png', message: '', action: 'perfil' }
    ],
    cocinero: [
        { title: 'ALTA PLATO', photo: '../../../assets/image/producto.png', message: 'Agrega nuevos platos al menú.', action: 'altaProducto' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Confirma las comandas ya preparadas.', action: 'listaComandas' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Dinos como fue entregado el espacio de trabajo.', action: 'encuestaEmpleado' },
        { title: 'MI PERFIL', photo: '../../../assets/image/cocinero.png', message: '', action: 'perfil' }
    ],
    bartender: [
        { title: 'ALTA BEBIDA', photo: '../../../assets/image/bebida.png', message: 'Agrega nuevas bebidas al menú.', action: 'altaProducto' },
        { title: 'LISTA DE COMANDAS', photo: '../../../assets/image/comanda.png', message: 'Confirma las comandas ya preparadas.', action: 'listaComandas' },
        { title: 'ENCUESTA', photo: '../../../assets/image/encuesta.png', message: 'Dinos como fue entregado el espacio de trabajo.', action: 'encuestaEmpleado' },
        { title: 'MI PERFIL', photo: '../../../assets/image/bartender.png', message: '', action: 'perfil' }
    ],
    altas: [
        { title: 'ALTA DUEÑO/SUPERVISOR', photo: '../../../assets/image/supervisor-add.png', message: 'Agrega nuevos dueños/supervisores, empleados o mesas.', action: 'altaSupervisor'  },
        { title: 'ALTA EMPLEADO', photo: '../../../assets/image/empleado.png', message: 'Lista de clientes registrados sin ser aprobados.', action: 'altaEmpleado' },
        { title: 'ALTA MESA', photo: '../../../assets/image/plato.png', message: '', action: 'altaMesa' }
    ]
}]