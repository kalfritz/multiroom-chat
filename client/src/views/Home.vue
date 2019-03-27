<template>
  <div class="home p-5">
    <h3 class="text-center mb-5">Entre e converse com mais de 30.000 pessoas.</h3>
    <div class="text-center">
      <img src="../assets/images/img_chat_2.png" alt>
    </div>

    <form class="col-md-6 offset-md-3 mt-4" @submit.prevent="login">
      <fieldset>
        <div class="form-group">
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            id="apelido"
            placeholder="Nome ou apelido"
          >
        </div>

        <button type="submit" class="btn-lg btn-block btn-primary">Entrar</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
const LOGIN_URL = 'http://localhost:5990/login';
export default {
  data: () => ({
    user: {
      username: '',
    },
  }),
  methods: {
    login() {
      const body = {
        user: this.user.username,
      };
      console.log(body);
      fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(res => {
          this.$router.push({
            name: 'chat',
            params: { user: this.user.username },
          });
          this.user.username = '';
        });
    },
  },
  name: 'home',
};
</script>

<style>
</style>

