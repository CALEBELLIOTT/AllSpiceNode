# AllSpice

AllSpice is an application which allows users to share, review, and explore recipes. 

Features
- AllSpice allows users to explore recipes on the main home page and view all recipes that other users have posted.
- Users can navigate to recipe pages to view more information about the recipe. This includes steps, ingredients, average rating, reviews, and gives the option to review the recipe.
- When a user reviews a recipe, the average rating of the reviewed recipe changes.
- Each user has a profile page where their recipes and reviews are displayed.
- Logged in users are able to post recipes for others to view.
- When creating a recipe, you are prompted to input recipe information as well as required ingredients and steps


Building the project

This project was originally built using a .net C# and MySQL back-end stack. Most api endpoints in this version are supported by that version and can be found [here](https://github.com/CALEBELLIOTT/AllSpice).

I decided to redesign the entire application in this version to make it more feature rich with a more complicated UI. I added support for additional API endpoints and data models which allowed for reviews to be left on recipes. 

I used the Vue lifecycle hook 'beforeCreate' for the first time and found that it served my purposes more in this app than the previously used onMounted lifecycle hook. Making api calls before the DOM is mounted can be beneficial as necessary data for rendering is already available and the client will throw less errors as a result. 

I also put an emphasis on focusing on details. One such detail was making sure data was cleared when a user navigates away from a page. For example, when a user navigates away from a recipe page, all the data with that page is dumped. That ensures that next time the user navigates to a recipe page, there will be no flash of the previously visited page's data as data from the database is coming back.

Attention to such details makes this app very responsive and appealing to navigate and is something that I will carry on in future projects.
