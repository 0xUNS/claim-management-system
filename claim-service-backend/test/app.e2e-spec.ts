import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    await prisma.cleanDatabase();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Controller', () => {
    it('should redirect to swagger', async () => {
      return pactum
        .spec()
        .get('/')
        .expectStatus(302)
        .expectHeader('location', '/api');
    });

    it('should return health status', () => {
      return pactum
        .spec()
        .get('/health')
        .expectStatus(200)
        .expectBody({ status: 'UP' });
    });
  });

  describe('Auth Controller', () => {
    const userDto = {
      email: 'john.doe@t-mail.co',
      password: 'secret123',
      fullName: 'John Doe',
      phoneNumber: '0612345678',
      bio: 'I am a test user',
    };

    describe('Register', () => {
      // const userResponse = {
      //   user: {
      //     id: '_id',
      //     email: 'string',
      //     fullName: 'string',
      //     phoneNumber: 'string',
      //     bio: 'string',
      //   },
      //   tokens: {
      //     access_token: 'string',
      //     refresh_token: 'string',
      //   },
      // };
      it('should register a user', async () => {
        return pactum
          .spec()
          .post('/auth/local/register')
          .withBody(userDto)
          .expectStatus(201);
      });

      it('should register a user with email & password only', async () => {});

      it('should not register a user with empty email', async () => {});

      it('should not register a user with empty password', async () => {});

      it('should not register a user with short password', async () => {});

      it('should not register a user with empty body', async () => {});

      it('should not register a user with existing email', async () => {});

      it('should not register a user with invalid email', async () => {});

      it('should not register a user with invalid email format', async () => {});
    });

    describe('Login', () => {
      it('should login a user', async () => {
        return pactum
          .spec()
          .post('/auth/local/login')
          .withBody(userDto)
          .expectStatus(200);
      });

      it('should not login a user with wrong password', async () => {
        return await pactum
          .spec()
          .post('/auth/local/login')
          .withBody({ email: userDto.email, password: 'wrong-password' })
          .expectStatus(403)
          .expectBody({
            message: 'Access Denied',
            error: 'Forbidden',
            statusCode: 403,
          });
      });

      it('should not login a user with wrong email and password', async () => {
        return await pactum
          .spec()
          .post('/auth/local/login')
          .withBody({
            email: 'wrong.email@t-mail.co',
            password: 'wrong-password',
          })
          .expectStatus(403)
          .expectBody({
            message: 'Access Denied',
            error: 'Forbidden',
            statusCode: 403,
          });
      });

      it('should not login a user with empty email', async () => {
        return await pactum
          .spec()
          .post('/auth/local/login')
          .withBody({ password: 'secret123' })
          .expectStatus(400)
          .expectBody({
            message: ['email should not be empty', 'email must be an email'],
            error: 'Bad Request',
            statusCode: 400,
          });
      });

      it('should not login a user with empty password', async () => {
        return await pactum
          .spec()
          .post('/auth/local/login')
          .withBody({ email: 'wrong.email@t-mail.co' })
          .expectStatus(400)
          .expectBody({
            message: [
              'password should not be empty',
              'password must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
      });

      it('should not login a user with empty body', async () => {
        return await pactum
          .spec()
          .post('/auth/local/login')
          .expectStatus(400)
          .expectBody({
            message: [
              'email should not be empty',
              'email must be an email',
              'password should not be empty',
              'password must be a string',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
      });
    });

    describe('Logout', () => {
      it('should logout a user', async () => {});

      it('should not logout a user with invalid token', async () => {});

      it('should not logout a user with empty token', async () => {});

      it('should not logout a user with empty body', async () => {});

      it('should not logout a user with invalid token type', async () => {});

      it('should not logout a user with invalid token format', async () => {});

      it('should not logout a user with invalid token signature', async () => {});

      it('should not logout a user with expired token', async () => {});

      it('should not logout a user with revoked token', async () => {});
    });

    describe('Refresh Tokens', () => {
      it('should refresh tokens', async () => {});

      it('should not refresh tokens with invalid token', async () => {});

      it('should not refresh tokens with empty token', async () => {});

      it('should not refresh tokens with empty body', async () => {});

      it('should not refresh tokens with invalid token type', async () => {});

      it('should not refresh tokens with invalid token format', async () => {});

      it('should not refresh tokens with invalid token signature', async () => {});

      it('should not refresh tokens with expired token', async () => {});

      it('should not refresh tokens with revoked token', async () => {});
    });

    describe('Get User', () => {
      it('should get user', async () => {});

      it('should not get user with invalid token', async () => {});

      it('should not get user with empty token', async () => {});

      it('should not get user with empty body', async () => {});

      it('should not get user with invalid token type', async () => {});

      it('should not get user with invalid token format', async () => {});

      it('should not get user with invalid token signature', async () => {});

      it('should not get user with expired token', async () => {});

      it('should not get user with revoked token', async () => {});
    });

    describe('Update User', () => {
      it('should update user', async () => {});

      it('should not update user with invalid token', async () => {});

      it('should not update user with empty token', async () => {});

      it('should not update user with empty body', async () => {});

      it('should not update user with invalid token type', async () => {});

      it('should not update user with invalid token format', async () => {});

      it('should not update user with invalid token signature', async () => {});

      it('should not update user with expired token', async () => {});

      it('should not update user with revoked token', async () => {});
    });
  });

  describe('Claim Controller', () => {
    describe('Create Claim', () => {
      it('should create claim', async () => {});

      it('should not create claim with invalid token', async () => {});

      it('should not create claim with empty token', async () => {});

      it('should not create claim with empty body', async () => {});

      it('should not create claim with invalid token type', async () => {});

      it('should not create claim with invalid token format', async () => {});

      it('should not create claim with invalid token signature', async () => {});

      it('should not create claim with expired token', async () => {});

      it('should not create claim with revoked token', async () => {});
    });

    describe('Get Claim', () => {
      it('should get claim', async () => {});

      it('should not get claim with invalid token', async () => {});

      it('should not get claim with empty token', async () => {});

      it('should not get claim with empty body', async () => {});

      it('should not get claim with invalid token type', async () => {});

      it('should not get claim with invalid token format', async () => {});

      it('should not get claim with invalid token signature', async () => {});

      it('should not get claim with expired token', async () => {});

      it('should not get claim with revoked token', async () => {});
    });

    describe('Get Claims', () => {
      it('should get claims', async () => {});

      it('should not get claims with invalid token', async () => {});

      it('should not get claims with empty token', async () => {});

      it('should not get claims with empty body', async () => {});

      it('should not get claims with invalid token type', async () => {});

      it('should not get claims with invalid token format', async () => {});

      it('should not get claims with invalid token signature', async () => {});

      it('should not get claims with expired token', async () => {});

      it('should not get claims with revoked token', async () => {});
    });

    describe('Update Claim', () => {
      it('should update claim', async () => {});

      it('should not update claim with invalid token', async () => {});

      it('should not update claim with empty token', async () => {});

      it('should not update claim with empty body', async () => {});
    });

    describe('Archive Claim', () => {
      it('should archive claim', async () => {});

      it('should not archive claim with invalid token', async () => {});

      it('should not archive claim with empty token', async () => {});

      it('should not archive claim with empty body', async () => {});
    });

    describe('Cancel Claim', () => {
      it('should cancel claim', async () => {});

      it('should not cancel claim with invalid token', async () => {});

      it('should not cancel claim with empty token', async () => {});

      it('should not cancel claim with empty body', async () => {});
    });
  });
});
