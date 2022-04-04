<template>
  <div class="body">
    <div class="login-form">
      <form>
        <h1>Login/Sign Up</h1>
        <div class="content">
          <div class="input-field">
            <input
              type="number"
              placeholder="phone number"
              autocomplete="nope"
              v-model="mobile"
            />
            <p v-if="this.errorMobile" style="color: red">
              {{ this.mobileErroe[0] }}
              <br>
              {{ this.mobileErroe[1] }}
            </p>
          </div>
          <div class="input-field">
            <input
              type="password"
              placeholder="Password"
              autocomplete="new-password"
              v-model="password"
            />
            <p v-if="this.errorPass" style="color: red">
              {{ this.passwordError[0] }}
              <br>
              {{ this.passwordError[1] }}
            </p>
          </div>
          <p>wellcome to this website</p>
        </div>
        <div class="action">
          <button @click.prevent="loginUser()">sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      errorMobile: false,
      errorPass: false,
      mobile: "",
      password: "",
      mobileErroe: [],
      passwordError: [],
    };
  },
  methods: {
    loginUser() {
      axios
        .post("/login", {
          mobile: this.mobile,
          password: this.password,
        })
        .then((response) => {
          this.$store.commit("login", response.data.data.access_token);
          let user = JSON.stringify(response.data.data.user);
          localStorage.setItem("user", user);
          this.$router.push("/profile");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          if (error.response.data.errors.mobile) {
            this.errorMobile = true;
          }
          if (error.response.data.errors.nationalCode) {
            this.errorPass = true;
          }
          this.mobileErroe = error.response.data.errors.mobile;
          this.passwordError = error.response.data.errors.nationalCode;
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Rubik:400,700");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.body {
  font-family: "Rubik", sans-serif;
  height: 100vh;
}

.login-form {
  background: #fff;
  width: 500px;
  margin: 20px auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
}
.login-form h1 {
  /* padding: 25px 25px 0 25px; */
  font-weight: 300;
}
.login-form .content {
  padding: 35px;
  text-align: center;
}
.login-form .input-field {
  padding: 12px 5px;
}
.login-form .input-field input {
  font-size: 16px;
  text-align: left;
  display: block;
  font-family: "Rubik", sans-serif;
  width: 100%;
  padding: 10px 1px;
  border: 0;
  border-bottom: 1px solid #747474;
  outline: none;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.login-form .input-field input::-webkit-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-moz-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:focus {
  border-color: #222;
}
.login-form a.link {
  text-decoration: none;
  color: #747474;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  display: inline-block;
  margin-top: 20px;
}
.login-form .action {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
}
.login-form .action button {
  width: 100%;
  border: none;
  padding: 18px;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  background: #2d3b55;
  color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
  letter-spacing: 0.2px;
  outline: 0;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.login-form .action button:hover {
  background: #3c4d6d;
}
.login-form .action button:nth-child(2) {
  background: #2d3b55;
  color: #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 4px;
}
.login-form .action button:nth-child(2):hover {
  background: #3c4d6d;
}
</style>