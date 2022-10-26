<!-- eslint-disable prettier/prettier -->
<template>
   <div>
    <!--<h3 class="title">Bienvenido - Iniciar Sesión</h3> -->
    <div class="encabezado">Productos</div>

    <div class="form-caja">
      <div class="form">

      <vue-form
        :state="formStateProducts"
        @submit.prevent="productAdd()"
        name="resgiterProduct"
      >
      <p>
        <validate class="fc my-3" tag="label" :custom="{ customValidator: customValidator }">        
            <input v-model.trim="product.name" type="text" required name="name" placeholder="Nombre*:"/>
            <field-messages class="etiqueta" name="name">
              <div>Ok.</div>
              <div slot="required">Ingrese un nombre por favor.</div>
              <div slot="customValidator">Ya existe un produto con el mismo nombre. Intente otro.</div>
            </field-messages>
        </validate>
</p>
<p>
        <validate class="fc my-3" tag="label" :custom="{ priceValidator: priceValidator }">

            <input
              v-model.number="product.price"
              type="number"
              required
              name="price"
              min="1"
              max="9999"
              placeholder="Precio*:"
            />

            <field-messages class="etiqueta" name="price">
              <div>Ok.</div>
              <div slot="required">Ingrese un precio por favor.</div>
              <div slot="priceValidator">La comida sin TACC no debe costar mas de $1500</div>
              <div slot="min">El valor debe ser numerico mayor a cero.</div>
              <div slot="max">El valor debe ser numerico menor a 9999.</div>
            </field-messages>
      
        </validate>
</p>
<p>
        <validate class="fc my-3" tag="label" :custom="{ categoryValidator: categoryValidator }">
          <p>Categoria*:</p>
            <select id="category" v-model="product.category" name="category" required>
              <option value="Comida rápida">Comida rápida</option>
              <option value="Comida vegana">Comida vegana</option>
              <option value="Comida sin TACC">Comida sin TACC</option>
            </select>
            <field-messages class="etiqueta" name="category">
              <div>Ok.</div>
              <div slot="required">Seleccione una categoria</div>
              <div slot="categoryValidator">La comida sin TACC no debe costar mas de $1500</div>
            </field-messages>

        </validate>
        </p>
        <p>
        <validate class="fc my-3" tag="label" :custom="{ activoValidator: activoValidator }">
          <div>¿Disponible para la venta?
            <input
              id="si"
              name="activo"
              value="1"
              checked="checked"
              type="radio"
              v-model="product.activo"
            />
            <label for="si">
              <span></span> Si
            </label>

            <input id="no" name="activo" value="2" type="radio" v-model="product.activo" />
            <label for="no">
              <span></span> No
            </label>
            
            </div>
        </validate>
</p>
          <div class="fila">
            <button type="submit" class="btn btn-primary" @keyup.enter="submit">{{ etiqueta }}</button>
            <button class="btn btn-primary" @click.prevent="resetProduct()">Cancelar</button>
          </div>


     
            </vue-form>

             <ProductsTableComponente @productController="productController($event)"></ProductsTableComponente>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import ProductsTableComponente from '@/components/ProductsTableComponente.vue';

