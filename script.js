const { createApp } = Vue;

createApp({
  data() {
    return {
      emails: [],
      loading: false
    };
  },

  async mounted() {

    await this.freshEmails();
  },

  methods: {

    async freshEmails() {

      try {

        this.loading = true;

        const getEmail = [];

        for (let i = 0; i < 10; i++) {

          getEmail.push(axios.get("https://flynn.boolean.careers/exercises/api/random/mail"));
        }

        const showEmail = await Promise.all(getEmail);

        this.emails = showEmail.map(response => response.data.response);

      } finally {

        this.loading = false;
      }
    },

    async refreshEmails() {

      await this.freshEmails();
    }
  }
}).mount("#app");