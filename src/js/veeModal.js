const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 讀取外部的資源
// VeeValidateI18n.loadLocaleFromURL('../zh_TW.json');

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
// Activate the locale
configure({
    generateMessage: localize('zh_TW'),
  })

const app = Vue.createApp({
    data() {
        return {
            user: {
                email: ''
            }
        }
    },
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
      },
    methods: {
        onSubmit() {
            console.log(this);
        }
    }
});



app.mount('#app');
