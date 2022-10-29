<template>
     <div> <!-- class="div--container-->
      <vue-form
        :state="formStateCompra"
        @submit.prevent=""
        name="compra"
        class="form"
      >
      <p>
        <validate class="fc my-3" tag="label">      
            <input v-model.trim="compra.direccion" type="text" required name="direccion"  placeholder="Dirección*"/>
            <field-messages class="etiqueta" name="direccion">
              <div>Ok.</div>
              <div slot="required">Ingrese una direccion por favor.</div>
            </field-messages>
        </validate>
      </p>
      <p>
        <validate class="fc my-3" tag="label">
            <p>Medio de Pago*</p>
            <select id="medioPago" v-model="compra.medioPago" name="medioPago" required>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Efectivo">Efectivo</option>
            </select>
            <field-messages class="etiqueta" name="medioPago">
              <div>Ok.</div>
              <div slot="required">Seleccione un Medio de Pago</div>
            </field-messages>
        </validate>

        <div>{{mensajeMedioPago}}</div>
      </p>
      <p>
       <div class="fila"> Total: $ {{getTotal}}</div>
       <div class="fila">
          <button type="submit" class="btn btn-primary" @click="comprar()">Pagar</button>
          <button class="btn btn-primary" @click="onCancel()">Cancelar</button>
        </div>
      </p>
      </vue-form>
   </div>
</template>

<script>
export default {
  name: 'CompraForm',
  props: {
    total: Number,
  },
  data() {
    return {
      formStateCompra: {},
      compra: {
        id: '',
        direccion: '',
        medioPagoValidator: '',
      },
    };
  },
  methods: {
    comprar() {
      if (this.formStateCompra.$invalid) {
        this.$alert(
          'Los datos no son correctos. Verifiquelos por favor.',
          'Atención',
          'error',
        );
      } else {
        this.$emit('aceptarComprar');
      }
    },
    resetCompra() {
      this.compra = {
        id: '',
        direccion: '',
        medioPagoValidator: '',
      };
    },
    onCancel() {
      console.log('User cancelled la compra form.');
      this.resetCompra();
      this.$emit('onCancel');
    },
  },
  computed: {
    getTotal() {
      return (this.compra.medioPago === 'Tarjeta') ? parseFloat(this.total * 1.10).toFixed(2) : parseFloat(this.total);
    },
    mensajeMedioPago() {
      return (this.compra.medioPago && this.compra.medioPago === 'Tarjeta') ? 'Con Tarjeta 10% más. ¿Esta de acuerdo?' : '';
    },
  },

};
</script>

<style>

</style>
