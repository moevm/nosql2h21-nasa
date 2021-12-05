const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_ROOT_NAME,
    MONGO_ROOT_PASS
} = process.env;

db.auth(MONGO_ROOT_NAME, MONGO_ROOT_PASS)

db.createUser(
    {
        user: MONGO_USERNAME,
        pwd: MONGO_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: MONGO_DB
            }
        ]
    }
);

console.log('DEFAULT USER CREATED')