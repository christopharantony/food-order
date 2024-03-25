import { ADD_ITEM, REMOVE_ITEM } from "../actions/cartActions";

const cartReducer = (state, action) => {
  const itemsCopy = [...state.items];
  let existingItemIndex;
  switch (action.type) {
    case ADD_ITEM:
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const existingItem = itemsCopy[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        itemsCopy[existingItemIndex] = updatedItem;
      } else {
        itemsCopy.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        items: itemsCopy,
      };

    case REMOVE_ITEM:
      existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = itemsCopy[existingItemIndex];

      if (existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        itemsCopy[existingItemIndex] = updatedItem;
      } else {
        itemsCopy.splice(existingItemIndex, 1);
      }

      return {
        ...state,
        items: itemsCopy,
      };

    case "CLEAR":
      return { ...state, items: [] };
  }

  return state;
};

export default cartReducer;
