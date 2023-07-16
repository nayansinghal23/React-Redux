// Action Creators
const newBooking = (name, amount) => {
  return {
    type: "NEW_BOOKING",
    payload: { name, amount },
  };
};

const cancelBooking = (name, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: { name, refundAmount },
  };
};

// Reducers
const reservationHistory = (oldReservationHistory = [], action) => {
  if (action.type === "NEW_BOOKING") {
    return [...oldReservationHistory, action.payload];
  } else if (action.type === "CANCEL_BOOKING") {
    return oldReservationHistory.filter(
      (record) => record.name !== action.payload.name
    );
  }
  return oldReservationHistory;
};

const cancellatonHistory = (olCancellationHistory = [], action) => {
  if (action.type === "CANCEL_BOOKING") {
    return [...olCancellationHistory, action.payload];
  }
  return olCancellationHistory;
};

const amountHistory = (oldAmountHistory = 0, action) => {
  if (action.type === "NEW_BOOKING") {
    return oldAmountHistory + action.payload.amount;
  } else if (action.type === "CANCEL_BOOKING") {
    return oldAmountHistory - action.payload.refundAmount;
  }
  return oldAmountHistory;
};

// Redux Store
const { createStore, combineReducers } = Redux;

const allReducers = combineReducers({
  reservationHistory,
  cancellatonHistory,
  amountHistory,
});

const store = createStore(allReducers);

store.dispatch(newBooking("Nayan", 200));
store.dispatch(newBooking("Prakhyat", 100));
store.dispatch(newBooking("Lodu", 50));
store.dispatch(newBooking("Lalit", 70));
console.log(store.getState());
store.dispatch(cancelBooking("Lodu", 20));
console.log(store.getState());
