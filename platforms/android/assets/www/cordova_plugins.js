cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "com.oddmouse.plugins.locktask.LockTask",
        "file": "plugins/com.oddmouse.plugins.locktask/www/LockTask.js",
        "pluginId": "com.oddmouse.plugins.locktask",
        "clobbers": [
            "plugins.locktask"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-browsersync": "0.1.1",
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-fullscreen": "1.1.0",
    "cordova-plugin-dialogs": "1.3.3",
    "cordova-sqlite-storage": "2.0.4",
    "com.oddmouse.plugins.locktask": "1.0.0"
};
// BOTTOM OF METADATA
});