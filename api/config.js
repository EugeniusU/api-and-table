const config = {
    domain: '',
    path: '/api/v4/',
    get leads() {return `${this.domain}${this.path}leads`},
    get contacts() {return `${this.domain}${this.path}contacts`},
    get users() {return `${this.domain}${this.path}users`},
    get pipelines() {return `${this.domain}${this.path}leads/pipelines`},
    get leadsWithContacts() { return `${this.domain}${this.path}leads?with=contacts`},
};

module.exports = config;
