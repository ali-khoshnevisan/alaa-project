<template>
  <div class="body">
    <div class="text">
      <h1>Hello</h1>
      <h1 v-if="this.user">{{this.user.first_name}} {{this.user.last_name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
  },
};
</script>

<style>
.body {
  color: rgb(0, 0, 0);
  text-align: center;
}
.text {
  background: rgb(255, 255, 255);
  width: 30%;
  height: 40%;
  border: 2px solid black;
  border-radius: 0.9rem;
  margin: 90px auto;
  text-align: center;
}
h1 {
  margin: 50px auto;
}
</style>