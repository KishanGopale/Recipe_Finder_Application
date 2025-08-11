const searchBox = document.querySelector('.searchbox');
const Searchbtn = document.querySelector('.Searchbtn');  
const recipe_container = document.querySelector('.recipe_container');
const recipe_details_content = document.querySelector('.recipe_details_content');
const recipe_close_btn = document.querySelector('.recipe_close_btn');

//function to fetch recipes based on search input
const fetchRecipes = async (query) =>{
    recipe_container.innerHTML = '<h2>Your recipeis are comming...</h2>'; // Show loading message
    try{
         const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json(); // here we get array of meals 
    //console.log(response);

    recipe_container.innerHTML = ''; // Clear previous results
    response.meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe');
        //console.log(meal);
        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea} Dish</span></p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>`
        
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipeCard.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePoup(meal);
        });
        
        recipe_container.appendChild(recipeCard);
    });

    }catch (error) {
        console.error('Error fetching recipes:', error);
        recipe_container.innerHTML = '<h2 style="color: red;">Error fetching recipes. search another recipes.</h2>'; // Show error message
        return;
    }
   
}  

const fetchIngredients = (meal) => {
    let ingredients = ''; 
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        }
        else {
            break; // Stop if no more ingredients
        }
    }  
    return ingredients; // Return the list of ingredients
}

const openRecipePoup = (meal) => {
    recipe_details_content.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstrucitons">
          <h3>Instructions:</h3>
          <p >${meal.strInstructions}</p>
        </div>
        `
        recipe_details_content.parentElement.style.display = 'block'; // Show the recipe details popup
        
}

recipe_close_btn .addEventListener('click', () => {
    recipe_details_content.parentElement.style.display = 'none'; // Hide the recipe details popup
});

// Add event listener to the search box
Searchbtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    const searchInput = searchBox.value.trim();
    if (searchInput === '') {
        recipe_container.innerHTML = '<h2 style="color: red;">Please enter a search item.</h2>'; // Show error message
        return;
    }
    fetchRecipes(searchInput);
});