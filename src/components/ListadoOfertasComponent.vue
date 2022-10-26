<template>
  <div>
    <h1 class="encabezado">Ofertas de la semana!</h1>
    <table>
     <thead>
          <tr>
            <th>Cant.</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody v-for='(oferta, index) in ofertas' :key='index'>
          <!--<CardOferta
            :id='oferta.id'
            :nombre='oferta.nombre'
            :precio='oferta.precio'
            :imagen='oferta.imagen'
            :cantidad='oferta.cantidad'
          >
            ></CardOferta> -->
      {{ oferta }}
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListadoOfertasComponent',
  props: {
    ofertas: [],
  },
};
</script>
