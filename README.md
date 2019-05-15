# top-hat-empty-setup

This repo holds a sample code to use react with redux to make requests to APIs.

## Overview
This app uses the following modules: 

+ React Js / Redux
+ Material UI


## Usage
To run the application do the following:

1. Clone the repo
2. type `npm install`
3. type `npm run start`

## Asumptions
1. the username is : sam
2. the password is: papa

I have created a product with 3 differents options : Bronze, Silver, Gold
If the user has enough points, then he can redeem one option if not the button is disabled

I have made a header component that get displayed as soon as the user logs in succesfully
At all the time the user can log out and then go back to the login page.

## Tips

The apps can easily be enhanced. 
  1- In the header we ca add more menus tabs
  2- In component folder we can add more components
  3- In redux, we can more actions and add the processing in the Saga middleware 
  4- The production build can be made just by running the command : `npm run build`


To run the test type `npm run test`