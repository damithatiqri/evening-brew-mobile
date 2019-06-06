<template>
  <Page class="page" actionBarHidden="true">
    <ScrollView>
      <StackLayout class="home-panel">
        <Image src="~/components/beard.png"/>
        <TextField v-model="userName" hint="User Name" class="input-field"/>
        <TextField v-model="password" type="password" hint="Password" class="input-field"/>
        <Button text="LogIn" @tap="login" class="login-btn"/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Home from "./Home";
const {
  alert,
  confirm,
  prompt,
  login,
  action,
  inputType
} = require("tns-core-modules/ui/dialogs");
export default {
  methods: {
    login() {
      const httpModule = require("http");
      var data = encodeURI(
        "username=" + this.userName + "&password=" + this.password
      );
      console.log(data);
      httpModule
        .request({
          url: "https://eveing-brew-auth.herokuapp.com/api/login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify({
            user: this.userName,
            password: this.password
          })
        })
        .then(
          response => {
            console.log("Login success");
            console.log(response.content.toJSON());
            if (response.content.toJSON() !== null) {
              this.$navigateTo(Home);
              return;
            } else {
              console.log("failed");
              alert({
                title: "Login failed",
                message: "Please try again.",
                okButtonText: "Ok"
              }).then(() => {
                console.log("The user closed the alert.");
              });
            }
          },
          e => {
            alert({
                title: "Login failed",
                message: "Please try again.",
                okButtonText: "Ok"
            }).then(() => {
              console.log("The user closed the alert.");
            });
          }
        );
    }
  },

  data() {
    return {
      userName: "",
      password: ""
    };
  }
};
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}

.login-btn {
  color: white;
  background-color: black;
  margin-top: 20;
  height: 70;
}

.input-field {
  margin-bottom: 15;
}
</style>