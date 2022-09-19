export default {
  negocios: [
    {
      id: 1,
      nombre: 'Poroto Moreno',
      categoria: 'Food Natural',
      pedidos: [
        {
          id: 1,
          usuario: '',
          fecha: '',
          total: 0,
          detalle: [
            {
              id: 1,
              nombre: 'Tostada',
              precio: 270,
            },
          ],
        },
        {
          id: 2,
          usuario: '',
          fecha: '',
          total: 0,
          detalle: [
            {
              id: 1,
              nombre: 'Gaseosa',
              precio: 180,
            },
          ],
        },
      ],
      productos: [
        {
          id: 1,
          nombre: 'Sand. Vegano',
          imagen: 'SandwichVegano',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 2,
          nombre: 'Ensalada variadito de primavera!',
          imagen: 'ensaladaVarPrimavera',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 7,
          nombre: 'Arroz yamani con acelgas salteadas x 500gr',
          imagen: 'arrozYamaniAcelga',
          precio: 510,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 8,
          nombre: 'Canelones de acelga x 6',
          imagen: 'CanelonesAcelga',
          precio: 1250,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 9,
          nombre: 'Brusqueta Mediterranea x 2u',
          imagen: 'brusquetaMediterranea',
          precio: 1200,
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
      ofertas: [
        {
          id: 1,
          nombre: 'Sand. Vegano',
          imagen: 'SandwichVegano',
          precio: 150,
          cantidad: 2,
          descuento: 50,
          tipo: '%',
          // no se si necesito cantidad.
          descripcion: 'Llevando 2, pagas el 50% cada uno!!!',
        },
      ],
    },
    {
      id: 2,
      nombre: 'Sarteneando quinoa!',
      categoria: 'Food Natural',
      pedidos: [],
      productos: [
        {
          id: 3,
          nombre: 'Ensalada de Lenteja',
          imagen: 'ensaladaLenteja',
          precio: 250,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 4,
          nombre: 'Tostadas de Frijoliltos x 1u',
          imagen: 'TostadaFrijoles',
          precio: 180,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 5,
          nombre: 'Tofu para la picada x 500gr',
          imagen: 'picaditaTofu',
          precio: 1600,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 6,
          nombre: 'Empanadas de soja x 12 u',
          imagen: 'empanadasSojaText',
          precio: 1800,
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
      ofertas: [],
    },
  ],
};
