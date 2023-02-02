import { firebaseConfig } from './config';

describe('Given "config.ts', () => {
    describe('When there are process & env="test"', () => {
        // During testing in React node is executed with NODE_ENV = test
        test('Then intialConfig shoul return test apiKey', () => {
            const config = firebaseConfig();
            console.log(config);
            const result = {
                apiKey: 'test-api-key',
                authDomain: 'test-auth-domain',
                projectId: 'test-project-id',
                storageBucket: 'test-storage-bucket',
                messagingSenderId: 'test-messaging-sender-id',
                appId: 'test-app-id',
                measurementId: 'test-measurement-id',
            };
            expect(config).toEqual(result);
        });
    });

    describe('When there are process and NODE_ENV="development"', () => {
        // During THIS testing node is executed with NODE_ENV = development
        let previousEnv: NodeJS.ProcessEnv;
        beforeEach(() => {
            previousEnv = process.env;
            Object.defineProperty(process, 'env', {
                value: { ...process.env, NODE_ENV: 'development' },
            });
        });

        test('Then keys should be  undefinded', () => {
            const config = firebaseConfig();
            
            const result = {
                apiKey: undefined,
                authDomain: undefined,
                projectId: undefined,
                storageBucket: undefined,
                messagingSenderId: undefined,
                appId: undefined,
                measurementId: undefined,
            };
            expect(config).toEqual(result);
        });

        afterEach(() => {
            process.env = previousEnv;
        });
    });

});
