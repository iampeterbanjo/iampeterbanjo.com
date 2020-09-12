import { StoreModel } from '../../../models';

export default {
	up: async () => {
		const defaultStore = {
			domain: 'samarkand.local',
			shipping: {
				total: 10,
				currency: 'GBP',
			},
		};
		await new StoreModel(defaultStore).save();
	},
	down: async () => {
		await StoreModel.remove({ domain: 'samarkand.local' });
	},
};
