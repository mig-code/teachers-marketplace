import { consoleDebug } from './debug';

const log = jest.spyOn(global.console, 'log');

describe('Given "consoleDebug"', () => {
    describe('When there are process & env="test"', () => {
        // During testing in React node is executed with NODE_ENV = test
        test('Then "console.log" should not be call', () => {
            const info = 'test';
            consoleDebug(info);
            expect(log).not.toHaveBeenCalledWith();
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

        test('Then "console.log" should be call', () => {
            log.mockClear();
            const info = 'test';
            consoleDebug(info);
            expect(log).toHaveBeenCalledWith(info);
        });

        afterEach(() => {
            process.env = previousEnv;
        });
    });

    describe('When there are no process.env', () => {
        // In the browser (process not defined)
        let previousEnv: NodeJS.ProcessEnv;
        beforeEach(() => {
            previousEnv = process.env;
            Object.defineProperty(process, 'env', { value: null });
        });

        test('Then "console.log" should be call', () => {
            const info = new Error('test');
            consoleDebug(info.message);
            expect(log).toHaveBeenCalledWith(info.message);
        });
        afterEach(() => {
            process.env = previousEnv;
        });
    });
});
