<?php

class IndexController extends Zend_Controller_Param
{


    private $dataModel;

    public function init()
    {
        $this->dataModel = new Application_Model_Data();
    }

    public function indexAction()
    {

    }

    public function fetchRecipeByIdAction($recipeId) {

        header('Content-Type: application/json');

        $recipe = $this->dataModel->fetchRecipeById($recipeId);

        $response = Application_Model_Data::addUtf8($recipe);

        echo json_encode($response);
        exit;

    }
    public function fetchRecipeByCuisineAction($cuisine, $from, $to) {

        header('Content-Type: application/json');

        $recipes = $this->dataModel->fetchRecipeByCuisine($cuisine, $from, $to);

        $response = Application_Model_Data::addUtf8($recipes);

        echo json_encode($response);
        exit;

    }

    public function rateRecipeAction($recipeId, $rating) {

        header('Content-Type: application/json');

        $result = $this->dataModel->rateRecipe($recipeId, $rating);

        echo json_encode($result);
        exit;

    }

    public function addRecipeAction($box_type, $title, $slug, $short_title, $marketing_description, $calories_kcal,
                                     $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
                                     $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
                                     $season, $base, $protein_source, $preparation_time_minutes,
                                     $shelf_life_days, $equipment_needed, $origin_country,
                                     $recipe_cuisine, $in_your_box, $gousto_reference, $rating) {

    header('Content-Type: application/json');

    $result = $this->dataModel->addRecipe($box_type, $title, $slug,
        $short_title, $marketing_description, $calories_kcal,
        $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
        $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
        $season, $base, $protein_source, $preparation_time_minutes,
        $shelf_life_days, $equipment_needed, $origin_country,
        $recipe_cuisine, $in_your_box, $gousto_reference, $rating);

    echo json_encode($result);
    exit;

    }

    public function updateRecipeAction($id, $box_type, $title, $slug, $short_title, $marketing_description, $calories_kcal,
                                    $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
                                    $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
                                    $season, $base, $protein_source, $preparation_time_minutes,
                                    $shelf_life_days, $equipment_needed, $origin_country,
                                    $recipe_cuisine, $in_your_box, $gousto_reference, $rating) {

        header('Content-Type: application/json');

        $result = $this->dataModel->updateRecipe($id, $box_type, $title, $slug,
            $short_title, $marketing_description, $calories_kcal,
            $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
            $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
            $season, $base, $protein_source, $preparation_time_minutes,
            $shelf_life_days, $equipment_needed, $origin_country,
            $recipe_cuisine, $in_your_box, $gousto_reference, $rating);

        echo json_encode($result);
        exit;

    }






}







