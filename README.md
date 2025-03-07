## Codes task

-   Apis created

    -   /v1/api/auth/signup `POST`
    -   /v1/api/auth/login `POST`
    -   /v1/api/auth/resetpasswordrequest `POST` `send password change url to mail`
    -   /updatepassword?token=<resetpasswordtoken> `GET` `Get reset password token from mail`
    -   /v1/api/auth/resetpassword?token=<token>&password=<newpswd> `POST`
    -   /v1/api/user `GET` `token required in Authorization header`

-   Startup

    1. Update env variables `.env.sample -> .env`
    2. Push schema to db `$ npx prisma db push`
    3. Generate prisma client files `$ npx prisma generate`

-   For development `$ npm run start:dev`

-   For production
    1. Compile ts to js `$ npm run build`
    2. Start server `$ npm run start`
