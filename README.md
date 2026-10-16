# Redux & Redux Toolkit (RTK) — Quick Reference Cheat Sheet

---

## 1. Core Mental Model: The Mall & Shops

* **Store (`configureStore`):** The Mall. Holds the entire global application state in one place.
* **Reducers / Slices (`createSlice`):** Individual Shops in the mall. Each manages its own isolated section of state (inventory, cart, user).
* **Actions:** Orders or requests (e.g., `{ type: 'cart/addItem', payload: item }`).
* **Dispatch:** The messenger that delivers the order to the store.
* **Middleware:** `Security` checkpoints or handlers (logging, async operations) intercepting actions before they hit reducers.
* **React-Redux (`Provider`, hooks):** The escalator connecting customers (React components) to the mall.

```
UI Component ──(dispatch action)──► Middleware ──► Reducers ──► Store Updates ──► UI Re-renders

```

---

## 2. Package Separation

| Package | Purpose | Core APIs |
| --- | --- | --- |
| **`@reduxjs/toolkit`** | State logic engine | `configureStore`, `createSlice`, `createAsyncThunk` |
| **`react-redux`** | React UI bindings | `<Provider>`, `useSelector`, `useDispatch` |

---

## 3. Implementation Workflow

### Step 1: Create a Slice (`src/features/counterSlice.js`)

`createSlice` generates action creators and action types automatically. RTK uses **Immer** under the hood, allowing safe "mutating" syntax.

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer handles immutability
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Action type generated: "counter/incrementByAmount"
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

```

---

### Step 2: Configure the Store (`src/app/store.js`)

`configureStore` sets up Redux DevTools and `redux-thunk` automatically.

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Combines automatically into root state
  },
});

```

---

### Step 3: Provide Store to React (`src/index.js` or `App.jsx`)

Wrap your root component with `Provider` from `react-redux`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

```

---

### Step 4: Use in Components with Hooks (`src/features/Counter.jsx`)

* **`useSelector`:** Extracts state. Always select granular state to avoid unnecessary re-renders.
* **`useDispatch`:** Dispatches actions to trigger state updates.

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

export function Counter() {
  // Good: Selects only the needed slice
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

```

---

## 4. Async Data Fetching

### Option A: `createAsyncThunk` (Standard RTK)

Generates three action types automatically: `pending`, `fulfilled`, and `rejected`.

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Define async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users');
      return response.data; // Passed as action.payload in fulfilled
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message); // Passed in rejected
    }
  }
);

// 2. Handle lifecycle in extraReducers
const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;

```

---

### Option B: Thunk vs. Saga Mental Model

| Feature | `redux-thunk` / `createAsyncThunk` | `redux-saga` |
| --- | --- | --- |
| **How it triggers** | Dispatch a function (`dispatch(fetchUsers())`) | Dispatch a plain action (`dispatch({ type: 'USERS_REQUESTED' })`) |
| **Under the hood** | Intercepts function before reducers, calls it with `(dispatch, getState)` | Listens via generator functions (`takeEvery`, `call`, `put`) |
| **Best used for** | 95% of React applications | Complex orchestration (cancellations, debouncing, polling) |

---

## 5. Critical Gotchas

1. **`useSelector(state => state)` anti-pattern:** Returning the entire state causes your component to re-render on **any** state update in the entire app. Always extract specific fields: `state => state.user.name`.
2. **Do not catch and return errors directly in `createAsyncThunk`:** Doing `catch (e) { return e; }` marks the promise as resolved and triggers `.fulfilled`. Use `return rejectWithValue(err)` instead.
3. **`extraReducers` vs `reducers`:**
* `reducers`: Generates internal action creators (`counter/increment`).
* `extraReducers`: Responds to external actions from other slices or async thunks without generating action creators.


4. **Middleware `.concat()`:** When customizing middleware in `configureStore`, always use `getDefaultMiddleware().concat(customMiddleware)` to avoid wiping out the defaults (`thunk`, serialization checks).
