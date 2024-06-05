/**
 * Init
 */
const setupCheck = function() {
    return (self.configuration && (
        self.configuration.apiKeys.google != "" ||
        self.configuration.apiKeys.bing != "" ||
        self.configuration.apiKeys.mapbox != ""
    ));
}

if(setupCheck()) {
    /**
     * Configuring RequireJS
     */
    requirejs.config({
        baseUrl: "src",
        paths: {
            core: "core",
            libs: "libs",
            maps: "maps",
            services: "services"
        },
        config: {
            "core/main": {
                defaultCoords: { lat: 50.84, lng: 4.34 }
            },
            "maps/google": {
                apiKey: self.configuration.apiKeys.google
            },
            "maps/mapbox": {
                apiKey: self.configuration.apiKeys.mapbox
            },
        }
    });
    
    /**
     * Launching the app
     */
    requirejs(["core/main"], function(main) {
        self.main = main; // Workaround for Alpine's reference issue
        
        requirejs(["libs/alpine"]);

        (async () => {
            await main.init();
        })();
    });
} else {
    alert("Please setup Avoc by visiting the configuration.js file");
}