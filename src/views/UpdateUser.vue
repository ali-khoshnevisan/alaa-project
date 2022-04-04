<template>
  <div class="body">
    <div class="form">
      <h4>
        دقت کنید که پس از ثبت نام و نام خانوادگی، دیگر قادر به ویرایش آن نخواهید
        بود
      </h4>
      <label for="">نام</label>
      <input type="text" placeholder="نام" v-model="firstName" />
      <label for="">نام خانوادگی</label>
      <input type="text" placeholder="نام خانوادگی" v-model="lastName" />
      <label for="">جنسیت</label>
      <select @change="genderChanged" class="standard-select">
        <option v-if="this.user.gender" value="">
          {{ this.user.gender.title }}
        </option>
        <option v-else value="">جنسیت خود را مشخص کنید</option>
        <option v-for="gender in genders" :key="gender.id">
          {{ gender.title }}
        </option>
      </select>
      <label for="">استان</label>
      <select @change="provinceChanged" class="standard-select">
        <option v-if="this.user.province" value="">
          {{ this.user.province }}
        </option>
        <option v-else value="">استان خود را انتخاب کنید</option>
        <option v-for="province in provinces" :key="province.id">
          {{ province.title }}
        </option>
      </select>
      <label for="">شهر</label>
      <select @change="cityChanged" class="standard-select">
        <option v-if="this.user.shahr" value="">
          {{ this.user.shahr.title }}
        </option>
        <option v-else value="">شهر خود را انتخاب کنید</option>
        <option v-for="city in selectedCities" :key="city.id">
          {{ city.title }}
        </option>
      </select>
      <label for="">رشته</label>
      <select @change="majorChanged" class="standard-select">
        <option v-if="this.user.major" value="">
          {{ this.user.major.title }}
        </option>
        <option v-else value="">رشته خود را انتخاب کنید</option>
        <option v-for="major in majors" :key="major.id">
          {{ major.title }}
        </option>
      </select>
      <button class="success" @click="editUser()">ثبت</button>
      <button class="reject" @click="Cancle()">لغو</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  props: ["user1"],
  data() {
    return {
      editError: "",
      firstName: "",
      lastName: "",
      user: {},
      genders: [],
      majors: [],
      cities: [],
      provinces: [],
      selectedCities: [],
      gender_id: 0,
      major_id: 0,
      shahr_id: 0,
      province: null,
    };
  },
  methods: {
    getGender() {
      axios.get("/megaroute/getUserFormData").then((res) => {
        this.genders = res.data.data.genders;
      });
    },
    getMajor() {
      axios.get("/megaroute/getUserFormData").then((res) => {
        this.majors = res.data.data.majors;
      });
    },
    getProvinces() {
      axios.get("/megaroute/getUserFormData").then((res) => {
        this.provinces = res.data.data.provinces;
      });
    },
    getCities() {
      axios.get("/megaroute/getUserFormData").then((res) => {
        this.cities = res.data.data.cities;
      });
    },
    genderChanged(e) {
      this.user.gender = e.target.value;
      let selectedGender = this.genders.filter(
        (gender) => gender.title == e.target.value
      );
      this.gender_id = selectedGender[0].id;
    },
    majorChanged(e) {
      this.user.major = e.target.value;
      let selectedMajor = this.majors.filter(
        (major) => major.title == e.target.value
      );
      this.major_id = selectedMajor[0].id;
    },
    cityChanged(e) {
      this.user.city = e.target.value;
      let selectedCity = this.cities.filter(
        (city) => city.title == e.target.value
      );
      this.shahr_id = selectedCity[0].id;
    },
    provinceChanged(e) {
      this.province = e.target.value;
      let selectedCities = this.cities.filter(
        (city) => city.province.title == this.province
      );
      this.selectedCities = selectedCities;
      let savedSelectedCities = JSON.stringify(this.selectedCities);
      localStorage.setItem("savedSelectedCities", savedSelectedCities);
    },
    editUser() {
      let userUpdated = {
        first_name: this.firstName,
        last_name: this.lastName,
        major_id: this.major_id,
        gender_id: this.gender_id,
        shahr_id: this.shahr_id,
        grade_id: 0,
        _method: "PUT",
      };
      axios
        .post(`/user/${this.user.id}`, userUpdated)
        .then((res) => {
          this.user = res.data.data;
          this.user.province = this.province;
          localStorage.setItem("user", JSON.stringify(this.user));
          this.$router.push("/Profile");
        })
        .catch((err) => {
          this.$store.commit("logout");
          this.$router.push("/");
        });
    },
    Cancle() {
      this.$router.push("/Profile");
    },
  },
  created() {
    let User = JSON.parse(localStorage.getItem("user"));
    this.user = User;
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.getCities();
    this.getProvinces();
    this.getGender();
    this.getMajor();
    if (this.user.province) {
      this.selectedCities = JSON.parse(
        localStorage.getItem("savedSelectedCities")
      );
    }
    if (this.user.gender) {
      this.gender_id = this.user.gender.id;
    }
    if (this.user.major) {
      this.major_id = this.user.major.id;
    }
    if (this.user.shahr) {
      this.shahr_id = this.user.shahr.id;
    }
  },
};
</script>

<style>
.body {
  box-sizing: border-box;
  height: 100vh;
}
h4 {
  text-align: center;
  margin: 20px auto;
}
.form {
  z-index: 10;
  position: absolute;
  background: #fff;
  width: 35%;
  margin: 20px auto;
  margin-left: 495px;
  padding: 10px;
  display: -webkit-box;
  display: flex;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 5px 12px 25px rgba(0, 0, 0, 0.2);
}
.form label {
  text-align: right;
  margin: 5px;
}
.success {
  width: 40%;
  margin: 10px 10px;
  padding: 5px;
  background-color: rgb(69, 194, 69);
  border: 2px solid green;
  border-radius: 0.4em;
  cursor: pointer;
  display: inline-block;
}
.success:active{
  background: rgb(42, 121, 42);
}
.reject {
  width: 40%;
  margin: 10px 10px;
  padding: 5px;
  background-color: rgb(194, 69, 69);
  border: 2px solid rgb(128, 0, 0);
  border-radius: 0.4em;
  cursor: pointer;
  display: inline-block;
}
.reject:active{
  background: rgb(149, 31, 31);
}
</style>