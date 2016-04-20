<?php
/**
 * Created by PhpStorm.
 * User: Snezhana
 * Date: 19/04/16
 * Time: 23:27
 */

class Application_Model_Data {

    private $data;
    private $csv;

    public function __construct() {

        $this->csv =  '../public/csv/dataGousto.csv';
        $this->data = $this->readCsv($this->csv );


    }


    public function readCsv($csv) {

        $dataArray = array();
        $file = fopen($csv, 'r');

        $i = 0;
        $firstLine = true;
        while (($row = fgetcsv($file, 0, ',')) !== false) {
            if (!$firstLine) {
                $dataArray[$i]['id'] = $row[0];
                $dataArray[$i]['created_at'] = $row[1];
                $dataArray[$i]['updated_at'] = $row[2];
                $dataArray[$i]['box_type'] = $row[3];
                $dataArray[$i]['title'] = $row[4];
                $dataArray[$i]['slug'] = $row[5];
                $dataArray[$i]['short_title'] = $row[6];
                $dataArray[$i]['marketing_description'] = $row[7];
                $dataArray[$i]['calories_kcal'] = $row[8];
                $dataArray[$i]['protein_grams'] = $row[9];
                $dataArray[$i]['fat_grams'] = $row[10];
                $dataArray[$i]['carbs_grams'] = $row[11];
                $dataArray[$i]['bulletpoint1'] = $row[12];
                $dataArray[$i]['bulletpoint2'] = $row[13];
                $dataArray[$i]['bulletpoint3'] = $row[14];
                $dataArray[$i]['recipe_diet_type_id'] = $row[15];
                $dataArray[$i]['season'] = $row[16];
                $dataArray[$i]['base'] = $row[17];
                $dataArray[$i]['protein_source'] = $row[18];
                $dataArray[$i]['preparation_time_minutes'] = $row[19];
                $dataArray[$i]['shelf_life_days'] = $row[20];
                $dataArray[$i]['equipment_needed'] = $row[21];
                $dataArray[$i]['origin_country'] = $row[22];
                $dataArray[$i]['recipe_cuisine'] = $row[23];
                $dataArray[$i]['in_your_box'] = $row[24];
                $dataArray[$i]['gousto_reference'] = $row[25];
            }
            $firstLine = false;
            $i++;

        }

        fclose($file);
        return $dataArray;
    }

    public function fetchRecipeById($recipeId) {

        $recipeItem = '';
        foreach ($this->data as $each => $item) {
            if ($item['id'] == $recipeId) {
                $recipeItem = $item;
            }
        }

        return $recipeItem;
    }

    public function fetchRecipeByCuisine($cuisine, $from, $to) {

        $recipeItems = '';
        foreach ($this->data as $each => $item) {
            if ($item['recipe_cuisine'] == $cuisine) {
                $recipeItems[] = $item;
            }
        }

        $paginatedRecipeArray = array_slice($recipeItems, $from, $to);

        return $paginatedRecipeArray;
    }

    public function rateRecipe($recipeId, $rating) {

        require_once("PHPExcel/PHPExcel.php");

        /** Load $inputFileName to a PHPExcel Object **/
        $objPHPExcel = PHPExcel_IOFactory::load($this->csv);
       // $value = $objPHPExcel->getActiveSheet()->getCell('E2')->getValue();
        $objPHPExcel->getActiveSheet()->setCellValue("AA". ($recipeId + 1), $rating);

        $objWriter = new PHPExcel_Writer_CSV($objPHPExcel);
        $objWriter->save($this->csv);

        return "success";

    }