export default {
  name: 'ProductFormComponent',

  components: {
    ProductsTableComponente,
  },
  data() {
    return {
      formStateProducts: {},
      product: {
        id: '',
        name: '',
        price: '',
        category: '',
        activo: 1,
        id_producto: 0,
        cant: 0,
        negocio: 1,
        image: '',
      },
      etiqueta: 'Nuevo',
    };
  },
  methods: {
    async productAdd() {
      if (this.formStateProducts.$invalid) {
        this.$alert(
          'Los datos no son correctos. Verifiquelos por favor.',
          'Atención',
          'error',
        );
        return;
      }
      if (this.productNew) {
        const objProduct = { ...this.product };
        await this.productSave(objProduct)
          .then((resp) => {
            console.log(resp);
            this.$alert('Se ha creado el producto.', 'Atención', 'success');
            this.$store.dispatch('productsFromApi');
            this.resetProduct();
          })
          .catch((err) => {
            this.$alert(`No pudo crearse el producto. Intente de nuevo. ${err}`);
          })
          .finally();
      } else {
        // actualizar...
        this.$confirm('¿Seguro desea actualizar este producto?', 'Atención', 'question').then(
          async () => {
            await this.$store
              .dispatch('productUpdate', this.product)
              .then((resp) => {
                console.log(resp);
                this.$alert('Se ha actualizado el producto.', 'Atención', 'success');
                this.$store.dispatch('productsFromApi');
                this.resetProduct();
              })
              .catch((err) => {
                this.$alert(`No se pudo actualizar el producto. Intente de nuevo. ${err}`);
              })
              .finally();
          },
        );
      }
    },
    async productSave(objToSave) {
      await this.$store.dispatch('productSave', objToSave);
    },

    resetProduct() {
      this.product = {
        id: '',
        name: '',
        price: '',
        category: '',
        activo: 1,
        id_producto: 0,
        cant: 0,
        negocio: 1,
        image: '',
      };
      this.etiqueta = 'Nuevo';
    },
    async productController(objController) {
      if (objController.function === 'update') {
        this.product.id = objController.product.id;
        this.product.name = objController.product.name;
        this.product.price = objController.product.price;
        this.product.category = objController.product.category;
        this.product.activo = objController.product.activo;
        this.product.cant = objController.product.cant;
        this.product.negocio = objController.product.negocio;
        this.product.image = objController.product.image;

        this.etiqueta = 'Actualizar';
      } else {
        // delete
        this.$confirm('¿Seguro desea eliminar este producto?', 'Atención', 'question')
          .then(async () => {
            const { id } = objController.product;
            await this.$store
              .dispatch('productDelete', id)
              .then(async () => {
                this.$alert('Se ha eliminado el producto.', 'Atención', 'success');
                await this.$store.dispatch('productsFromApi');
                this.resetProduct();
              })
              .catch(console.log('no se borro el producto'));
          })
          .catch(console.log('error en el cancel o dijo que no'));
      }
    },
    customValidator() {
      return !this.productExists();
    },
    activoValidator() {
      return !!this.product.activo;
    },
    priceValidator() {
      const respuesta = true;
      return respuesta;
    },

    inputToUpperCase(value) {
      return value.toString().toUpperCase();
    },
    productExists() {
      let respuesta = false;
      const param = this.product.name.toUpperCase();

      const prodExists = this.products.find((prod) => {
        const valor = prod.name;
        const compareValue = valor.toUpperCase();
        return compareValue === param && !this.productNew && prod.id !== this.product.id;
      });
      if (prodExists) {
        respuesta = true;
      }
      return respuesta;
    },
    categoryValidator() {
      let respuesta = true;
      if (this.product.category === 'Comida sin TACC') {
        if (this.product.price > 1500) {
          // si es sin tacc debiera valer menos de 1500.
          respuesta = false;
        }
      }
      return respuesta;
    },
    onCancel() {
      console.log('User cancelled the loader.');
    },
  },
  computed: {
    ...mapGetters('products', ['getProducts']),
    products() {
      return this.$store.getters.getProducts;
    },
    productNew() {
      return this.etiqueta === 'Nuevo';
    },
  },
};
</script>

<style scoped>
label,
p {
  display: block;
  letter-spacing: 1px;
}

.etiqueta {
  display: block;
  letter-spacing: 1px;
}
button {
  width: 85px;
  height: 35px;
  border: none;
  margin-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}
input[type="radio"] + label {
  font-weight: 400;
  font-size: 14px;
}
input[type="radio"] + label span {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -2px 10px 0 0;
  vertical-align: middle;
  cursor: pointer;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 3px solid #ffffff;
}
input[type="radio"] + label span {
  background-color: #fff;
}
input[type="radio"]:checked + label {
  color: #333;
  font-weight: 700;
}
input[type="radio"]:checked + label span {
  background-color: orange;
  border: 2px solid #140a0a;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
input[type="radio"] + label span,
input[type="radio"]:checked + label span {
  -webkit-transition: background-color 0.24s linear;
  -o-transition: background-color 0.24s linear;
  -moz-transition: background-color 0.24s linear;
  transition: background-color 0.24s linear;
}
</style>
