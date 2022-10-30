<template>
  <div id="app">
    <HeaderComponent />
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
* {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.42857143;
  color: black; /* #959595; */
  box-sizing: border-box;
}

body {
  font-family: Arial;
  margin: 0;
}

/* Header/Logo Title */
.header {
  padding: 20px;
  text-align: center;
  color: rgb(214, 142, 45);
  background-image: url("../src/assets/tituloHeader5.png");
  background-size: cover;
  height: 250px;
  display: flex;
  align-items: flex-end;
}
.header div {
  background-color: rgb(87, 82, 13);
  height: 50px;
  padding: 10px;
}
.header div a {
  text-decoration: none;
  color: rgb(214, 142, 45);
}
.header div a:hover {
  color: aquamarine;
}

.encabezado {
  text-align: center;
  color: rgb(214, 142, 45);
  padding-block: 5px;
  font-size: 2em;
  font-weight: bold;
}

/* Page Content */
.content {
  padding: 20px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  /* width: 800px; */
  margin-left: auto;
  margin-right: auto;
}

.scroll {
  display: block;
  border: 0px solid red;
  padding: 5px;
  margin-top: 5px;
  width: 100%;
  height: 100px;
  overflow-y: scroll;
}
/* barra de tareas */
.navbarMenu {
  display: inline-flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

.form-caja {
  background-color: #fff;
  padding: 20px 30px 30px 30px;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  margin: 20px auto;
}

.btn-primary {
  color: #fff;
  background-color: rgb(214, 142, 45);
  border-color: rgb(214, 142, 45);
  margin-bottom: 10px;
  font-size: 16px;
}
.class-label {
  color: #04000a;
}
.divbtn {
  text-align: center;
}

.title {
  text-align: center;
  font-weight: bold;
  color: #504c4c;
}
p {
  position: relative;
}

.fila {
  display: flex;
  direction: rtl;
  column-span: 10px;
  gap: 10px;
}
.moneyCell {
  text-align: right;
}
input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  height: 30px;
  line-height: 60px;
  border-radius: 4px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
  width: 100%;
  padding: 0 0 0 10px;
  margin: 0;
  color: #8a8b8e;
  border: 1px solid #c2c0ca;
  font-style: normal;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  display: inline-block;
  background: none;
}
.tabla-negocio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 575px) {
  * {
    max-width: 100%;
  }
}
</style>
