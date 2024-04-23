# Welcome to KasthaShop, your exclusive destination for discovering and acquiring handcrafted treasures from Kathmandu, Nepal - items you won't find anywhere else.

## Sign Up
- **As a** new user,
- **I want to** sign up for the website via a sign-up form,
- **So that I can** access the site's functionality.
  - **When I'm on the /signup page:**
    - I should be able to enter my email, username, and password on a clearly laid out form.
    - Upon successful sign-up, I should be automatically logged in.

## Log In
- **As a** registered user,
- **I want to** log in to the website via a log-in form,
- **So that I can** access the site's functionality.
  - **When I'm on the /login page:**
    - I should be able to enter my email and password on a clearly laid out form.
    - Upon successful log-in, I should be redirected to the site's main page.

## Demo User
- **As a** guest user,
- **I want to** access the site's features without signing up or logging in,
- **So that I can** test the functionality hassle-free.
  - **When I'm on either the /signup or /login pages:**
    - I should be able to click on a "Demo User" button to access the site as a normal user.

## Log Out
- **As a** logged-in user,
- **I want to** log out via an easily accessible button,
- **So that I can** secure my account and logout whenever needed.
  - **While on any page of the site:**
    - I should be able to click on a log out button on the navigation bar.

## Products
- **As a** user,
- **I want to** view a list of products with their details,
- **So that I can** make informed purchasing decisions.
  - **GET '/products' - Retrieve all the products:**
    - I should see a list of products with their names, descriptions, prices, and preview images.
  - **POST '/products/new' - Add new product:**
    - I should be able to add a new product to the website by submitting a form with the required details.
  - **DELETE '/products/:productId' - Delete a product:**
    - I should be able to delete a product from the website by clicking on a delete button associated with it.
  - **PUT/PATCH '/products/product/:productId' - Update a product:**
    - I should be able to update the details of a product by submitting a form with the updated information.

## Reviews
- **As a** user,
- **I want to** view and manage reviews for products,
- **So that I can** make informed decisions and provide feedback.
  - **GET '/products/:productId/reviews' - Retrieve all the reviews of a product:**
    - I should be able to view all the reviews for a specific product.
  - **POST '/products/:productId/reviews/new' - Add a new review to a product:**
    - I should be able to add a new review to a product.
  - **DELETE '/products/:productId/:reviewid' - Delete a review from a product:**
    - I should be able to delete my own review from a product.
  - **PUT/PATCH '/products/:productId/:reviewId' - Update a review for a product:**
    - I should be able to update my own review for a product.

## Orders
- **As a** buyer,
- **I want to** view, place, and manage orders,
- **So that I can** complete purchases smoothly.
  - **GET '/orders' - Retrieve All Orders:**
    - I should be able to view all my orders.
  - **POST '/orders/new' - Place a New Order:**
    - I should be able to place a new order by submitting a form with the required details.
  - **'DELETE '/orders/:orderId' - Cancel an Order:**
    - I should be able to cancel an existing order by clicking on a cancel button associated with it.
  - **PUT/PATCH '/orders/:orderId' - Update Order Details:**
    - I should be able to update the details of an existing order.

## Shopping Cart
- **As a** user,
- **I want to** add, remove, and update products in my shopping cart,
- **So that I can** keep track of items I intend to purchase.
  - **GET '/cart'**: Retrieves the contents of the user's shopping cart.
  - **POST '/cart/add'**: Adds a product to the user's shopping cart.
  - **DELETE '/cart/remove/:productId'**: Removes a specific product from the user's shopping cart.
  - **PUT/PATCH '/cart/update/:productId'**: Updates the quantity of a product in the user's shopping cart.

## Wishlist
- **As a** registered user,
- **I want to** create and manage a wishlist of products,
- **So that I can** save items for future purchase or reference.
  - **GET '/wish-list' - Access Wishlist:**
    - I should have a dedicated section or page on the website where I can access my wishlist.
  - **Add Products to Wishlist:**
    - I should be able to add products to my wishlist from product pages.
  - **View Wishlist:**
    - I should be able to view a list of all the products I've added to my wishlist.
  - **Manage Wishlist:**
    - I should be able to easily manage my wishlist by adding, removing, or updating products as needed.

## Search Feature
- **As a** user,
- **I want to** search for products using a search bar,
- **So that I can** easily find items I'm interested in.
  - **Search Input Field:**
    - There should be a displayed search input field on the homepage navigation bar.
  - **Search Functionality:**
    - Upon entering a keyword or phrase into the search input field, the website should display product details matching the search query.
    - **Route:** GET /search?query={search_query}
  - **Search Results Page:**
    - Upon performing a search, I should be redirected to a search results page displaying products matching my query.
    - Each search result should include the product name, description, price, and preview image.
  - **Search Suggestions/Autocomplete:**
    - As I type my search query, the website should provide suggestions or autocomplete options based on matching product names.
  - **Clear Search Option:**
    - There should be a clear option to reset the search and return to the default homepage.

## Checkout
- **As a** buyer,
- **I want to** initiate and complete the checkout process,
- **So that I can** finalize my purchases.
  - **POST '/orders/checkout'**: Initiates the checkout process, creating an order based on the contents of the user's shopping cart.
