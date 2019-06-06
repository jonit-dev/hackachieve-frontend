import {
    SET_CHECKLIST_ITEM,
    FETCH_ITEMS,
    UPDATE_CHECKLIST_ITEM,
    CHANGE_ITEM_STATUS,
    DELETE_CHECKLIST_ITEM
} from "../actions/types";

const INITIAL_STATE = {
    items: [],
    isTextAreaOpen: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CHECKLIST_ITEM:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ],
            };
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case UPDATE_CHECKLIST_ITEM:
            let items = state.items
            let newItems = items.map(item => {
                if (action.payload.id === item.id) {

                    item = action.payload
                }
                return item

            });
            return {
                ...state,
                items: newItems
            };
        case CHANGE_ITEM_STATUS:
            let itemStatus = state.items
            let newItem = itemStatus.map(item => {
                if (action.payload.id === item.id) {
                    item.status = !item.status;
                }
                return item;

            });
            return {
                ...state,
                items: newItem
            };
        case DELETE_CHECKLIST_ITEM:
            const newItemDel = state.items.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                items: newItemDel
            };


        default:
            return state;
    }
}
 

