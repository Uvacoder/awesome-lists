import { useAwesomeStore as useStore } from '.';
import { adapter } from '../../../../services/api';
import { ActionContext, ActionType as Types } from './types';

const contentActions = () => ({
	addContentItem: (context: ActionContext) => {
		const { contentText, addContentIndex } = context;

		const [title, ...restLinks] = contentText.split('\n').map((str: string) => str?.replace(/-/, '').split(','));

		const indexName = title.toString();

		if (indexName) {
			addContentIndex({ contentIndex: indexName });
		}

		const links = restLinks.map(([name, link]) => ({
			name,
			url: link,
		}));

		const content = {
			[indexName]: [...links],
		};

		useStore.getState().dispatch({
			type: Types.ADD_CONTENT_ITEM,
			payload: { contentItem: content },
		});
	},
	addContentIndex: (payload: any) => {
		useStore
			.getState()
			.dispatch({ type: Types.ADD_CONTENT_INDEX, payload });
	},
	saveAwesome: async (payload: any) => {
		try {
			const response = await adapter.post(
				'/create-awesome',
				{
					contentItem: payload.contentItem,
					title: payload.title,
				},
				{
					headers: {
						'x-user-id': payload.user_id,
					},
				},
			);

      if (response.status !== 200) { throw new Error(response.data.error); }
		} catch (error) {
			//
		}
	},
});

export { contentActions };
