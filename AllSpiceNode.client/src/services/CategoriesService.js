import { AppState } from "../AppState"

class CategoriesService {
    async getAllCategories() {
        let dictionary = {}
        AppState.recipes.forEach(r => {
            let lowercaseCategory = r.category.toLowerCase()
            let returnString = lowercaseCategory.charAt(0).toUpperCase() + lowercaseCategory.slice(1)
            if (!dictionary[returnString]) {
                dictionary[returnString] = 1
            } else {
                dictionary[returnString]++
            }
        })
        // FIXME broken at the moment
        for (category in dictionary) {
            console.log(category);
            AppState.categories.push({ category: dictionary[category] })
            console.log(AppState.categories);
        }
    }
}

export const categoriesService = new CategoriesService()