    public function addRecipe($box_type, $title, $slug,
                                    $short_title, $marketing_description, $calories_kcal,
                                    $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
                                    $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
                                    $season, $base, $protein_source, $preparation_time_minutes,
                                    $shelf_life_days, $equipment_needed, $origin_country,
                                    $recipe_cuisine, $in_your_box, $gousto_reference, $rating)
{


        require_once 'PHPExcel/PHPExcel.php';
        require_once 'PHPExcel/PHPExcel/IOFactory.php';

        $objPHPExcel = PHPExcel_IOFactory::load($this->csv);
        $objPHPExcel->setActiveSheetIndex(0);
        $row = $objPHPExcel->getActiveSheet()->getHighestRow()+1;

        $columnTitles = $this->getArrayOfColumnNames();
        $lastColumn = $objPHPExcel->getActiveSheet()->getHighestColumn();
        $lastColumn++;

        for ($column = 'A'; $column != $lastColumn; $column++) {
            foreach ($columnTitles as $value) {

                $cellTitle = $objPHPExcel->getActiveSheet()->getCell($column.'1')->getValue();
                if ($cellTitle == $value) {
                    $objPHPExcel->getActiveSheet()->SetCellValue($column.$row, ${$value});
                }

                if ($cellTitle == 'created_at') {
                    $objPHPExcel->getActiveSheet()->SetCellValue($column.$row, date("d/m/y H:i", time()));
                }

                if ($cellTitle == 'id') {
                    $objPHPExcel->getActiveSheet()->SetCellValue($column.$row, $row-1);
                }

            }

        }

        $objWriter = new PHPExcel_Writer_CSV($objPHPExcel);
        $objWriter->save($this->csv);

        return "success";
    }


    public function updateRecipe($id, $box_type, $title, $slug,
                              $short_title, $marketing_description, $calories_kcal,
                              $protein_grams, $fat_grams, $carbs_grams, $bulletpoint1,
                              $bulletpoint2, $bulletpoint3, $recipe_diet_type_id,
                              $season, $base, $protein_source, $preparation_time_minutes,
                              $shelf_life_days, $equipment_needed, $origin_country,
                              $recipe_cuisine, $in_your_box, $gousto_reference, $rating)
    {


        require_once 'PHPExcel/PHPExcel.php';
        require_once 'PHPExcel/PHPExcel/IOFactory.php';

        try {

            $objPHPExcel = PHPExcel_IOFactory::load($this->csv);
            $objPHPExcel->setActiveSheetIndex(0);
        } catch(Exception $e) {
            print($e->getMessage());
            print("The file could not be loaded. " . $e->getCode());
        }

        $row = $id+1;

        $columnTitles = $this->getArrayOfColumnNames();
        $lastColumn = $objPHPExcel->getActiveSheet()->getHighestColumn();
        $lastColumn++;

        for ($column = 'A'; $column != $lastColumn; $column++) {
            foreach ($columnTitles as $value) {

                $cellTitle = $objPHPExcel->getActiveSheet()->getCell($column.'1')->getValue();
                if ($cellTitle == $value) {
                    $objPHPExcel->getActiveSheet()->SetCellValue($column.$row, ${$value});
                }

                if ($cellTitle == 'updated_at') {
                    $objPHPExcel->getActiveSheet()->SetCellValue($column.$row, date("d/m/y H:i", time()));
                }

            }

        }

        $objWriter = new PHPExcel_Writer_CSV($objPHPExcel);
        $objWriter->save($this->csv);

        return "success";
    }

    public function getArrayOfColumnNames() {

        $columnNames = array();
        foreach ($this->data as $each => $item) {
            foreach ($item as $key => $column) {
                $columnNames[] = $key;
            }
        }

        return $columnNames;
    }

    public static function addUtf8($data) {

        $utf8Data = array();
        $i = 0;
        foreach ($data as $key => $value) {

            if (is_array($value)) {

                $a = array();
                foreach ($value as $each => $item) {
                    $a[$each] = utf8_encode($item);

                }
                $utf8Data['response'][$i] = $a;
                $i++;
            } else {
                if (is_string($value)) {
                    $utf8Data['response'][$key] = utf8_encode($value);
                }
            }

        }

        return $utf8Data;
    }



}