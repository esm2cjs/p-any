import pSome from '@esm2cjs/p-some';
import PCancelable from '@esm2cjs/p-cancelable';

export default function pAny(iterable, options) {
	const anyCancelable = pSome(iterable, {...options, count: 1});

	return PCancelable.fn(async onCancel => {
		onCancel(() => {
			anyCancelable.cancel();
		});

		const [value] = await anyCancelable;
		return value;
	})();
}

export {AggregateError} from '@esm2cjs/p-some';
