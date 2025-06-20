# My GrocerPal Frontend
## About
My GrocerPal uses an AI assistant to create a grocery list with recipes based on user criteria, such as diet type, dietary restrictions, max cost, serving size, and duration of use. The purpose is to help individuals with meal planning by reducing the time it takes to come up with a grocery list that meets your needs.

## HTML File Descriptions
### Home.html
Log in and sign up page

### Landing-page.html
Welcome page for user with buttons to create a new list, view previous lists, and see account settings

### New-list.html
Offers user criteria that generates a list using OpenAI
#### User Criteria
- Diet Type
  - Halal
  - Kosher
  - Omnivore
  - Pescatarian
  - Vegan
  - Vegetarian
- Dietary Restrictions (Y/N)
  - Gluten
  - Peanut
  - Tree nuts
  - Dairy
  - Seafood and shellfish
- Max Cost
  - Slider from $10-$300 to declare the max cost you want the grocery list to be
- Serving Size
  - Range from 1-10 people this grocery list will account for
- Duration of Use
  - The amount of time that the user wants the groceries to last for (range of two weeks)

### Previous-lists.html
Displays lists that the user has previously made alongside recipes that can be made from the groceries on the list

### Account Settings
Displays user's name, email, and password, along with buttons to change password, delete account, or log out.
