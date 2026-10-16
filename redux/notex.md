# The Complete Guide to Redux: Architecture, Execution Flow & Mental Model

---

## 1. What is Redux?

**Redux** is a predictable, centralized state management library for JavaScript applications. It maintains the entire state of an application inside a single immutable object tree, ensuring that state transitions are strictly deterministic, traceable, and easily debugged.

---

## 2. The Mental Model: The Department Store Analogy

To build an intuitive grasp of Redux, picture running a large multi-department store:

| Shop Analogy Element | Redux Concept | Technical Reality |
| :--- | :--- | :--- |
| **The Entire Store Building** | **Redux Store** | The single global JavaScript object tree holding the state. |
| **Individual Rooms / Departments** | **State Slices** | Distinct sections of state (e.g., `cake`, `iceCream`, `auth`). |
| **Room Managers / Clerks** | **Reducers** | Pure functions responsible for updating a specific slice of state. |
| **Inventory on Shelves** | **Initial / Current State** | The actual values stored within a slice at any given point in time. |
| **Order Slips / Request Forms** | **Actions** | Plain JavaScript objects containing a `type` and an optional `payload`. |
| **Front Desk Order Drop** | **`store.dispatch(action)`** | The sole entry portal through which any state change request must pass. |
| **Store Security / Interceptors** | **Middlewares** | Third-party extension points inspecting or modifying actions before they reach the manager. |
| **Store Announcement Speakers** | **`store.subscribe()`** | The observer mechanism notifying UI components that state has updated. |

---

## 3. Core Store API

Every Redux store exposes three fundamental methods:

1. **`store.getState()`**
   Returns the current snapshot of the global state tree.
2. **`store.dispatch(action)`**
   The **only** way to initiate a state change. It feeds an action object (or thunk function, if middleware is active) into the store pipeline.
3. **`store.subscribe(listener)`**
   Registers a callback function that runs every time an action has been processed and the state tree has been updated. Calling the returned function unsubscribes the listener.

---

## 4. The Lifecycle of a Redux Setup

### Step 1: Define Initial State
Define the baseline data model for each slice of your application:
```javascript
const initialCakeState = {
  numOfCakes: 10,
};
```

### Step 2: Define Action Creators and Action Types
Actions must be plain objects containing a string `type` property:
```javascript
const BUY_CAKE = 'cake/buy';

const buyCake = (quantity = 1) => ({
  type: BUY_CAKE,
  payload: quantity,
});
```

### Step 3: Define Reducers (Pure Functions)
A reducer takes the previous state and an action, and **must return a brand-new state object** if modifications occur. Never mutate state directly:
```javascript
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    default:
      return state;
  }
};
```

### Step 4: Combine Reducers and Configure the Store
When multiple rooms (slices) exist, merge them using `combineReducers`:
```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(/* middlewares go here */));
```

### Step 5: Subscribe and Unsubscribe
```javascript
const unsubscribe = store.subscribe(() => {
  console.log('Updated State:', store.getState());
});

// Dispatch actions
store.dispatch(buyCake(2));

// Cleanup on unmount or termination
unsubscribe();
```

---

## 5. Middleware Architecture & Execution Lifecycle

Middlewares wrap around the store's base `dispatch` method, forming a bi-directional pipeline (the Russian doll / onion model).

### The Curried Function Signature
A Redux middleware is defined with three nested functions:
```javascript
const customMiddleware = (storeAPI) => (next) => (action) => {
  // 1. FORWARD FLOW (Pre-reducer)
  const result = next(action);
  // 2. REVERSE FLOW (Post-reducer)
  return result;
};
```

### Why Currying? The Two-Phase Lifecycle

1. **Setup Phase (`storeAPI` & `next`) — Runs Once at Bootup:**
   * Redux initializes `customMiddleware(storeAPI)` where `storeAPI = { getState, dispatch }`.
   * Redux composes the pipeline from right to left, handing each middleware a reference to the following middleware in line (`next`).
   * The outermost middleware function replaces `store.dispatch`.

