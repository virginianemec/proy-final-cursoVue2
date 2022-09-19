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
          imagen: 'logo',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 2,
          nombre: 'Ensalada',
          imagen: 'logo',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
		{
          id: 7,
          nombre: 'Arroz yamani con acelgas salteadas x 500gr',
          imagen: 'logo',
          precio: 510,
          // no se si necesito cantidad.
          cantidad: 0,
        },
		{
          id: 8,
          nombre: 'Canelones de acelga x 6',
          imagen: 'logo',
          precio: 1250,
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
      ofertas: [
        {
          id: 1,
          nombre: 'Sand. Vegano',
          imagen: 'logo',
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
          nombre: 'Hamburguesa de Lenteja',
          imagen: 'logo',
          precio: 75,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 4,
          nombre: 'Tostadas integrales',
          imagen: 'logo',
          precio: 85,
          // no se si necesito cantidad.
          cantidad: 0,
        },
		{
          id: 5,
          nombre: 'Tofu x 500gr',
          imagen: 'logo',
          precio: 260,
          // no se si necesito cantidad.
          cantidad: 0,
        },
		{
          id: 6,
          nombre: 'Empanadas de soja x 12 u',
          imagen: 'logo',
          precio: 1500,
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
      ofertas: [],
    },
  ],
};
