var express = require("express");
var router = express.Router();
var mangaController = require("../controllers/mangaController");

/**
 * Get List of Animes in Database
 */
router.get("/mangas", mangaController.getAllMangas);

/**
 * Save an Anime to the Database
 */
router.post("/mangas", mangaController.createManga);

/**
 * Get the Anime with the given Id from the Database
 */
router.get("/manga/:mangaId", mangaController.getOneManga);

/**
 * Update the Anime with the given Id from the Database
 */
router.put("/manga/:mangaId", mangaController.updateManga);

/**
 * Delete the Anime with the given Id from the Database
 */
router.delete("/manga/:mangaId", mangaController.deleteManga);

/**
 * Param to be used when you need the Anime and you have the id
 */
router.param("mangaId", mangaController.getByIdManga);

module.exports = router;
