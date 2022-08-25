import { AppState } from "../AppState"

class CategoriesService {
    async getAllCategories() {
        let dictionary = {}
        AppState.recipes.forEach(r => {
            let lowercaseCategory = r.category.toLowerCase()
            let returnString = lowercaseCategory.charAt(0).toUpperCase() + lowercaseCategory.slice(1)
            if (!dictionary[returnString]) {
                // dictionary[returnString] = { count: 1, name: returnString }
                dictionary[returnString] = 1
            } else {
                // dictionary[returnString].count++
                dictionary[returnString]++
            }
        })
        // for (let category in dictionary) {
        //     let toPush = { [category]: dictionary[category] }
        //     console.log(toPush);
        //     AppState.categories.push(toPush)
        // }
        AppState.categories = dictionary
    }
}

export const categoriesService = new CategoriesService()