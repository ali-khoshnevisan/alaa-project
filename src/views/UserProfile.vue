<template>
  <div>
    <div class="body">
      <div class="profile">
        <figure>
          <img src="..\src\assets\download.png" alt="" />
        </figure>
        <header>
          <h1>
            {{ this.user.first_name }} {{ this.user.last_name }}
            <small>عزیز خوش آمدید</small>
          </h1>
        </header>

        <main>
          <dl>
            <dt>نام</dt>
            <dd v-if="this.user.first_name">{{ this.user.first_name }}</dd>
            <dd v-else>.</dd>

            <dt>نام خانوادگی</dt>
            <dd v-if="this.user.last_name">{{ this.user.last_name }}</dd>
            <dd v-else>.</dd>

            <dt>جنسیت</dt>
            <dd v-if="this.user.gender">{{ this.user.gender.title }}</dd>
            <dd v-else>.</dd>

            <dt>شهرستان</dt>
            <dd v-if="this.user.shahr">{{ this.user.shahr.title }}</dd>
            <dd v-else>.</dd>

            <dt>رشته</dt>
            <dd v-if="this.user.major">{{ this.user.major.title }}</dd>
            <dd v-else>.</dd>
          </dl>
        </main>
        <button @click="goToUpdate">ویرایش اطلاعات</button>
      </div>
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
  methods:{
    goToUpdate(){
      this.$router.push("/Update")
    }
  },
  created() {
    let user = localStorage.getItem("user");
    this.user = JSON.parse(user);
  },
};
</script>


<style lang="scss">
$base-text-color: #151515;
$base-link-color: #1daaff;
$base-hover-color: darken($base-link-color, 20);

$profile-card-size: 500px;
$profile-avatar-size: 150px;
* {
  box-sizing: border-box;
}
body {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  user-select: none;
}
input {
  text-align: right;
  padding: 3px;
}
/* 
  some styling for display on codepen,
  you can safely remove this when you
  want to use this module somewhere else 
*/
.codepen {
  margin: 2em auto;
  h1 {
    color: lighten($base-text-color, 20);
    font-weight: 100;
  }
  a {
    color: #151515;
    text-decoration: none;
    &:hover {
      color: #3d3d3d;
    }
  }
}
button {
  width: 40%;
  color: #151515;
  margin: 0 auto;
  padding: 5px;
  background-color: rgb(69, 194, 69);
  border: 2px solid green;
  border-radius: 0.4em;
  cursor: pointer;
}
button:active {
  background-color: rgb(42, 121, 42);
}
.profile {
  background: #fff;
  @extend .codepen;
  max-width: $profile-card-size;
  border: 1px solid lighten($base-text-color, 80);
  border-radius: 20px;
  padding: 2em;
  margin: 2em auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  position: relative;

  figure {
    margin: 0;
    img {
      max-width: $profile-avatar-size;
      max-height: $profile-avatar-size;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0px 0px 20px rgba($base-text-color, 0.15);
    }
  } // end figure

  header {
    h1 {
      margin: 0;
      padding: 0;
      line-height: 1;
      small {
        display: block;
        clear: both;
        font-size: 18px;
        opacity: 0.6;
      }
    }
  } // end header

  main {
    select {
      appearance: none;
      background-color: #ffffff;
      border: 2px solid rgb(0, 0, 0);
      border-radius: 4px;
      padding: 0 1em 0 0;
      margin: 0;
      width: 30%;
      font-family: inherit;
      font-size: inherit;
      cursor: inherit;
      line-height: inherit;
      display: grid;
      grid-template-areas: "select";
      align-items: center;
      position: relative;

      z-index: 1;

      &::after {
        grid-area: select;
      }

      // Remove focus outline, will add on alternate element
      outline: none;
    }
    dl {
      display: block;
      width: 100%;
      dt,
      dd {
        // float: right;
        padding: 8px 5px;
        margin: 0;
        border-bottom: 1px solid lighten($base-text-color, 80);
        a {
          padding-right: 5px;
        }
      }
      dt {
        width: 30%;
        // padding-right: 10px;
        font-weight: bold;
        text-align: right;
        float: right;
      }
      dd {
        width: 70%;
        float: left;
      }
    }
  }

  .toggle {
    position: absolute;
    background: #fff;
    top: 30px;
    left: 30px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    text-align: center;
    z-index: 20;
    vertical-align: middle;
    box-shadow: 0px 0px 10px rgba($base-text-color, 0.15);
    cursor: pointer;
    border-radius: 20px;
    user-select: none;
    transition: box-shadow 300ms ease;
    &:hover {
      box-shadow: 0px 0px 10px rgba($base-text-color, 0.25);
    }
    main {
      font-size: 16px;
    }
  }
}
.view_details {
  position: absolute;
  top: -5000px;
  left: -5000px;
}
label {
  display: block;
  cursor: pointer;
}

@media screen and (max-width: 520px) {
  .profile {
    padding: 1em;
    margin: 1em;
  }
  .profile img {
    max-width: 100%;
    height: auto;
  }
  .profile main dl,
  .profile main dl dt,
  .profile main dl dd {
    display: block;
    width: 100%;
    float: none;
  }
  .profile main dl dt {
    border-bottom: none;
  }
  .profile main dl dd {
    margin-bottom: 10px;
  }

  .profile .toggle {
    top: 15px;
    left: 15px;
  }
}
</style>