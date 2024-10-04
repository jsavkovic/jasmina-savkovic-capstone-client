# Project Title
Lendaroo

## Overview

It's a borrow/lend platform for parents to share large-ticket items for young children, helping reduce consumption and expenses during the early stages of parenthood.


### Problem

Early stages of parenthood come with significant expenses for items that are often used for only a short period. Items such as bassinets, specialty strollers, snowsuits, swings, and jolly jumpers are typically gently used and can be shared among parents. However, finding a reliable and convenient way to share these high-ticket items can be challenging. My app addresses this pain point by providing a platform for parents to lend and borrow these items within a close knit community. By facilitating the sharing of these essential items, we help parents save money, reduce consumption, and minimize unnecessary waste. This not only eases the financial burden on families but also promotes sustainable living and contributes to a greener planet.

### User Profile

Parents and caregivers with young children who are looking to borrow or lend high-ticket baby and toddler items.
Users will create an account and join or create a community of trusted friends and family. They can then list items they are willing to lend and browse items available for borrowing. 


### Features

- As a user, I want to create an account to securely access the app.
- As a user, I want to log in to my account so that I can access my profile and activities.
- As a logged in user, I want to list items I am willing to lend so that others can see what is available.
- As a logged in user, I want to upload photos and descriptions of items I am lending so that others can understand the condition and features of the items.
- As a logged in user, I want to browse available items so that I can find what I need.
- As a logged in user, I want to request to borrow an item so that I can use it for a period of time.
- As a logged in user, I want to receive and manage borrowing requests so that I can decide who can borrow my items.
- As a logged in user,  I want to track who has borrowed my items and when they are due back so that I can ensure they are returned.


## Implementation

### Tech Stack

- React
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Register
- Login
- Profile
- List of Lend items
- List of friends
- Item details 
    - Upload item
    - Edit item
    - Delete item
- Request item

### Mockups

See mockup folder in the repo.

### Data

See databse_diagram in the repo

### Endpoints

POST   /register         - create a new user
POST   /login            - log in user

GET    /items/:itemId    - retrieves a specific item
POST   /items            - creates new item
PUT    /items/:itemId    - updates an existing item
DELETE /items/:itemId    - deletes an item

POST   /borrow-request   - creates a new borrow request
GET    /borrow-request   - retrieves all borrow requests for logged in user
PUT    /borrow-request/:requestId - update status of borrow request
- should i add the ability to cancel a borrow request, what does that mean? is it deleted or is there another state or cancelled? latter?

GET    /friends          - retrieves a list of all friends for logged in user
POST   /friends          - sends a friend request to another user
- same goes for friend request, cancelled as an option

GET    /:userId/items/    - retrieve a list of all items by user



### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Auth will not be prioritized in this sprint and are listed as a nice to have below.  

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

Day 1: Project Setup
- Set up the project structure with React and Express.
- Configure database and server environment.

Day 2-3: Item Management
- Implement the "List Items" feature.
- Create "Upload Item", "Edit Item", and "Delete Item" pages.

Day 4-5: Browsing and Searching Items
- Implement browsing of available items.
- Implement searching for specific items.

Day 6-7: Borrowing and Request Management
- Implement borrowing requests.
- Manage borrowing requests and track items.

Day 8: Additional Pages and Features
- Implement Home Page/Profile, List of Items, Item Details, and List of Friends pages.

Day 9-10: Testing, Bug Fixes and Presentation Preparation

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- user authentication and authorization
- user search - request and accept friend requests
- facilitate communication between lenders and borrowers 
- manage lending periods, and provide reminders for returns
- item category for gifting and related functionality



