# FRC Embers

## Description

Make various calls to the FRC API to retrieve information. 
* Get data from API
* Save info to disk

## Configuration
For security purposes the authorization code is not included in this repository. The authorization code must be included in a file in Base64 format. File must be called:
```bash
authCode.txt
```

Just include the Base64 code and nothing else.

```angular2html
SOMEREALLYLONGCODEWHICHISACTUALLYABASE64ENCODEDSTRING
```


## Note

*The $ indicates that we are giving commands on the command line interface (CLI), this can be done on 'Terminal' on a Mac or 'Powershell' on Windows.*

## Clone this repository

Open a terminal window, change to the directory you want to store this repository in and then clone the repository.

```bash
$ git clone https://github.com/Snookmz/frc-embers.git
```

This will create a directory called 'frc-embers' where you ran this command. e.g. if you ran this in /Users/myUserName it will create a directory 'frc-embers' under '/Users/myUserName', i.e. /Users/myUserName/frc-embers

## Change to the newly created directory

```bash
$ cd frc-embers
```

## Installation

All the third party libraries for this project are listed in a file called 'package.json'. These third party libraries are not part of the git repository. It is standard practice not to include third party libraries in the repository because it makes the repository much larger than it needs to be. So after cloning the repository we need to install the third party packages with the following command:


```bash
$ npm install
```

## Running the app

#### To run the code once

```bash
$ npm run start
```

#### To run the code in 'watch mode'

This will reload and run the code everytime you make a change. This is really handy in development because it saves you constantly having to rerun the code using the command above.

```bash
$ npm run start:dev
```

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
