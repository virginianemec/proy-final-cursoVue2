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
      productos: [],
      ofertas: [],
    },
  ],
};
