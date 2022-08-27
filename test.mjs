/* eslint-disable unicorn/error-message */
import test from 'ava';
import delay from 'delay';
import PCancelable, {CancelError} from '@esm2cjs/p-cancelable';
import pAny from './esm/index.js';

test('returns the first fulfilled value', async t => {
	const fixture = [
		Promise.reject(new Error(1)),
		Promise.resolve(2),
		Promise.reject(new Error(3)),
		Promise.resolve(4)
	];
	t.is(await pAny(fixture), 2);
});

test('returns the first fulfilled value #2', async t => {
	const fixture = [
		delay(100, {value: 1}),
		delay(10, {value: 2}),
		delay(50, {value: 3})
	];
	t.is(await pAny(fixture), 2);
});

test('returns the first fulfilled value that passes the filter function', async t => {
	const fixture = [
		Promise.resolve(1),
		Promise.resolve('foo'),
		Promise.resolve('unicorn')
	];
	t.is(await pAny(fixture, {filter: value => value === 'unicorn'}), 'unicorn');
});

test('returns a cancelable promise', t => {
	const fixture = [Promise.resolve(1)];

	t.true(pAny(fixture) instanceof PCancelable);
});

test('cancels all promises when returned promise is canceled', async t => {
	const canceled = [false, false];
	const fixture = [
		new PCancelable((resolve, reject, onCancel) =>
			onCancel(() => {
				canceled[0] = true;
			})
		),
		new PCancelable((resolve, reject, onCancel) =>
			onCancel(() => {
				canceled[1] = true;
			})
		)
	];

	const promise = pAny(fixture);
	promise.cancel();

	await t.throwsAsync(promise, {instanceOf: CancelError});
	t.deepEqual(canceled, [true, true]);
});

test('rejects on empty iterable', async t => {
	await t.throwsAsync(pAny([]), {instanceOf: RangeError});
});
