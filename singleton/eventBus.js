/**
 * v0.1 超简单的event bus
 * 一个name就对应一个callback, 后面on的覆盖前面on的
 **/ 

// 懒汉式
// 类加载阶段不进行初始化
// getInstance 判断是否有实例，没有再初始化
// 特点：加载类时较快，第一次运行时获取对象较慢

// 饿汉式
// 类加载阶段已经完成初始化，getInstance 直接返回实例；
// 特点：加载类时较慢；允许获取对象时较快；
const eventBus = (function() {
    const instance = init(); // 饿汉式
    const eventMap = {};
    function init() {
        return {
            on(name, cb) {
                eventMap[name] = cb;
            },
            off(name) {
                eventMap[name] = undefined;
            },
            emit() {
                const [name, ...arg] = arguments;
                const func = eventMap[name];
                if (func) {
                    func(arg);
                } else {
                    throw Error('no function');
                }
            }
        }
    }
    return {
        getInstance: function() {
            return instance;
        }
    }
})();


function main1() {
    const eb = eventBus.getInstance();
    eb.on('hello', (name) => {
        console.log(`hello ${name}`)
        eb.off('hello');
    })
}

function main2() {
    const eb = eventBus.getInstance();
    eb.emit('hello', 'eventBus');
}

function main3() {
    const eb = eventBus.getInstance();
    eb.emit('hello', 'hi');
}

main1();
main2();
main3();