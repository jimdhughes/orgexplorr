# OrgExplorr

## Summary

I was messing with an idea for a GUI for an organization explorer and ended up going too far. Instead of deleting the project, here it is. It's got an API and a client app.

The API is built using NestJS and MongoDB. Authentication is via a JWT and local username/password authentication.

The client is built using the Ionic Framework because I'm a fandboy. I also chose the Angular version because Angular > React IMO

Feel free to play around - I will probably make the dockerfiles work and poke around with the app in the future but I wouldn't consider it under active development or support, for now.

## API

### Dependencies

- NodeJS
- MongoDB

### Usage

Set the environment variables

```
JWT_SECRETKEY=amagickey
JWT_EXPIRESIN=1234567890
MONGODB_CONNECTIONSTRING=mongodb://localhost/orgexplorr-dev
CORS_HOSTNAME=http://localhost:8100
```

Run the app

```
npm install
npm start
```

## Client

### Dependencies

- Ionic Framework - `npm i -g @ionic/cli`
- Angular

### Usage

- Update the `src/environments/environment.ts` to fit your environment
- run `npm start`

## Notice

This is a play project - It's unlikely to be ready for prime time ever. I recommend not actually using this for anything other than satisfying your own curiosity.
