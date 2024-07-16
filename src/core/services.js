/**
 * Provides an interface with ImmortalDB
 */
define("core/services",
    ["module", "core/router", "core/db", "services/translations", "services/elevation", "services/weather"], 
    function(module, router, db, translations, elevation, weather) {
        return {
            getTranslation: function() {
                return translations[module.config().language];
            },
            getElevation: async function() {
                const coords = await this.getCoordinates();
                return await elevation.grab(coords);
            },
            getCoordinates: async function() {
                return router.hasStateOf("coords")
                    ? router.getStateOf("coords")
                    : await db.get("Avoc.lastCoords", module.config().defaultCoords);
            },
            getCurrentWeather: async function() {
                const coords = await this.getCoordinates();
                return await weather.grab(coords);
            },
        }
});