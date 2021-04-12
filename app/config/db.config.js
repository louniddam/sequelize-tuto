module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "rootroot",
    DB: "testdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
}