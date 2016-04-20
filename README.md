# apiTest

## How to use

The solution provides a sets of RESTful services. It allows for modifying data from a CSV file - dataGousto.csv, which is stored on the server.

Run the following URLs to get the respective result:

###### Fetch recipe by id

{hostname}/apiTest/public/index/fetch-recipe-by-id/recipeId/{recipeId}

###### Fetch recipe by cuisine (paginated)

{hostname}/apiTest/public/index/fetch-recipe-by-cuisine/cuisine/{cuisine}/from/{fromPage}/to/{toPage}

###### Rate recipe

{hostname}/apiTest/public/index/rate-recipe/recipeId/{recipeId}/rating/{rating}

###### Update recipe

{hostname}/apiTest/public/index/update-recipe/id/{id}/box_type/{box_type}/title/{title}/slug/{slug}/short_title/{short_title}/marketing_description/{marketing_description}/calories_kcal/{calories_kcal}/protein_grams/{protein_grams}/fat_grams/{fat_grams}/carbs_grams/{carbs_grams}/bulletpoint1/{bulletpoint1/bulletpoint2/{bulletpoint2/bulletpoint3/{bulletpoint3}/recipe_diet_type_id/{recipe_diet_type_id}/season/{season}/base/{base}/protein_source/{protein_source}/preparation_time_minutes/{preparation_time_minutes}/shelf_life_days/{shelf_life_days}/equipment_needed/{equipment_needed}/origin_country/{origin_country}/recipe_cuisine/{recipe_cuisine}/in_your_box/{in_your_box}/gousto_reference/{gousto_reference}/rating/{rating}

###### Add recipe


{hostname}/apiTest/public/index/update-recipe/box_type/{box_type}/title/{title}/slug/{slug}/short_title/{short_title}/marketing_description/{marketing_description}/calories_kcal/{calories_kcal}/protein_grams/{protein_grams}/fat_grams/{fat_grams}/carbs_grams/{carbs_grams}/bulletpoint1/{bulletpoint1/bulletpoint2/{bulletpoint2/bulletpoint3/{bulletpoint3}/recipe_diet_type_id/{recipe_diet_type_id}/season/{season}/base/{base}/protein_source/{protein_source}/preparation_time_minutes/{preparation_time_minutes}/shelf_life_days/{shelf_life_days}/equipment_needed/{equipment_needed}/origin_country/{origin_country}/recipe_cuisine/{recipe_cuisine}/in_your_box/{in_your_box}/gousto_reference/{gousto_reference}/rating/{rating}

## Web Framework

Zend Framework 1 has been used for this project, simply because I feel more confident with ZF1. However, it can be easily implemented with any other web application framework.

## API usage

This is a RESTful API, returning JSON. JSON can be read from all devices, icluding various web applications and mobile devices. Therefore, it will cater for different API consumers without the need of modification.



## Relevant Information

Third party library - PHPExcel has been used for adding and updating the CSV file.
