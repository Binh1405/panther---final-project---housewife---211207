# HouseWife

## Housewife is a distributor of household products made from safe, high-quality primary plastic.

### Motivation & Problems

- Problem: modern women, especially housewives are struggling with housework
- Motivation: the desire to upgrade Vietnamese families household plastic products that are friendly, close to life, safe, convenient thanks to unique but simple design and easy to use function

### Key features and Technical Implementation Plan

#### A. For customers:

- User account: register & login (gg)
- Product display: all items, by categories, detail single product page, cart page
- Purchasing: payment by cash
- BE search box

#### B. For admin:

- Create/Edit/Delete products
- View customer's purchasing orders, history
- Sending confirmation, promotion emails to customers
- See total sales (optional)

### Key Models

- User: name, email, password, role, cart
- Product: productId, title, price, description, content, image, reviewArr, quantity, category, selected
- Cart: user, itemArr, shipping address, payment, status (enum): pending/done
- Review: owner, text, rating

### Planning timeline:

#### Week 1: Customers

- Customers can register and sign-in/out for the site (Google). Deadline: 13h30, 7/12
- Homepage: company info, featured products,... DL: 13h30, 8/12
- Product page: by categories, detail product page with review. DL: 13h30, 8/12
- Cart page with payment. DL: 13h30, 9/12
- Search page from BE. DL: 13h30, 10/12

#### Week 2: Admin

- Admin can CRUD products. DL: 13h30, 11/12
- Admin can view customer's orders and purchasing history. DL: 13h30, 12/12
- Sending emails to customers: DL: 13h30, 13/12
- Responsive design app. DL: 13h30, 14/12
