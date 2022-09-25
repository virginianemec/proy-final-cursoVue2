export default {
  negocios: [
    {
      id: 1,
      name: 'Poroto Moreno',
      category: 'Food Natural',
      orders: [
        {
          id: 1,
          usuario: '',
          fecha: '',
          total: 0,
          detail: [
            {
              id: 1,
              name: 'Tostada',
              price: 270,
            },
          ],
        },
        {
          id: 2,
          usuario: '',
          fecha: '',
          total: 0,
          detail: [
            {
              id: 1,
              name: 'Gaseosa',
              price: 180,
            },
          ],
        },
      ],
      products: [
        {
          id: 1,
          name: 'Sand. Vegano',
          image: 'SandwichVegano',
          price: 150,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 2,
          name: 'Ensalada variadito de primavera!',
          image: 'ensaladaVarPrimavera',
          price: 150,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 7,
          name: 'Arroz yamani con acelgas salteadas x 500gr',
          image: 'arrozYamaniAcelga',
          price: 510,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 8,
          name: 'Canelones de acelga x 6',
          image: 'CanelonesAcelga',
          price: 1250,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 9,
          name: 'Brusqueta Mediterranea x 2u',
          image: 'brusquetaMediterranea',
          price: 1200,
          // no se si necesito cant.
          cant: 0,
        },
      ],
      ofertas: [
        {
          id: 1,
          name: 'Sand. Vegano',
          image: 'SandwichVegano',
          price: 150,
          cant: 2,
          discount: 50,
          typeDiscount: '%',
          // no se si necesito cant.price
          description: 'Llevando 2, pagas el 50% cada uno!!!',
        },
      ],
    },
    {
      id: 2,
      name: 'Sarteneando quinoa!',
      category: 'Food Natural',
      orders: [],
      products: [
        {
          id: 3,
          name: 'Ensalada de Lenteja',
          image: 'ensaladaLenteja',
          price: 250,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 4,
          name: 'Tostadas de Frijoliltos x 1u',
          image: 'TostadaFrijoles',
          price: 180,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 5,
          name: 'Tofu para la picada x 500gr',
          image: 'picaditaTofu',
          price: 1600,
          // no se si necesito cant.
          cant: 0,
        },
        {
          id: 6,
          name: 'Empanadas de soja x 12 u',
          image: 'empanadasSojaText',
          price: 1800,
          // no se si necesito cant.
          cant: 0,
        },
      ],
      ofertas: [],
    },
  ],
};
