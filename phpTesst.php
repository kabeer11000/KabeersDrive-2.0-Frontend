<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include '.././dbConnect.php';
gc_enable();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['username']) || !isset($_SESSION['id'])) {
    echo '{"message":"auth required"}';
    exit;
}
gc_collect_cycles();
if (isset($_GET['q'])) {
    $searchQuery = strip_tags($_GET['q']);
    $username = $_SESSION['username'];
    $filesArray = [];
    $foldersArray = [];
    $folderUniqid = isset($_GET['folder']) ? strip_tags($_GET['folder']) : $_SESSION['id'];
    $folderQuery = [
        isset($_GET['folder']) ? "`uniqueId` = '$folderUniqid'" : "`parent` = '$folderUniqid'",
        isset($_GET['folder']) ? "AND `parent` = '$folderUniqid'" : "",
        $searchQuery === "filter:all" ? "WHERE 1 = 1" : "WHERE `name` LIKE '$searchQuery'"
    ];
    $queryFolderName = "SELECT * FROM `folders` WHERE $folderQuery[0] AND `owner` = '$username' LIMIT 1;";
    $folderName = mysqli_fetch_assoc(mysqli_query($db, $queryFolderName));
    $result = mysqli_query($db, "SELECT * FROM `files` $folderQuery[2] AND `owner`  = '$username' $folderQuery[1];");
    while ($row = mysqli_fetch_assoc($result)) array_push($filesArray, $row);

    $folderName = mysqli_fetch_assoc(mysqli_query($db, $queryFolderName));
    $result = mysqli_query($db, "SELECT * FROM `folders` $folderQuery[2] AND `owner`  = '$username' $folderQuery[1];");
    while ($row = mysqli_fetch_assoc($result)) array_push($foldersArray, $row);

    echo json_encode(
        array(
            "TotalResults" => count($filesArray) + count($foldersArray),
            "id" => $folderName["uniqueId"],
            "name" => $folderName['name'],
            "items" => array(
                "files" => $filesArray,
                "folders" => $foldersArray
            )
        )
    );
    exit;
}
echo json_encode(array("message" => "no Auth"));
exit;
gc_collect_cycles();
?>

