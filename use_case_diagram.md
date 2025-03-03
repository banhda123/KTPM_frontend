# Use Case Diagram for E-commerce Application

```
+-----------------------------------------------------------------------------------------+
|                                  E-Commerce System                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  +-------------+                                                                        |
|  |             |                                                                        |
|  |  Anonymous  |                                                                        |
|  |    User     |                                                                        |
|  |             |                                                                        |
|  +------+------+                                                                        |
|         |                                                                               |
|         |                                                                               |
|         |        +------------------+      +------------------+      +----------------+ |
|         +------->|   Browse Store   |----->| View Product     |----->| Add to Cart    | |
|         |        +------------------+      +------------------+      +----------------+ |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   View Cart      |                                                   |
|         |        +------------------+                                                   |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   Register       |                                                   |
|         |        +------------------+                                                   |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   Login          |                                                   |
|                  +------------------+                                                   |
|                                                                                         |
|                                                                                         |
|  +-------------+                                                                        |
|  |             |                                                                        |
|  | Registered  |                                                                        |
|  |    User     |                                                                        |
|  |             |                                                                        |
|  +------+------+                                                                        |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   Browse Store   |                                                   |
|         |        +------------------+                                                   |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   View Cart      |                                                   |
|         |        +------------------+                                                   |
|         |                |                                                              |
|         |                v                                                              |
|         |        +------------------+                                                   |
|         |        | Apply Promo Code |                                                   |
|         |        +------------------+                                                   |
|         |                                                                               |
|         |        +------------------+      +------------------+      +----------------+ |
|         +------->|   Checkout       |----->| Enter Shipping   |----->| Select Payment | |
|         |        +------------------+      | Information      |      | Method         | |
|         |                                  +------------------+      +----------------+ |
|         |                                                                  |            |
|         |                                                                  v            |
|         |                                                            +----------------+ |
|         |                                                            | Place Order    | |
|         |                                                            +----------------+ |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   View Blog      |                                                   |
|         |        +------------------+                                                   |
|         |                                                                               |
|         |        +------------------+                                                   |
|         +------->|   Contact Us     |                                                   |
|                  +------------------+                                                   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

## Actors

1. **Anonymous User** - A visitor who has not logged in
2. **Registered User** - A user who has created an account and logged in

## Use Cases

### Anonymous User Use Cases
1. **Browse Store**
   - View featured products
   - View new arrivals
   - View best sellers
   - Browse product categories
   - Search for products

2. **View Product**
   - View product details
   - View product images
   - View product specifications
   - View product reviews
   - View related products

3. **Add to Cart**
   - Add products to shopping cart
   - Update product quantity

4. **View Cart**
   - View cart items
   - Update item quantities
   - Remove items from cart

5. **Register**
   - Create a new user account

6. **Login**
   - Authenticate with existing credentials

### Registered User Use Cases
*Includes all Anonymous User use cases, plus:*

7. **Apply Promo Code**
   - Enter and apply promotional codes to cart

8. **Checkout**
   - Validate cart for checkout
   - Enter shipping information
   - Select shipping method

9. **Select Payment Method**
   - Choose payment option (Credit/Debit Card, Bank Transfer, Cash on Delivery)

10. **Place Order**
    - Complete purchase
    - Receive order confirmation

11. **View Blog**
    - Read blog articles

12. **Contact Us**
    - Send inquiries or feedback

## Relationships

- **Browse Store** extends to **View Product** which extends to **Add to Cart**
- **View Cart** is a prerequisite for **Checkout**
- **Checkout** extends to **Enter Shipping Information** which extends to **Select Payment Method** which extends to **Place Order**
- **Register** and **Login** are prerequisites for accessing Registered User use cases