2. **Runtime Phase (`action`) — Runs on Every Single Dispatch:**
   * Only the innermost function `(action) => { ... }` runs when an action is dispatched.

---

## 6. Execution Paths: With vs. Without Middleware

### Path A: Default (No Middleware)
When `applyMiddleware` is **not** used:
1. `store.dispatch(action)` requires a plain JavaScript object with a defined `type`.
2. The action immediately reaches the root reducer.
3. The root reducer delegates to slice reducers and calculates the new state tree.
4. Registered subscribers are notified.
5. The original **`action` object is returned** to the caller of `store.dispatch()`.

```text
store.dispatch(action) ──> Base store check ──> Reducers ──> Notify Subscribers ──> Returns action
```

---

### Path B: Middleware Pipeline (Bi-Directional Onion Flow)

When middlewares are registered (e.g., `applyMiddleware(logger, timer)`):

```text
======================= FORWARD FLOW (Inward) =======================

store.dispatch(action)
  │
  ▼
[ Middleware 1: Logger ]
  │  - Code before next(action) executes
  │  - Calls: next(action)
  ▼
[ Middleware 2: Timer ]
  │  - Code before next(action) executes (e.g. starts timer)
  │  - Calls: next(action)
  ▼
[ Base store.dispatch ]
  │  - Verifies plain object and defined 'type'
  │  - Passes action to Root Reducer
  │  - Reducers calculate new state immutably
  │  - Store notifies all active subscribers
  │  - Base dispatch returns 'action'

======================= REVERSE FLOW (Outward) ======================

  │
  ▲ (Returns 'action')
[ Middleware 2: Timer ]
  │  - Code after next(action) resumes (e.g. stops timer, logs duration)
  │  - Returns result up the chain
  ▲
[ Middleware 1: Logger ]
  │  - Code after next(action) resumes (e.g. logs store.getState())
  │  - Returns result to caller
  ▲
Caller receives the final returned value!
```

---

## 7. Handling Asynchrony with `redux-thunk`

By default, Redux reducers are strictly synchronous and cannot make HTTP calls or handle timers. Async logic is delegated to middlewares, most commonly **`redux-thunk`**.

### How `redux-thunk` Works Internally

```javascript
const thunk = ({ dispatch, getState }) => (next) => (action) => {
  // If the action is a function, intercept it and STOP!
  if (typeof action === 'function') {
    return action(dispatch, getState); // next() is NOT called!
  }

  // If the action is a regular object, pass it along
  return next(action);
};
```

### Critical Thunk Behaviors:

1. **Short-Circuiting Functions:**
   When you dispatch a function, Thunk intercepts it and executes it directly: `action(dispatch, getState)`. It **never calls `next(action)`** for functions. This protects downstream middlewares and the base store from crashing on a non-object action.

2. **Return Value Forwarding:**
   The return value of your thunk function (typically a `Promise`) is returned straight back to the caller of `store.dispatch()`. The reducer never receives this return value automatically.

3. **Re-Dispatching Starts from the Top:**
   Inside your thunk function, any call to `dispatch({ type: '...' })` starts an entirely new journey from the **very beginning** of the middleware pipeline.

### Thunk Code Pattern:

```javascript
// Async Thunk Action Creator
const fetchCakes = () => {
  return async (dispatch, getState) => {
    // 1. Dispatch plain object indicating loading
    dispatch({ type: 'cake/fetchPending' });

    try {
      const response = await fetch('https://api.example.com/cakes');
      const data = await response.json();

      // 2. Dispatch plain object with received payload
      dispatch({ type: 'cake/fetchSuccess', payload: data });
      return data;
    } catch (error) {
      // 3. Dispatch plain object on failure
      dispatch({ type: 'cake/fetchRejected', error: error.message });
      throw error;
    }
  };
};

// Invocation in code / component:
const cakes = await store.dispatch(fetchCakes());
```
