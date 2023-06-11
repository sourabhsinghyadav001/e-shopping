# Read before you examine!

All info about the project is given in this readme file, after reading this file the code is assumed to be self-explanatory.

## Notes:

- I fixed the reload problem in the staged solution, in the staged solution, if you reload the page in cart or orders, the items are reset and you have to go to home>cart for seeing the items again, I have fixed that in my solution.
- I have used same css file for similar pages to avoid redundant code.
- The app relies on onSnapshot for updating state of the cart.
- The detection of tags like men's clothing, jewelery etc. are actually detected from data and shown as filter !
- Used Firebase Authentication for signIn/signUp.

## Packages used

- react-router-dom: for routing
- react-toastify: for displaying messages.
- react-spinners: for spinner in loading phase.

## CSS

- used css modules
- The Card component is reused for both Home and Cart.

## Components

- pages components like Home, Cart, Orders, SignIn, SignOut etc. are present in the pages folder.
- Made components like Navbar and Card in the components folder.

## Routing

- I have used react router-dom

## Context

- I created a common context for loggedIn state, cart and user's email.
- I created a separate Provider and custom hook to consume context.
