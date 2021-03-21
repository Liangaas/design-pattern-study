const  strategyFunc = {
    'passwordAuth': ({ username, password }) => {
        console.log(`login with username: ${username}`);
    },
    'phoneAuth': ({ phoneNum, authNum }) => {
        console.log(`login with authNum: ${authNum}`);
    }
}

function loginController() {
    this.login;
}

loginController.prototype.setStrategy = function (strategy) {
    this.login = strategyFunc[strategy]
}

function main1() {
    const loginHandler = new loginController();
    loginHandler.setStrategy('passwordAuth');
    loginHandler.login({
        username: 'l',
        password: '123',
    })
}

function main2() {
    const loginHandler = new loginController();
    loginHandler.setStrategy('phoneAuth');
    loginHandler.login({
        passwordAuth: '13221234',
        authNum: '123',
    })
}

main1();
main2();
